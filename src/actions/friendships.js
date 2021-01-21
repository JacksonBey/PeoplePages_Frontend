export function addFriend(text){
    return (dispatch) => {
        dispatch({ type: 'START_LOG_REQUEST' });
    fetch('https://nameless-journey-93136.herokuapp.com/friendships', {
            method: 'POST',
            headers: {
                        'Content-Type': 'application/json',
        'Accept': 'application/json'
            },
            body: JSON.stringify({
                follower_id: text.follower_id,
                followee_id: text.followee_id,
                pending: true
            })
            })
            .then(res => res.json())
            .then(data => {
                let ntext = {...text, data}
                dispatch({type: 'ADD_FRIEND', ntext})})
}
}

export function acceptFriendship(text){
    console.log('text: ', text)
    return (dispatch) => {
        dispatch({ type: 'START_LOG_REQUEST' });
    fetch(`https://nameless-journey-93136.herokuapp.com/friendships/${text.id}`, {
        method: 'PATCH',
        headers: {
                    'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: JSON.stringify({
            pending: false
        })
        })
        .then(res => res.json())
        .then(data => {
            let adata = {data, text}
            dispatch({type: 'ACCEPT_FRIENDSHIP', adata})})
    }}


export function unFriend(text){
    console.log('text: ', text)
    return (dispatch) => {
        dispatch({ type: 'START_LOG_REQUEST' });
    fetch(`https://nameless-journey-93136.herokuapp.com/friendships/${text.friendship.id}`, {method: 'DELETE'})
            .then(res => res.json())
            .then(data => {dispatch({type: 'UN_FRIEND', text})})
}
}

export function getFriendships(text){
    return (dispatch) => {
        dispatch({ type: 'START_LOG_REQUEST' });
    fetch(`https://nameless-journey-93136.herokuapp.com/friendships`, {
        method: 'GET',
        headers: {
                    'Content-Type': 'application/json',
        'Accept': 'application/json'
        }}).then(res => res.json())
        .then(data => dispatch({type: 'GET_FRIENDSHIPS', data}))}
}