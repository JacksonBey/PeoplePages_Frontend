import React, {Component} from 'react';

export default class HomePage extends Component {

    // showUsername = () => {
    //     if (this.props.user.data === undefined) {
    //         return <h1>Welcome To Our Stock App</h1>
    //     } else {
    //         return <h1>Hello, {this.props.user.data.attributes.username}</h1>
    //     }
    // }

    render() {
        return(
            <div>
                {/* {this.showUsername()} */}
                <p>hi from homepage</p>
            </div>
        )
    }
}