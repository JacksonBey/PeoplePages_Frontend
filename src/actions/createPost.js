
export function createPost(text){
    return (dispatch) => {
        dispatch({ type: 'START_REQUEST' });
    fetch('https://nameless-journey-93136.herokuapp.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: text.content,
            user_id: text.userId,
            username: text.username,
            image: text.image
        })
        })
        .then(res => res.json())
        .then(data => {dispatch({type: 'CREATE_POST', data})})
}}