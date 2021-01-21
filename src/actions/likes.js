export function addLike(text){
    return (dispatch) => {
        dispatch({ type: 'START_REQUEST' });
    fetch('https://nameless-journey-93136.herokuapp.com/likes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: text.user_id,
                post_id: text.post_id
            })
            })
            .then(res => res.json())
            .then(data => {dispatch({type: 'ADD_LIKE', data})})
}
}

export function unLike(text){
    return (dispatch) => {
        dispatch({ type: 'START_REQUEST' });
    fetch(`https://nameless-journey-93136.herokuapp.com/likes/${text.like_id}`, {method: 'DELETE'})
            .then(res => res.json())
            .then(data => {dispatch({type: 'UNLIKE', text})})
}
}