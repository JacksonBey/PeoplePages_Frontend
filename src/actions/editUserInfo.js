export function editUserInfo(text){
    console.log('text: ', text)
    return (dispatch) => {
        dispatch({ type: 'START_LOG_REQUEST' });
    fetch(`http://localhost:3001/users/${text.userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: text.firstName,
            lastNameInitial: text.lastNameInitial,
            age: text.age,
            location: text.location
        })
        })
        .then(res => res.json())
        .then(data => {dispatch({type: 'EDIT_USER', data}
        // ,
        // ((data.error === 'Invalid username or password') ? null : (
        //     localStorage.setItem('user', data.user.username), localStorage.setItem('token', data.token)
        //  ))
         )
        // } else {
        // this.setState({user: data.user, token: data.token, error: false, loggedIn: true}, () => {
        //     this.props.history.push('/') 
        // })}
        })
    }}

//     isEdit: false,
//     userId: '',
//     firstName: '',
//     lastNameInitial: '',
//     age: ''
// }