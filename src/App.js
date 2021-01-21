
import './App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import MyAccountPage from './pages/MyAccountPage'
import CreatePostPage from './pages/CreatePostPage'
import PostFeedPage from './pages/PostFeedPage'
import {
  withRouter,
  Route,
  Switch
} from 'react-router-dom';
import NavBar from './Components/NavBar';
import UserBar from './Components/UserBar';
import { Component } from 'react';
import {connect} from 'react-redux'
import { fetchUser } from './actions/fetchUser'
import { signUpUser } from './actions/signUpUser'
import { editUserInfo } from './actions/editUserInfo'
import { createPost } from './actions/createPost'
import { fetchPosts } from './actions/fetchPosts'
import jwt_decode from "jwt-decode";
import DisplayPostPage from './pages/DisplayPostPage'
import UserView from './Components/UserView'
import NotificationPage from './pages/NotificationPage';
import {getNotifications} from './actions/notifications'
import { getFriendships } from './actions/friendships';
import {getUsers} from './actions/getUsers'
import UsersPage from './pages/UsersPage'
import Header from './Components/Header';


class App extends Component{

  state = {
    redirected: true
  }

  componentDidMount() {
    console.log(document.body)
    this.props.getNotifications()
    this.props.getFriendships()
    this.props.getPosts()
    this.props.getUsers()
    let token=localStorage.getItem('token')
    if(token){
      // let token= localStorage.getItem('token')
      let pw = jwt_decode(token, {header: true})
      let text = {username: localStorage.getItem('user'), password: pw.password}
      this.props.login(text)

    }
  }

  componentDidUpdate() {
    if(this.props.users.loggedIn === true && this.state.redirected === false){
      this.setState({
        redirected: true

      })
      this.props.history.push('/postfeed') 
    }

    if (this.props.location.pathname === '/login' && localStorage.token !== '') {
      this.props.history.push('/postfeed')
    }

    if (this.props.location.pathname === '/signup' && localStorage.token !== '') {
      this.props.history.push('/postfeed')
    }
  }

  handleLogout = () => {
    this.props.logOut()
    this.setState({
      redirected: false

    })
    this.props.history.push('/login') 
  }

  login = async (text) => {
    return await Promise.resolve(this.props.login(text))
  }


  handleLogin = (text) => {
    console.log('error: ', this.props.users.error)
    this.login(text)
  }

  handleCreation= () => {
    this.props.history.push('/postfeed')
  }

  handleSignUp = (text) => {
    this.props.signUp(text)
  }


  renderLogin = () => <LoginPage handleLogin={this.handleLogin} isLoggedIn = {this.props.loggedIn} handleLogout={this.handleLogout}/>
  renderHomePage = () => <HomePage  isLoggedIn = {this.props.loggedIn}/>
  renderSignUpPage = () => <SignUpPage handleSignUp={this.handleSignUp}/>
  renderMyAccountPage = () => <MyAccountPage  handleEditInfo = {this.props.editInfo}/>
  renderCreatePostPage = () => <CreatePostPage  createPost = {this.props.createPost} handleCreation = {this.handleCreation}/>
  renderPostFeedPage = () => <PostFeedPage  getPosts = {this.props.getPosts}/>


  render() {
  return (
    <div className="App">
      <Header />
      {(this.props.users.loggedIn)? <UserBar /> : <NavBar />}
            <Switch>
      <Route exact path='/' component={this.renderLogin}/>
      <Route exact path='/about' component={AboutPage} />
      <Route exact path='/login' component={this.renderLogin} />
      <Route exact path='/signup' component={this.renderSignUpPage} />
      <Route exact path='/myaccount' component={this.renderMyAccountPage} />
      <Route exact path='/createpost' component={this.renderCreatePostPage} />
      <Route path='/postfeed' render={routerProps => <PostFeedPage {...routerProps} getPosts = {this.props.getPosts}/>} />
      <Route path={`/posts/:postId`} render={routerProps => <DisplayPostPage {...routerProps} /> }/>
      <Route path={`/users/:userId`} render={routerProps => <UserView {...routerProps} isLoggedIn = {this.props.loggedIn} handleLogout={this.handleLogout}  getPosts = {this.props.getPosts}/> }/>
      <Route path='/notifications' component={NotificationPage} />
      <Route path='/users' component={UsersPage} />
      </Switch>
    </div>
  );
  }
}
const mapStateToProps = state => {
  return {users: state.users.user}
}

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers()),
  login: (text) => dispatch(fetchUser(text)),
  logOut: () => dispatch({type: 'LOG_OUT'}),
  signUp: (text) => dispatch(signUpUser(text)),
  editInfo: (text) => dispatch(editUserInfo(text)),
  createPost: (text) => dispatch(createPost(text)),
  getPosts: () => dispatch(fetchPosts({type: 'GET_POSTS'})),
  getNotifications: () => dispatch(getNotifications({type: 'GET_NOTIFICATIONS'})),
  getFriendships: () => dispatch(getFriendships({type: 'GET_FRIENDSHIPS'}))
})



export default connect(mapStateToProps,mapDispatchToProps)(withRouter(App))
