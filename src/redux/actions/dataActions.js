import {
  SET_SCREAMS,
  SET_SCREAM,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  SET_ERRORS,
  POST_SCREAM,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from '../types';
import axios from 'axios';



//getScreams: function that get all screams in the homepage
export const getScreams = () => (dispatch) => {
    //innitiating the Loading-state for screams
    dispatch({ type: LOADING_DATA });
    //accessing the screams collection and getting all screams
    axios
      .get('/screams')
      .then((res) => {
        dispatch({
          //SET_SCREAMS: type that displays available screams
          type: SET_SCREAMS,
          //payload: data sent to the reducer and the reducer dooes something with it
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_SCREAMS,
          payload: []
        });
      });
  };

//getScream: function that get one scream and its properties
export const getScream = (screamId) => (dispatch) => {
  //innitiating the Loading-state for one-scream
  dispatch({ type: LOADING_UI });
  //accessing the scream route and getting one scream
  axios
    .get(`/scream/${screamId}`)
    .then((res) => {
      dispatch({
        //SET_SCREAM: type that displays one scream
        type: SET_SCREAM,
        //payload: data sent to the reducer and the reducer dooes something with it
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
    });
};

//likeScream: function that Like a scream
export const likeScream = (screamId) => (dispatch) => {
    //accessing the scream/${screamId}/like route collection
    axios
      .get(`/scream/${screamId}/like`)
      .then((res) => {
        dispatch({
          //LIKE_SCREAM: type that like a scream, with payload that gets the like back
          type: LIKE_SCREAM,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };

//unlikeScream: function that Like a scream
export const unlikeScream = (screamId) => (dispatch) => {
    //accessing the scream/${screamId}/unlike route collection, taking the screamId as parameter
    axios
      .get(`/scream/${screamId}/unlike`)
      .then((res) => {
        dispatch({
          //UNLIKE_SCREAM: type that unlike a scream, with payload that gets the unlike back
          type: UNLIKE_SCREAM,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };

   //postScream: function that Post a scream
    export const postScream = (newScream) => (dispatch) => {
      dispatch({ type: LOADING_UI });
      //accessing the /scream route, taking the newScream-data
      axios
        .post('/scream', newScream)
        .then((res) => {
          dispatch({
            //POST_SCREAM: type that post a scream, with payload that gets the scream-data back
            type: POST_SCREAM,
            payload: res.data
          });
          //clearErrors: function that clear errors from the scream-dialog
          dispatch(clearErrors());
        })
        .catch((err) => {
          dispatch({
            type: SET_ERRORS,
            payload: err.response.data
          });
        });
    };

  //deleteScream: function that delete a scream
  export const deleteScream = (screamId) => (dispatch) => {
    //accessing the scream/${screamId} route collection, delete the scraem taking the screamId as parameter
    axios
      .delete(`/scream/${screamId}`)
      .then(() => {
        dispatch({ 
          type: DELETE_SCREAM, 
          payload: screamId
        });
      })
      .catch((err) => console.log(err));
  };

  //submitComment: function that submit a comment to a scream
  export const submitComment = (screamId, commentData) => (dispatch) => {
    axios
      .post(`scream/${screamId}/comment`, commentData)
      .then(res => {
        dispatch({
          type: SUBMIT_COMMENT,
          payload: res.data
        })
         //clearErrors: function that clear errors from the submitComment-dialog
         dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        })
      })
  }

   //commentOnScreamFromUserPage: function that submit a comment to a scream in a user-page
   export const commentOnScreamFromUserPage = (userHandle, screamId, commentData) => (dispatch) => {
    axios
      .post(`/user/${userHandle}/scream/${screamId}/comment`, commentData)
      .then(res => {
        dispatch({
          type: SUBMIT_COMMENT,
          payload: res.data
        })
         //clearErrors: function that clear errors from the submitComment-dialog
         dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        })
      })
  }

  //getUserData: function that get a user-page 
  export const getUserData = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get(`/user/${userHandle}`)
      .then(res =>{
        dispatch({
          type: SET_SCREAMS,
          payload: res.data.screams
        })
      })
      .catch(() => {
        dispatch({
          type: SET_SCREAMS,
          payload: null
        })
      })
  }

//clearErrors: function that clear errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};