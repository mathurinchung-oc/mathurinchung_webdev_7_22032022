import { config, axios } from '../../api';
import { setPosts, setCreatePost, setDeletePost, setUpdatePost, setLikePost, setDislikePost, setAddComment, setUpdateComment, setDeleteComment } from '../features/post.slice';

const url = "/post";

const getAllPosts = () => {
  return async dispatch => {
    try {
      const response = await axios.get(url, config);
      return dispatch(setPosts(response.data));
    } catch (error) {
      console.error(error.message);
    }
  };
};

const createPost = (data) => {
  return async dispatch => {
    try {
      const response = await axios.post(url, data, config);
      return dispatch(setCreatePost(response.data.post));
    } catch (error) {
      console.error(error.message);
    }
  };
};

const updatePost = (postId, data) => {
  return async dispatch => {
    try {
      const response = await axios.put(`${ url }/${ postId }`, data, config);
      dispatch(setUpdatePost({ postId, ...response.data.postUpdated }));
    } catch (error) {
      console.error(error);
    }
  };
};

const deletePost = (postId) => {
  return async dispatch => {
    try {
      await axios.delete(`${ url }/${ postId }`, config);
      return dispatch(setDeletePost({ postId }));
    } catch (error) {
      console.error(error.message);
    }
  };
};

const likePost = (postId, userId) => {
  return async dispatch => {
    try {
      const response = await axios.post(`${ url }/${ postId }/like`, { userId }, config);
      return dispatch(setLikePost(response.data.payload));
    } catch (error) {
      console.error(error.message);
    }
  };
};

const dislikePost = (postId, userId) => {
  return async dispatch => {
    try {
      const response = await axios.post(`${url}/${postId}/like`, { userId }, config);
      return dispatch(setDislikePost(response.data.payload));
    } catch (error) {
      console.error(error.message);
    }
  };
};

const createComment = (postId, comment) => {
  return async dispatch => {
    try {
      const response = await axios.post(`${url}/${postId}/comment`, comment, config);
      return dispatch(setAddComment(response.data.newComment));
    } catch (error) {
      console.error(error.message);
    }
  };
};

const updateComment = (id, data) => {
  return async dispatch => {
    try {
      console.log(data)
      const response = await axios.put(`${url}/comment/${id}`, { data }, config);
      console.log(response.data);
      return dispatch(setUpdateComment(response.data.payload));
    } catch (error) {
      console.error(error.message);
    }
  };
};

const deleteComment = (id) => {
  return async dispatch => {
    try {
      const response = await axios.delete(`${url}/comment/${id}`, config);
      return dispatch(setDeleteComment(response.data.payload));
    } catch (error) {
      console.error(error.message);
    }
  };
};

export { getAllPosts, createPost, updatePost, deletePost, likePost, dislikePost, createComment, updateComment, deleteComment }
