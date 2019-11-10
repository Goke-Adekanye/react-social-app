import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER,  LIKE_SCREAM, UNLIKE_SCREAM, MARK_NOTIFICATIONS_READ } from '../types';

//initialState: the userReducer default-state
const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
  };

  //userReducer-function
  export default function(state = initialState,  action) {
      //switch case depending on the action-type received
        switch (action.type) {
            case SET_AUTHENTICATED:
                return {
                    ...state,
                    authenticated: true
                }

            case SET_UNAUTHENTICATED:
                //return default-state when we logout
                return initialState

            case SET_USER:
                return {
                    authenticated: true,
                    loading: false,
                    ...action.payload
                }

            case LOADING_USER:
                return {
                    ...state,
                    loading: true
                }
            
                //1: ...state: return state as it is
                //2: ...state.like: return like-state
                //3: add new like(state.credentials.handle: since it is being liked by this user) to like-state-array
                case LIKE_SCREAM:
                    return {
                        ...state,
                        likes: [
                        ...state.likes,
                        {
                            userHandle: state.credentials.handle,
                            screamId: action.payload.screamId
                        }
                        ]
                    }

                case UNLIKE_SCREAM:
                    //.filter: remove the like (where like.screamId === unliked-screamId) from the like-array
                    return {
                        ...state,
                        likes: state.likes.filter(
                        (like) => like.screamId !== action.payload.screamId
                        )
                    }

                    case MARK_NOTIFICATIONS_READ:
                        //.forEach: in the state.notifications, set each notification.read = true
                        state.notifications.forEach((not) => (not.read = true));
                        return {
                          ...state
                        };

            default:
                return state;
    
        }
  }