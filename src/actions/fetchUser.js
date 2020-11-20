export function fetchUser(text){
    console.log('text: ', text)
    return (dispatch) => {
        dispatch({ type: 'START_LOG_REQUEST' });
    fetch('http://localhost:3001/login', {
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
        .then(data => {dispatch({type: 'LOG_IN', data}, localStorage.setItem('user', data.user.username), localStorage.setItem('token', data.token))
        // if(data.message === 'Invalid username or password') {
        //     this.setState({error: true},() => {
        //     this.props.history.push('/login')
        //     })
        // } else {
        // this.setState({user: data.user, token: data.token, error: false, loggedIn: true}, () => {
        //     this.props.history.push('/') 
        // })}
        })
    }}