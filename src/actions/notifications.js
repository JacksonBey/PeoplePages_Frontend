export function notify(text){
    return (dispatch) => {
        dispatch({ type: 'START_LOG_REQUEST' });
    fetch('https://nameless-journey-93136.herokuapp.com/notifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
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
    fetch(`https://nameless-journey-93136.herokuapp.com/notifications/${text.id}`, {method: 'DELETE'})
            .then(res => res.json())
            .then(data => {dispatch({type: 'READ_NOTIFICATION', text})})
}
}


export function getNotifications(){
    return (dispatch) => {
        dispatch({ type: 'START_LOG_REQUEST' });
    fetch('https://nameless-journey-93136.herokuapp.com/notifications', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }}).then(res => res.json())
        .then(data => dispatch({type: 'GET_NOTIFICATIONS', data}))}
}