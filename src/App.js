
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

class App extends Component{


  renderLogin = () => <LoginPage handleLogin={this.props.login} isLoggedIn = {this.props.loggedIn}/>

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
  console.log(state.users.user)
  return {users: state.users.user}
}

const mapDispatchToProps = dispatch => ({
  login: (text) => dispatch(fetchUser(text)),
  signUp: id => dispatch({type: 'DELETE_RESTAURANT', id})
})



export default connect(mapStateToProps,mapDispatchToProps)(withRouter(App))
