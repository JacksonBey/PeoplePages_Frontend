export function editPost(text){
    console.log('text: ', text)
    return (dispatch) => {
        dispatch({ type: 'START_REQUEST' });
    fetch(`https://nameless-journey-93136.herokuapp.com/posts/${text.post.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            content: text.content
        })
        })
        .then(res => res.json())
        .then(data => {dispatch({type: 'EDIT_POST', data})})
}
}

export function deletePost(text){
    return (dispatch) => {
        dispatch({ type: 'START_REQUEST' });
    fetch(`https://nameless-journey-93136.herokuapp.com/posts/${text.post.id}`, {method: 'DELETE'})
            .then(res => res.json())
            .then(data => {dispatch({type: 'DELETE_POST', text})})
}
}