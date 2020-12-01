
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


class App extends Component{

  state = {
    redirected: true
  }



  componentDidMount() {
    // console.log('localstorage user: ',localStorage.getItem('user'))
    // console.log('mounted')
    // this.setState({
    //   redirected: false

    // })
    this.props.getNotifications()
    this.props.getFriendships()
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
  renderHomePage = () => <HomePage  isLoggedIn = {this.props.loggedIn}/>
  renderSignUpPage = () => <SignUpPage handleSignUp={this.props.signUp}/>
  renderMyAccountPage = () => <MyAccountPage  handleEditInfo = {this.props.editInfo}/>
  renderCreatePostPage = () => <CreatePostPage  createPost = {this.props.createPost}/>
  renderPostFeedPage = () => <PostFeedPage  getPosts = {this.props.getPosts}/>


  render() {
  return (
    <div className="App">
      {(this.props.users.loggedIn)? <UserBar /> : <NavBar />}
            <Switch>
      <Route exact path='/' component={this.renderHomePage}/>
      <Route exact path='/about' component={AboutPage} />
      <Route exact path='/login' component={this.renderLogin} />
      <Route exact path='/signup' component={this.renderSignUpPage} />
      <Route exact path='/myaccount' component={this.renderMyAccountPage} />
      <Route exact path='/createpost' component={this.renderCreatePostPage} />
      {/* <Route exact path='/postfeed' component={this.renderPostFeedPage} /> */}
      <Route path='/postfeed' render={routerProps => <PostFeedPage {...routerProps} getPosts = {this.props.getPosts}/>} />
      <Route path={`/posts/:postId`} render={routerProps => <DisplayPostPage {...routerProps} /> }/>
      <Route path={`/users/:userId`} render={routerProps => <UserView {...routerProps} /> }/>
      <Route path='/notifications' component={NotificationPage} />
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
  logOut: () => dispatch({type: 'LOG_OUT'}),
  signUp: (text) => dispatch(signUpUser(text)),
  editInfo: (text) => dispatch(editUserInfo(text)),
  createPost: (text) => dispatch(createPost(text)),
  getPosts: () => dispatch(fetchPosts({type: 'GET_POSTS'})),
  getNotifications: () => dispatch(getNotifications({type: 'GET_NOTIFICATIONS'})),
  getFriendships: () => dispatch(getFriendships({type: 'GET_FRIENDSHIPS'}))
})



export default connect(mapStateToProps,mapDispatchToProps)(withRouter(App))
