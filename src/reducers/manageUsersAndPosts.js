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
            return { 
                ...state,
                user: {
                user: '',
                token: '',
                loggedIn: false,
                error: true}, requesting: false   
            }
        } else {
        return {
            ...state,
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
        // console.log('action data user id: ',action.data.user)
        // console.log('i was here')
        if(action.data.error === undefined) {localStorage.setItem('signup_error', '')
        return {
            ...state,
            user: {
            user: action.data.user.username,
            user_id: action.data.user.id,
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
    case 'GET_USERS':
        // console.log('hit get users')
        // console.log('action data: ', action.data)
        let users = action.data
        // let friendships = action.data.friendships
        // console.log('users in action:', users)
        return {
            users: users,
            // friendships: friendships,
            ...state,
            requesting: false
        }
    case 'GET_FRIENDSHIPS':
        // console.log('action data: ', action.data)
        return {...state,
            friendships: action.data.friendships
        }

    case 'EDIT_USER':
        //  console.log('action: ', action)
        return {
            ...state,
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
    case 'ADD_FRIEND':
        console.log('friended')
        console.log('friending action data',action.ntext)
        // let follower = action.ntext.follower
        let follower = state.users.find(user => user.id === action.ntext.follower.user_id)
        let followee = action.ntext.followee
        // let followerinx = state.users.findIndex(user => user.id === follower.user_id)
        // let followeeinx = state.users.findIndex(user => user.id === followee.user_id)
        follower.followees = [...follower.followees, followee]
        followee.followers = [...followee.followers, follower]
        console.log('followee: ', followee)
        console.log('follower: ', follower)
        let uusers = state.users.filter(user => user.id !== follower.id)
        uusers = uusers.filter(user => user.id !== followee.id)
        uusers = [...uusers, followee, follower]
        console.log('uusers: ', uusers)
        let nfriendslist = [...state.friendships, action.ntext.data.friendship]
        // let nusers = {users: [...state.users]}
        // console.log('nusers before: ', nusers)
        // nusers = {users: [...nusers.users.slice(0,followerinx), follower, ...nusers.users.slice(followerinx+1)]}
        // nusers = {users: [...nusers.users.slice(0,followeeinx), followee, ...nusers.users.slice(followeeinx+1)]}
        // console.log('nusers: ', nusers)

        // let nstate = [state.user, state.users=[...state.users.slice(0,followerinx), follower, ...state.users.slice(followerinx+1)]]
        // nstate = [state.user, nstate.users=[...nstate.users.slice(0,followeeinx), followee, ...nstate.users.slice(followeeinx+1)]]
        return {
            ...state, users: uusers, friendships: nfriendslist
        }
    case 'UN_FRIEND':
        console.log('unfriended')
        // console.log('unfriending action text',action.text)
        let ufollower = state.users.find(user => user.id === action.text.follower.user_id)
        let ufollowee = action.text.followee
        ufollower.followees = ufollower.followees.filter(followee => followee.id !== ufollowee.id)
        ufollowee.followers = ufollowee.followers.filter(follower => follower.id !== ufollower.id)
        let ufusers = state.users.filter(user => user.id !== ufollower.id)
        ufusers = ufusers.filter(user => user.id !== ufollowee.id)
        ufusers = [...ufusers, ufollowee, ufollower]
        // console.log('state friendships: ', state.friendships)
        let friendshiplist = state.friendships.filter(friendship => friendship.id !== action.text.friendship.id)
        console.log('friendshiplist: ',friendshiplist)
        // console.log('ufollower: ', ufollower)
        // console.log('ufollowee: ', ufollower)

        return {
            ...state, users: ufusers, friendships: friendshiplist
        }
    case 'GET_NOTIFICATIONS':
        console.log('notifications action data: ', action.data)
        return {
            ...state,
            notifications: action.data.notifications
        }
    case 'NOTIFY':
        console.log('notify action data: ', action)
        return {
            ...state,
            notifications: [...state.notifications, action.data.notification]
        }
    case 'READ_NOTIFICATION':
        console.log('read notify data', action.text)
        console.log('state.notifications: ', state.notifications)
        let nnotifications = state.notifications.filter(note => note.id !== action.text.id)
        console.log('nnotifications: ', nnotifications)
        return {
            ...state,
            notifications: nnotifications
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
        // console.log('action data: ', action.data)
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
    case 'EDIT_POST':
        console.log('action: ', action)
        let eidx = state.posts.findIndex(post => post.id === action.data.post.id)
        let epost = state.posts.find(post => post.id === action.data.post.id)
        epost.content = action.data.post.content
        return {
            posts: [...state.posts.slice(0,eidx), epost, ...state.posts.slice(eidx+1)],
            requesting: false
        }
    case 'DELETE_POST':
        let didx = state.posts.findIndex(post => post.id === action.text.post.id)
        return {
            posts: [...state.posts.slice(0,didx), ...state.posts.slice(didx+1)],
            requesting: false
        }
    case 'ADD_LIKE':
        console.log('like added', action.data.like.id)
        console.log('action data post id: ', action.data.like.post_id)
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

