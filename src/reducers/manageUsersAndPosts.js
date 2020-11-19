import { combineReducers } from "redux";
 
const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer
});
 
export default rootReducer;

function usersReducer(state = [], action) {
    switch (action.type) {
        
    case 'LOG_IN':
        console.log('state: ', state)
        console.log('action: ', action)
        return state

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