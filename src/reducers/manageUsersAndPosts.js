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
            firstName: action.data.user.firstName,
            lastNameInitial: action.data.user.lastNameInitial,
            location: action.data.user.location,
            age: action.data.user.age,
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
    case 'SIGN_UP':
        return {
            user: {
            user: action.data.user.username,
            token: action.data.token,
            firstName: action.data.user.firstName,
            lastNameInitial: action.data.user.lastNameInitial,
            location: action.data.user.location,
            age: action.data.user.age,
            loggedIn: true
        },
            requesting: false
        }
    case 'EDIT_USER':
         console.log('action: ', action)
        return {
            user: {
                ...state.user,
            firstName: action.data.user.firstName,
            lastNameInitial: action.data.user.lastNameInitial,
            location: action.data.user.location,
            age: action.data.user.age,
            loggedIn: true
        },
            requesting: false
        }

    default:
        return state;
    }
  }

  function postsReducer(state ={ posts: {
      posts: []}, 
      requesting: false
    }, action) {

    switch (action.type) {

    case 'START_REQUEST':
    return {
        ...state,
        requesting: true
    } 
    
    case 'GET_POSTS':
        return {
            posts: action.data,
            requesting: false
        }
        
    case 'CREATE_POST':
                // console.log('action: ', action)
                // console.log('state: ',state)
                // let nstate = [...state, action.data.post]
                // console.log('nstate: ', nstate)
                console.log('post created')
        return {
            ...state,
            requesting: false
        }
      default:
        return state;
    }
  }

