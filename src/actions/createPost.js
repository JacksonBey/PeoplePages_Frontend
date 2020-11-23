
export function createPost(text){
    // console.log('text: ', text)
    return (dispatch) => {
        dispatch({ type: 'START_REQUEST' });
    fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: text.content,
            user_id: text.userId,
            username: text.username
        })
        })
        .then(res => res.json())
        .then(data => {dispatch({type: 'CREATE_POST', data})})
}}