export function fetchPosts(){
    // console.log('text: ', text)
    return (dispatch) => {
        dispatch({ type: 'START_REQUEST' });
    fetch('http://localhost:3001/posts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }}).then(res => res.json())
        .then(data => dispatch({type: 'GET_POSTS', data}))}
}