import fetch from "node-fetch";

let get = (path: string) =>
  fetch(`https://hacker-news.firebaseio.com/v0/${path}.json`).then((res) => {
    return res.json();
  });

export const getItem = (id) => get(`item/${id}`);

export const getUser = (id) => get(`user/${id}`);

export const getTopStoryIds = () => get("topstories");

export const getNewStoryIds = () => get("newstories");

export const getAskStoryIds = () => get("askstories");

export const getShowStoryIds = () => get("showstories");

export const getJobStoryIds = () => get("jobstories");
