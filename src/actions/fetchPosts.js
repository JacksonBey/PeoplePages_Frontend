export function fetchPosts(){
    // console.log('text: ', text)
    return (dispatch) => {
        dispatch({ type: 'START_REQUEST' });
    fetch('https://people-pages-app-api.herokuapp.com/posts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }}).then(res => res.json())
        .then(data => dispatch({type: 'GET_POSTS', data}))}
}