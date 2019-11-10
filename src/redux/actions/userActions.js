//userAction: section to handle all user-functionalities {Login, Signup.....}

import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER, MARK_NOTIFICATIONS_READ } from '../types';
import axios from 'axios';

//loginUser: function that authorize valid user
export const loginUser = (userData, history) => (dispatch) =>{
    //innitiating the Loading-state
    dispatch({type: LOADING_UI})
            axios.post('/login', userData)
                .then(res => {
                    //setting Authorization Header
                    setAuthorizationHeader(res.data.token)
                    //getUserData after login is successful
                    dispatch(getUserData());
                    //CLEAR_ERRORS: type that actually clear-errors from the form after Login
                    dispatch({type: CLEAR_ERRORS})
                    //history.push('/'): redirecting user to homepage after login is succesful
                    history.push('/') 
                })
                //error handler
                .catch(err =>{
                    dispatch({
                        type: SET_ERRORS,
                        payload: err.response.data
                      });
                    })

    }

//signUser: function that authenticate new user
export const signupUser = (newUserData, history) => (dispatch) =>{
  //innitiating the Loading-state
  dispatch({type: LOADING_UI})
          axios.post('/signup', newUserData)
              .then(res => {
                  //setting Authorization Header
                  setAuthorizationHeader(res.data.token)
                  //getUserData after signup is successful
                  dispatch(getUserData());
                  //CLEAR_ERRORS: type that actually clear-errors from the form after signup
                  dispatch({type: CLEAR_ERRORS})
                  //history.push('/'): redirecting user to homepage after signup is succesful
                  history.push('/') 
              })
              //error handler
              .catch(err =>{
                  dispatch({
                      type: SET_ERRORS,
                      payload: err.response.data
                    });
                  })

  }

  //logoutUser: function that logout user
  export const logoutUser = () => (dispatch) => {
    //1: remove IdToken from localStorage
    //2: delete IdToken from header
    //3: SET_UNAUTHENTICATED: type that return empty state for logout-user
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
  };

  const setAuthorizationHeader = (token) => {
    //storing the Authenticated IdToken in the localStorage
    let FBIdToken = `Bearer ${token}`
    localStorage.setItem('FBIdToken', FBIdToken);
    //.common: axios property that allows access to Authorization-header
    axios.defaults.headers.common['Authorization'] = FBIdToken

  }

    //getUserData: function that get user-data in respect to passed-in token
    export const getUserData = () => (dispatch) => {
        dispatch({ type: LOADING_USER })
        //accessing the user-collection and getting the user-data from it
        axios
          .get('/user')
          .then((res) => {
            dispatch({
              type: SET_USER,
              //payload: data sent to the reducer and the reducer dooes something with it
              payload: res.data
            });
          })
          .catch((err) => console.log(err));
      };

      //uploadImage: function that uploads profile-image
      export const uploadImage = (formData) => (dispatch) => {
        dispatch({ type: LOADING_USER });
        //accessing the user/image collection and posting the uploaded image
        axios
          .post('/user/image', formData)
          .then(() => {
            dispatch(getUserData());
          })
          .catch((err) => console.log(err));
      };

      //editUserDetails: function that edits user-details
      export const editUserDetails = (userDetails) => (dispatch) => {
        dispatch({ type: LOADING_USER });
        //accessing the user collection and updating user-details
        axios
          .post('/user', userDetails)
          .then(() => {
            dispatch(getUserData());
          })
          .catch((err) => console.log(err));
      };

      //markNotificationsRead: function that mark-Notifications-Read in the database
      export const markNotificationsRead = (notificationIds) => (dispatch) => {
        //accessing the notifications collection and updating notifications.read: true
        axios
          .post('/notifications', notificationIds)
          .then((res) => {
            dispatch({
              type: MARK_NOTIFICATIONS_READ
            });
          })
          .catch((err) => console.log(err));
      };