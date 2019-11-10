import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, STOP_LOADING_UI } from '../types';
//initialState: the uiReducer default-state  
const initialState = {
    loading: false,
    errors: null
  };
  
  //uiReducer-function
  export default function(state = initialState, action) {
    //switch case depending on the action-type received
    switch (action.type) {
      case SET_ERRORS:
        return {
          ...state,
          loading: false,
          errors: action.payload
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          loading: false,
          errors: null
        };
      case LOADING_UI:
        return {
          ...state,
          loading: true
        };
      case STOP_LOADING_UI:
        return {
          ...state,
          loading: false
        }
      default:
        return state;
    }
  }
  