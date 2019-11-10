import { SET_SCREAMS, SET_SCREAM, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, DELETE_SCREAM, POST_SCREAM, SUBMIT_COMMENT } from '../types';

//initialState: the dataReducer default-state
const initialState = {
    screams: [],
    scream: {},
    comments: [],
    loading: false
  };
  
  //dataReducer-function
  export default function(state = initialState, action) {
    //switch case depending on the action-type received
    switch (action.type) {
      case LOADING_DATA:
        return {
          ...state,
          loading: true
        };

      case SET_SCREAMS:
        return {
          ...state,
          screams: action.payload,
          
          loading: false
        };

        case SET_SCREAM:
        return {
          ...state,
          scream: action.payload
        };
   
      //1: findIndex of scream where (scream.screamId === screamId of scream-liked/unlike)
      //2: replacing the scream-like/unliked with its new state (state.scream[index] = assign scream-liked/unliked)
      //3: check if (scream.screamId(that is, scream found) === screamId of scream-liked/unlike), then assign scream found = scream-liked/unliked
      case LIKE_SCREAM:
      case UNLIKE_SCREAM:
        let index = state.screams.findIndex(
          (scream) => scream.screamId === action.payload.screamId
        );
        state.screams[index] = action.payload;
        if (state.scream.screamId === action.payload.screamId) {
          state.scream = action.payload;
        }

        return {
          ...state
        };

        //1: findIndex of scream where (scream.screamId === screamId of scream-deleted)
        //2:.splice: get scream[index] from the state.screams, remove scream from screams-array
        //3: return new state
        case DELETE_SCREAM:
          let indexx = state.screams.findIndex((scream) => scream.screamId === action.payload);
          state.screams.splice(indexx, 1);
          return {
            ...state
          };

          //1: ...state: return state
          //2: in the scream-array, display newScream, spread the rest of the screams
          case POST_SCREAM:
            return {
              ...state,
              screams: [action.payload, ...state.screams]
            };

            //1: ...state: return state
            //2: screams{}: in scream-array, return state for current scream
            //3: return new-comment, then spread other comments
            case SUBMIT_COMMENT:
              return {
                ...state,
                scream: {
                  ...state.scream,
                  comments: [action.payload, ...state.scream.comments]
                }
      };

      default:
        return state;
    }
  }