export function addFriend(text){
    // console.log('text: ', text)
    return (dispatch) => {
        dispatch({ type: 'START_LOG_REQUEST' });
    fetch('http://localhost:3001/friendships', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                follower_id: text.follower_id,
                followee_id: text.followee_id
            })
            })
            .then(res => res.json())
            .then(data => {dispatch({type: 'ADD_FRIEND', data})})
}
}

export function unFriend(text){
    return (dispatch) => {
        dispatch({ type: 'START_LOG_REQUEST' });
    fetch(`http://localhost:3001/friendships/${text.friendship_id}`, {method: 'DELETE'})
            .then(res => res.json())
            .then(data => {dispatch({type: 'UN_FRIEND', text})})
}
}