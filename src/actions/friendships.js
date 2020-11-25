export function addFriend(text){
    console.log('text: ', text)
    return (dispatch) => {
        dispatch({ type: 'START_LOG_REQUEST' });
    fetch('http://localhost:3001/friendships', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                follower_id: text.follower_id,
                followed_id: text.followed_id
            })
            })
            .then(res => res.json())
            .then(data => {dispatch({type: 'ADD_FRIEND', data})})
}
}

export function unFriend(text){
    return (dispatch) => {
        dispatch({ type: 'START_REQUEST' });
    fetch(`http://localhost:3001/likes/${text.friendship_id}`, {method: 'DELETE'})
            .then(res => res.json())
            .then(data => {dispatch({type: 'UN_FRIEND', text})})
}
}