import { createSlice } from "@reduxjs/toolkit";
import {
  getPost as getPostAPI,
  postArticle,
  editArticle,
  getAllPosts,
  getLimitPost,
  deleteArticle,
} from "../../WebAPI";

export const postReducer = createSlice({
  name: "posts",
  initialState: {
    isLoadingPost: false,
    post: null,
    newPostResponse: null,
    pagePosts: [],
    pageNumberCount: [],
  },
  reducers: {
    setIsLoadingPost: (state, action) => {
      state.isLoadingPost = action.payload;
    },

    setPost: (state, action) => {
      state.post = action.payload;
    },

    setNewPostResponse: (state, action) => {
      state.newPostResponse = action.payload;
    },

    setPagePosts: (state, action) => {
      state.pagePosts = action.payload;
    },

    setPageNumberCount: (state, action) => {
      state.pageNumberCount = action.payload;
    },
  },
});

export const {
  setIsLoadingPost,
  setPost,
  setNewPostResponse,
  setPagePosts,
  setPageNumberCount,
} = postReducer.actions;

export const getPost = (id) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  getPostAPI(id)
    .then((res) => {
      dispatch(setPost(res));
      dispatch(setIsLoadingPost(false));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const newPost = (title, body) => (dispatch) => {
  // 可以變成 promise 傳遞
  return postArticle(title, body).then((res) => {
    dispatch(setNewPostResponse(res));
    return res;
  });
};

export const editPost = (id, title, body) => (dispatch) => {
  return editArticle(id, title, body).then((res) => {
    dispatch(setNewPostResponse(res));
    return res;
  });
};

export const getAllPages = (limit) => (dispatch) => {
  getAllPosts().then((res) => {
    const allPosts = res.headers.get("X-Total-Count");
    const allPages = Math.ceil(allPosts / limit);
    dispatch(
      setPageNumberCount(Array.from({ length: allPages }, (_, i) => i + 1))
    );
  });
};

export const getPagePosts = (page, limit) => (dispatch) => {
  dispatch(setIsLoadingPost(true));

  getLimitPost(page, limit).then((posts) => {
    dispatch(setPagePosts(posts));
  });

  dispatch(setIsLoadingPost(false));
};

export const deletePost = (id) => (dispatch) => {
  return deleteArticle(id).then((res) => {
    return res;
  });
};

export default postReducer.reducer;
