

export function fetchUser(text){
    // console.log('text: ', text)
    return (dispatch) => {
        dispatch({ type: 'START_LOG_REQUEST' });
    fetch('https://people-pages-app-api.herokuapp.com/login', {
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
            // console.log('login user data: ', data)
            dispatch({type: 'LOG_IN', data},
        ((data.error === 'Invalid username or password') ? null : (
            localStorage.setItem('user', data.user.username), localStorage.setItem('token', data.token)
         )))
        // } else {
        // this.setState({user: data.user, token: data.token, error: false, loggedIn: true}, () => {
        //     this.props.history.push('/') 
        // })}
        })
    }}