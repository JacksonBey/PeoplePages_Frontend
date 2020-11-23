import React, {Component} from 'react';
import { connect } from "react-redux";

class HomePage extends Component {

    // showUsername = () => {
    //     if (this.props.user.data === undefined) {
    //         return <h1>Welcome To Our Stock App</h1>
    //     } else {
    //         return <h1>Hello, {this.props.user.data.attributes.username}</h1>
    //     }
    // }

    render() {
        // console.log('props', this.props.user.loggedIn)
        // console.log('state', 'dsf')
        return(
            <div>
                {/* {this.showUsername()} */}
        {this.props.user.loggedIn ? <p>Welcome, {this.props.user.user}</p> : null}
                <p>hi from homepage</p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.users.user
})


export default connect(mapStateToProps)(HomePage)