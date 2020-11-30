export function notify(text){
    console.log('text: ', text)
    return (dispatch) => {
        dispatch({ type: 'START_LOG_REQUEST' });
    fetch('http://localhost:3001/notifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: text.user_id,
                reason: text.reason,
                friend_id: text.friend_id,
                post_id: text.post_id
            })
            })
            .then(res => res.json())
            .then(data => {dispatch({type: 'NOTIFY', data})})
}
}

export function readNotification(text){
    return (dispatch) => {
        dispatch({ type: 'START_LOG_REQUEST' });
    fetch(`http://localhost:3001/notifications/${text.id}`, {method: 'DELETE'})
            .then(res => res.json())
            .then(data => {dispatch({type: 'READ_NOTIFICATION', text})})
}
}


export function getNotifications(){
    // console.log('text: ', text)
    return (dispatch) => {
        dispatch({ type: 'START_LOG_REQUEST' });
    fetch('http://localhost:3001/notifications', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }}).then(res => res.json())
        .then(data => dispatch({type: 'GET_NOTIFICATIONS', data}))}
}