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
            user_id: action.data.user.id,
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
        if(action.data.error === undefined) {localStorage.setItem('signup_error', '')
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
        } else{
        return { user: {
                user: '',
                token: '',
                loggedIn: false,
                error: true}, requesting: false   
            }
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

  function postsReducer(state ={
      posts: [], 
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
        // console.log('post created? actiom data error', action.data.error)
        if(action.data.error === undefined) {localStorage.setItem('post_error', '')
        } else{localStorage.setItem('post_error', action.data.error.content)} 
        return {
            ...state,
            requesting: false
        }
    case 'ADD_LIKE':
        // console.log('like added', action.data.like.id)
        // console.log('action data post id: ', action.data.like.post_id)
        // console.log('state posts: ', state.posts)
        let idx = state.posts.findIndex(post => post.id === action.data.like.post_id)
        //find post
        //add likes into post likes
        //add post back into state
        let post = state.posts.find(p => p.id === action.data.like.post_id)

        post.likes = [...post.likes, action.data.like]
        // console.log('found post: ', post)

        return {
            posts: [...state.posts.slice(0,idx), post, ...state.posts.slice(idx+1)],
            requesting: false
        }
    case 'UNLIKE':
        // console.log('like removed')
        // console.log('action text: ', action.text)
        let index = state.posts.findIndex(post => post.id === action.text.post_id)
        let likepost = state.posts.find(p => p.id === action.text.post_id)
        likepost.likes = likepost.likes.filter(like => like.id !== action.text.like_id)
        return {
            posts: [...state.posts.slice(0,index), likepost, ...state.posts.slice(index+1)],
            requesting: false
        }
      default:
        return state;
    }
  }

