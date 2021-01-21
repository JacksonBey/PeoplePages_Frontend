

export function fetchUser(text){
    return (dispatch) => {
        dispatch({ type: 'START_LOG_REQUEST' });
    fetch('https://nameless-journey-93136.herokuapp.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: text.username,
            password: text.password
        })
        })
        .then(res => res.json())
        .then(data => {
            dispatch({type: 'LOG_IN', data},
        ((data.error === 'Invalid username or password') ? null : (
            localStorage.setItem('user', data.user.username), localStorage.setItem('token', data.token)
         )))
        })
    }}