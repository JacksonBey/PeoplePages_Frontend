export function editUserInfo(text){
    console.log('text: ', text)
    return (dispatch) => {
        dispatch({ type: 'START_LOG_REQUEST' });
    fetch(`https://nameless-journey-93136.herokuapp.com/users/${text.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
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
         )
        })
    }}
