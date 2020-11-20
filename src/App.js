
import './App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import {
  withRouter,
  Route,
  Switch
} from 'react-router-dom';
import NavBar from './Components/NavBar';
import { Component } from 'react';
import {connect} from 'react-redux'
import { fetchUser } from './actions/fetchUser'
import jwt_decode from "jwt-decode";


class App extends Component{

  state = {
    redirected: false
  }



  componentDidMount() {
    // console.log('localstorage user: ',localStorage.getItem('user'))
    // console.log('mounted')
    this.setState({
      redirected: false

    })
    if(localStorage.getItem('token') !== ''){
      let token= localStorage.getItem('token')
      // console.log('token: ', token)
      let pw = jwt_decode(token)
      // console.log('parseJwt: ', pw.password)
      let text = {username: localStorage.getItem('user'), password: pw.password}
      // console.log('text: ', text)
      this.props.login(text)

    }
  }

  componentDidUpdate() {
    // console.log('ls user: ',localStorage.getItem('user'))
    // console.log('logged in?')
    // console.log('redirected?', this.state.redirected)
    // console.log('loggedIn: ',this.props.users.loggedIn)
    // console.log(this.props.history)
    if(this.props.users.loggedIn === true && this.state.redirected === false){
      // console.log('logged in!!!!!!')
      this.setState({
        redirected: true

      })
      this.props.history.push('/') 
    }
  }

  handleLogout = () => {
    // console.log('handlelogout')
    this.props.logOut()
    this.setState({
      redirected: false

    })
  }


  renderLogin = () => <LoginPage handleLogin={this.props.login} isLoggedIn = {this.props.loggedIn} handleLogout={this.handleLogout}/>

  render() {
  return (
    <div className="App">
      <NavBar />
            <Switch>
      <Route exact path='/' component={HomePage}/>
      <Route exact path='/about' component={AboutPage} />
      <Route exact path='/login' component={this.renderLogin} />
      </Switch>
    </div>
  );
  }
}
const mapStateToProps = state => {
  // console.log(state.users.user)
  return {users: state.users.user}
}

const mapDispatchToProps = dispatch => ({
  login: (text) => dispatch(fetchUser(text)),
  logOut: () => dispatch({type: 'LOG_OUT'})
})



export default connect(mapStateToProps,mapDispatchToProps)(withRouter(App))
