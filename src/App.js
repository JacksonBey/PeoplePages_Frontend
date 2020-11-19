
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

class App extends Component{


  renderLogin = () => <LoginPage handleLogin={this.props.login}/>

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
const mapStateToProps = ({users}) => ({users})

const mapDispatchToProps = dispatch => ({
  login: info => dispatch({type: 'LOG_IN', info}),
  signUp: id => dispatch({type: 'DELETE_RESTAURANT', id})
})



export default connect(mapStateToProps,mapDispatchToProps)(withRouter(App))
