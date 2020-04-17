import {
  getAskStoryIds,
  getItem,
  getJobStoryIds,
  getNewStoryIds,
  getShowStoryIds,
  getTopStoryIds,
  getUser,
} from "./api";

const getItems = (ids, { offset, limit }) => {
  if (!ids) {
    ids = [];
  }
  let promises = ids.slice(offset, offset + limit).map((id) => getItem(id));
  return Promise.all(promises);
};

export const resolvers = {
  HackerNewsItem: {
    id: (item) => item.id.toString(),
    by: (item) => {
      if (!item.by) {
        return null;
      }
      return getUser(item.by);
    },
    timeISO: (item) => {
      let date = new Date(item.time * 1000);
      return date.toISOString();
    },
    kids: (item, { offset = 0, limit = 10 } = {}) =>
      getItems(item.kids, { offset, limit }),
    parent: (item) => {
      if (!item.parent) {
        return null;
      }
      return getItem(item.parent);
    },
    parts: (item) => {
      if (!item.parts) {
        return null;
      }
      let promises = item.parts.map((partId) => getItem(partId));
      return Promise.all(promises);
    },
  },
  HackerNewsUser: {
    createdISO: (user) => {
      let date = new Date(user.created * 1000);
      return date.toISOString();
    },
    submitted: (user, { limit = 10, offset = 0 } = {}) =>
      getItems(user.submitted, { limit, offset }),
  },
  Query: {
    item: (root, { id }) => getItem(id),
    user: (root, { id }) => getUser(id),
    topStories: (root, { limit = 30, offset = 0 } = {}) =>
      getTopStoryIds().then((ids) => getItems(ids, { limit, offset })),

    newStories: (root, { limit = 30, offset = 0 } = {}) =>
      getNewStoryIds().then((ids) => getItems(ids, { limit, offset })),

    showStories: (root, { limit = 30, offset = 0 } = {}) =>
      getShowStoryIds().then((ids) => getItems(ids, { limit, offset })),

    askStories: (root, { limit = 30, offset = 0 } = {}) =>
      getAskStoryIds().then((ids) => getItems(ids, { limit, offset })),

    jobStories: (root, { limit = 30, offset = 0 } = {}) =>
      getJobStoryIds().then((ids) => getItems(ids, { limit, offset })),

    stories: (root, { limit = 30, offset = 0, storyType = "top" } = {}) => {
      let bulkAPICall = {
        top: getTopStoryIds,
        show: getShowStoryIds,
        new: getNewStoryIds,
        ask: getAskStoryIds,
        job: getJobStoryIds,
      }[storyType];
      return bulkAPICall().then((ids) => {
        return getItems(ids, { limit, offset });
      });
    },
  },
};
