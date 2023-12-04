const axios = require("axios");
const fs = require("fs");

const init = (cookie, ig_app_id) => {
  axios.interceptors.request.use((request) => {
    request.headers.set({
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      Cookie: cookie,
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36",
      "X-Ig-App-Id": ig_app_id,
    });

    return request;
  });
};

const get_following = async (following_count) => {
  const res = await axios.get(
    `https://www.instagram.com/api/v1/friendships/33306878304/following/?count=${following_count}&max_id=QVFEZHR1RndWS2V1a0hXaFRmX0hSMjlma3ZpTEwxVXpneHVLSVJVcjdOVTYtOFF6S1VzN3UxRlRKbkhoTk5HWkJacFdoai1tcVlad3N4c2tydXh6WDZJTQ%3D%3D&search_surface=follow_list_page`
  );
  const following = res.data.users;
  return following;
};

const get_followers = async (followers_count) => {
  const res = await axios.get(
    `https://www.instagram.com/api/v1/friendships/33306878304/followers/?count=${followers_count}&search_surface=follow_list_page`
  );
  const followers = res.data.users;
  return followers;
};

const compare = async () => {
  const followers = await get_followers(170);
  const following = await get_following(160);
  console.log(followers.length, following.length);
  frs_id = [];
  fls_id = [];
  followers.forEach((user) => {
    frs_id.push(user.pk);
  });
  following.forEach((user) => {
    fls_id.push(user.pk);
  });
  let notInFollowers = following.filter(
    (followingObj) =>
      !followingObj.is_verified &&
      !followers.some(
        (followerObj) => followerObj.fbid_v2 === followingObj.fbid_v2
      )
  );
  const arr = [];
  notInFollowers.forEach((user) => {
    arr.push(user.username);
  });
  console.log("HERE ARE THE CULPRITS: \n", arr);
};

const cookie = "";

const ig_app_id = 12179816448;

init(cookie, ig_app_id);
compare();
