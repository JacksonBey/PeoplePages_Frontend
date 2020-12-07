import React, {Component} from 'react';
import { connect } from "react-redux";

class HomePage extends Component {

    render() {
        return(
            <div>
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