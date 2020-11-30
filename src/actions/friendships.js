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
            .then(data => {
                let ntext = {...text, data}
                dispatch({type: 'ADD_FRIEND', ntext})})
}
}

export function unFriend(text){
    console.log('text: ', text)
    return (dispatch) => {
        dispatch({ type: 'START_LOG_REQUEST' });
    fetch(`http://localhost:3001/friendships/${text.friendship.id}`, {method: 'DELETE'})
            .then(res => res.json())
            .then(data => {dispatch({type: 'UN_FRIEND', text})})
}
}

export function getFriendships(text){
    return (dispatch) => {
        dispatch({ type: 'START_LOG_REQUEST' });
    fetch(`http://localhost:3001/friendships`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }}).then(res => res.json())
        .then(data => dispatch({type: 'GET_FRIENDSHIPS', data}))}
}