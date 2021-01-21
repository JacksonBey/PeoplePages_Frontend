export function getUsers(){
    return (dispatch) => {
        dispatch({ type: 'START_LOG_REQUEST' });
    fetch('https://nameless-journey-93136.herokuapp.com/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }}).then(res => res.json())
        .then(data => dispatch({type: 'GET_USERS', data}))}
}