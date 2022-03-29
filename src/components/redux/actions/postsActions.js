import RealworldBlogApi from '../../../api/realworldBlogApi.js';

const { getPosts, getPost } = RealworldBlogApi;

export const START_LOADING_ACTION = 'START_LOADING_ACTION';
export const startLoadingAction = () => ({
  type: START_LOADING_ACTION,
});

export const STOP_LOADING_ACTION = 'STOP_LOADING_ACTION';
export const stopLoadingAction = () => ({
  type: STOP_LOADING_ACTION,
});

export const SET_POSTS_ACTION = 'SET_POSTS_ACTION';
export const setPostsAction = (payload) => ({
  type: SET_POSTS_ACTION,
  payload,
});

export const SET_POSTS_COUNT_ACTION = 'SET_POSTS_COUNT_ACTION';
export const setPostsCountAction = (payload) => ({
  type: SET_POSTS_COUNT_ACTION,
  payload,
});

export const SET_CURRENT_PAGE_ACTION = 'SET_CURRENT_PAGE_ACTION';
export const setCurrentPageAction = (payload) => ({
  type: SET_CURRENT_PAGE_ACTION,
  payload,
});

export const SET_POST_ACTION = 'OPEN_POST_ACTION';
export const setPostAction = (payload) => ({
  type: SET_POST_ACTION,
  payload,
});

export const getPostsThunk = (take) => async (dispatch) => {
  dispatch(startLoadingAction());
  const { articles, articlesCount } = await getPosts(take);
  dispatch(setPostsAction(articles));
  dispatch(setPostsCountAction(articlesCount));
  dispatch(stopLoadingAction());
};

export const getPostThunk = (slug) => async (dispatch) => {
  const { article } = await getPost(slug);
  dispatch(setPostAction(article));
};
