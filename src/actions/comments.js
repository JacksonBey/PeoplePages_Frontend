
export function createComment(text){
    console.log('text: ', text)
    return (dispatch) => {
        dispatch({ type: 'START_REQUEST' });
    fetch('http://localhost:3001/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: text.content,
            user_id: text.user_id,
            post_id: text.post_id,
            username: text.username
        })
        })
        .then(res => res.json())
        .then(datas => {
            console.log('create comment data: ', datas)
            if (datas.error !== undefined){
                let data = {datas, text}
                dispatch({type: 'CREATE_COMMENT', data}) 
            } else {
                let data = datas
              dispatch({type: 'CREATE_COMMENT', data})  
            }
            })
}}


export function editComment(text){
    // console.log('text: ', text)
    return (dispatch) => {
        dispatch({ type: 'START_REQUEST' });
    fetch(`http://localhost:3001/comments/${text.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: text.content
        })
        })
        .then(res => res.json())
        .then(data => {dispatch({type: 'EDIT_COMMENT', data})})
}
}

export function deleteComment(text){
    return (dispatch) => {
        dispatch({ type: 'START_REQUEST' });
    fetch(`http://localhost:3001/comments/${text.id}`, {method: 'DELETE'})
            .then(res => res.json())
            .then(data => {dispatch({type: 'DELETE_COMMENT', text})})
}
}