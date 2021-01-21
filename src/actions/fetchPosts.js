export function fetchPosts(){
    return (dispatch) => {
        dispatch({ type: 'START_REQUEST' });
    fetch('https://nameless-journey-93136.herokuapp.com/posts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }}).then(res => res.json())
        .then(data => dispatch({type: 'GET_POSTS', data}))}
}