export function getUsers(){
    // console.log('text: ', text)
    return (dispatch) => {
        dispatch({ type: 'START_LOG_REQUEST' });
    fetch('https://people-pages-app-api.herokuapp.com/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }}).then(res => res.json())
        .then(data => dispatch({type: 'GET_USERS', data}))}
}