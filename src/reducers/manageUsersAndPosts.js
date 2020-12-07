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
            profilePic: action.data.user.profilePic,
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
            ...state,
            user: {
            user: action.data.user.username,
            user_id: action.data.user.id,
            token: action.data.token,
            firstName: action.data.user.firstName,
            lastNameInitial: action.data.user.lastNameInitial,
            location: action.data.user.location,
            age: action.data.user.age,
            profilePic: action.data.user.profilePic,
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
        let users = action.data
        return {
            users: users,
            ...state,
            requesting: false
        }
    case 'GET_FRIENDSHIPS':
        return {...state,
            friendships: action.data.friendships,
            requesting: false
        }

    case 'EDIT_USER':
         console.log('action: ', action)
        return {
            ...state,
            user: {
                ...state.user,
            location: action.data.user.location,
            age: action.data.user.age,
            loggedIn: true
        },
            requesting: false
        }
    case 'ADD_FRIEND':
        let nfriendslist = [...state.friendships, action.ntext.data.friendship]
        return {
            ...state, friendships: nfriendslist,
            requesting: false
        }
    case 'UN_FRIEND':
        console.log('unfriended')
        console.log('unfriending action text',action.text)
        let ufollower = state.users.find(user => user.id === action.text.follower_id)
        let ufollowee = action.text.followee


        let ufollowerfolloweeindex = ufollower.followees.findIndex(followee => followee.id === ufollowee.id)
        console.log('ufollowerfolloweeindex', ufollowerfolloweeindex)
        if (ufollowerfolloweeindex !== -1) {
            ufollower.followees.splice(ufollowerfolloweeindex, 1)
        }

        let ufollowerfollowerindex = ufollower.followers.findIndex(follower => follower.id === ufollowee.id)
        console.log('ufollowerfollowerindex', ufollowerfollowerindex)
        if (ufollowerfollowerindex !== -1) {
            ufollower.followers.splice(ufollowerfollowerindex, 1)
        }

        let ufolloweefollowerindex = ufollowee.followers.findIndex(follower => follower.id === ufollower.id)
        console.log('ufolloweefollowerindex', ufolloweefollowerindex)
        if (ufolloweefollowerindex !== -1) {
            ufollowee.followers.splice(ufolloweefollowerindex, 1)
        }

        let ufolloweefolloweeindex = ufollowee.followees.findIndex(followee => followee.id === ufollower.id)
        console.log('ufolloweefolloweeindex', ufolloweefolloweeindex)
        if (ufolloweefolloweeindex !== -1) {
            ufollowee.followees.splice(ufolloweefolloweeindex, 1)
        }



        console.log('ufollower: ', ufollower)
        console.log('ufollowee: ', ufollowee)
        let ufollowerindex= state.users.findIndex(user => user.id === ufollower.id )
        let ufusers = state.users

        ufusers = [...ufusers.slice(0,ufollowerindex), ufollower, ...ufusers.slice(ufollowerindex+1)]
        console.log('ufusers after follower: ', ufusers)

        let ufolloweeindex= ufusers.findIndex(user => user.id === ufollowee.id )
        ufusers = [...ufusers.slice(0,ufolloweeindex), ufollowee, ...ufusers.slice(ufolloweeindex+1)]
        console.log('ufusers after followee: ', ufusers)
        console.log('state friendships: ', state.friendships)
        let friendshiplist = state.friendships.filter(friendship => friendship.id !== action.text.friendship.id)
        console.log('friendshiplist: ',friendshiplist)


        return {
            ...state, users: ufusers, friendships: friendshiplist,
            requesting: false
        }
    case 'ACCEPT_FRIENDSHIP':
        console.log('friendship accepted')
        console.log('action data: ', action)
        let afollower = state.users.find(user => user.id === action.adata.text.follower_id)
        console.log('ufollower: ', afollower)
        let afollowee = state.users.find(user => user.id === action.adata.text.followee_id)
        console.log('ufollowee: ', afollowee)
        let afolloweri = state.users.findIndex(user => user.id === afollower.id)
        let afusers = state.users
        afusers = [...afusers.slice(0,afolloweri), afollower, ...afusers.slice(afolloweri+1)]
        
        let afolloweei = state.users.findIndex(user => user.id === afollowee.id)
        afusers = [...afusers.slice(0,afolloweei), afollowee, ...afusers.slice(afolloweei+1)]
        let afriendshiplist = state.friendships.filter(friendship => friendship.id !== action.adata.text.id)
        afriendshiplist=[...afriendshiplist, action.adata.data.friendship]
        return {
            ...state, users: afusers, friendships: afriendshiplist,
            requesting: false
        }
    case 'GET_NOTIFICATIONS':
        return {
            ...state,
            notifications: action.data.notifications,
            requesting: false
        }
    case 'NOTIFY':
        if (state.notifications !== undefined){
        return {
            ...state,
            notifications: [...state.notifications, action.data.notification],
            requesting: false
        }} else {
            return {
                ...state,
                notifications: [action.data.notification],
                requesting: false
            }
        }
    case 'READ_NOTIFICATION':
        let nnotifications = state.notifications.filter(note => note.id !== action.text.id)
        return {
            ...state,
            notifications: nnotifications,
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
        console.log('action: ', action)
        let newPost= action.data.post
        if(action.data.error === undefined) {localStorage.setItem('post_error', '')
        newPost.likes = []
        newPost.comments = []
        } else{localStorage.setItem('post_error', action.data.error.content)} 
        return {
            posts: [ newPost, ...state.posts],
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
        console.log('like added', action.data)
        console.log('state users' , state)
        let idx = state.posts.findIndex(post => post.id === action.data.like.post_id)
        let post = state.posts.find(p => p.id === action.data.like.post_id)

        post.likes = [...post.likes, action.data.like]

        return {
            posts: [...state.posts.slice(0,idx), post, ...state.posts.slice(idx+1)],
            requesting: false
        }
    case 'UNLIKE':
        let index = state.posts.findIndex(post => post.id === action.text.post_id)
        let likepost = state.posts.find(p => p.id === action.text.post_id)
        likepost.likes = likepost.likes.filter(like => like.id !== action.text.like_id)
        return {
            posts: [...state.posts.slice(0,index), likepost, ...state.posts.slice(index+1)],
            requesting: false
        }
    case 'CREATE_COMMENT':
        console.log('action data: ', action.data)
        console.log('error? : ', action.data.datas !== undefined)
        if (action.data.datas !== undefined) {
            console.log('action data error content: ', action.data.datas.error.content)
            let cidx = state.posts.findIndex(post => post.id === action.data.text.post_id)
            let cpost = state.posts.find(p => p.id === action.data.text.post_id)
            cpost.errors = true
            return {
                posts: [...state.posts.slice(0,cidx), cpost, ...state.posts.slice(cidx+1)],
                requesting: false
            }
        } else {
        let cidx = state.posts.findIndex(post => post.id === action.data.comment.post_id)
        let cpost = state.posts.find(p => p.id === action.data.comment.post_id)
        cpost.comments = [...cpost.comments, action.data.comment]
        cpost.errors = false

        return {
            posts: [...state.posts.slice(0,cidx), cpost, ...state.posts.slice(cidx+1)],
            requesting: false
        }

        }

    case 'EDIT_COMMENT':
        console.log('action data: ', action.data)


        let ecpost = state.posts.find(post => post.id === action.data.comment.post_id)
        let ecommentPostidx = state.posts.findIndex(post => post.id === action.data.post_id)
        let ecidx = ecpost.comments.findIndex(comment => comment.id === action.data.comment.id)
        ecpost.comments = ecpost.comments.filter(comment => comment.id !== action.data.comment.id)
        ecpost.comments = [...ecpost.comments.slice(0,ecidx), action.data.comment, ...ecpost.comments.slice(ecidx+1)]
        return {
            posts: [...state.posts.slice(0,ecommentPostidx), ecpost, ...state.posts.slice(ecommentPostidx+1)],
            requesting: false
        }
    case 'DELETE_COMMENT':
        console.log('action data: ', action.text)
        let dcpost = state.posts.find(post => post.id === action.text.comment.post_id)
        console.log('dcpost: ', dcpost)
        let dcommentPostidx = state.posts.findIndex(post => post.id === action.text.comment.post_id)

        dcpost.comments = dcpost.comments.filter(comment => comment.id !== action.text.comment.id)
        return {
            posts: [...state.posts.slice(0,dcommentPostidx), dcpost, ...state.posts.slice(dcommentPostidx+1)],
            requesting: false
        }
    default:
        return state;
    }
  }