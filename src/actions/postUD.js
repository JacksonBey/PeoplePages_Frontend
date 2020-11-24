export function editPost(text){
    console.log('text: ', text)
    return (dispatch) => {
        dispatch({ type: 'START_REQUEST' });
    fetch(`http://localhost:3001/posts/${text.post.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
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
    fetch(`http://localhost:3001/posts/${text.postId}`, {method: 'DELETE'})
            .then(res => res.json())
            .then(data => {dispatch({type: 'DELETE_POST', text})})
}
}