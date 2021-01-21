export function signUpUser(text){
    console.log('text: ', text)
    return (dispatch) => {
        dispatch({ type: 'START_LOG_REQUEST' });
    fetch('https://nameless-journey-93136.herokuapp.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            username: text.username,
            password: text.password,
            firstName: text.firstName,
            lastNameInitial: text.lastNameInitial,
            profilePic: text.profilePic
        })
        })
        .then(res => res.json())
        .then(data => {dispatch({type: 'SIGN_UP', data}, console.log('data.error',data.error),
        ((data.error !== undefined) ? (
        localStorage.setItem('signup_error', 'invalid username or password') 
        )
        : (
            localStorage.setItem('user', data.user.username), localStorage.setItem('token', data.token)
         )))
        })
    }}