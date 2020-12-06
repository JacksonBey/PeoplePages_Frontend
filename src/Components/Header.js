import React, {Component} from 'react';
// import PPlogo from '../images/PPlogo2.png'

export default class Header extends Component {


    render() {
        return(
            <div className='header' width='100%'>
                <span >
                {/* <img   src={PPlogo} alt='' width="80" height="65" align='left'/> */}
                <h1 align='left'>People Pages</h1>
                </span>
            </div>
        )
    }
}


// style={{ color: 'red' }}