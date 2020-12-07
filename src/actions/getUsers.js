export function getUsers(){
    return (dispatch) => {
        dispatch({ type: 'START_LOG_REQUEST' });
    fetch('http://localhost:3001/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }}).then(res => res.json())
        .then(data => dispatch({type: 'GET_USERS', data}))}
}