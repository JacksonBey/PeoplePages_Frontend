import { combineReducers } from "redux";
 
const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer
});
 
export default rootReducer;

function usersReducer(state = { user: {
    user: '',
    token: '',
    loggedIn: false,
    error: false}, requesting: false   
}, action) {
    switch (action.type) {
    case 'START_LOG_REQUEST':
        return {
            ...state,
            requesting: true
        }   
    case 'LOG_IN':
        // console.log('state: ', state)
        // console.log('action: ', action)
        if(action.data.error ===  "Invalid username or password") {
            return { user: {
                user: '',
                token: '',
                loggedIn: false,
                error: true}, requesting: false   
            }
        } else {
        return {
            user: {
            user: action.data.user.username,
            token: action.data.token,
            loggedIn: true
        },
            requesting: false
        }}
    case 'LOG_OUT':
        localStorage.setItem('token', '')
        localStorage.setItem('user', '')
        return { user: {
            user: '',
            token: '',
            loggedIn: false,
            error: false}, requesting: false   
        }

        // state = { user: {
        //     user: '',
        //     token: '',
        //     loggedIn: false,
        //     error: false}, requesting: false   
        // }

    default:
        return state;
    }
  }

  function postsReducer(state = [], action) {
    switch (action.type) {
      default:
        return state;
    }
  }

