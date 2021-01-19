import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  Home,
  ProfilePage,
  SigninPage,
  SignupPage,
  ActivateAccountPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilesPage,
  AddPostPage,
  BrowsePostsPage,
  PostPage,
} from './pages';
import { getAuthUser } from './redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from './protected-routes/PrivateRoute';
import PrivateRouteAuthUser from './protected-routes/PrivateRouteAuthUser';
import MobileNav from './components/mobile-nav/MobileNav';
import Navbar from './components/navbar/Navbar';
import PopupMessage from './components/popup-message/PopupMessage';

function App() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userLogin);
  const {loading } = userState;
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const token = localStorage.getItem('token')
      ? JSON.parse(localStorage.getItem('token'))
      : null;
    if (token && !loading) {
      dispatch(getAuthUser(token));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
      <Router>
        <MobileNav isOpen={isOpen} toggle={toggle}></MobileNav>
        <Navbar toggle={toggle} />
        <PopupMessage />
        <Switch>
          <Route path='/' component={Home} exact />
          <PrivateRouteAuthUser path='/signin' component={SigninPage} exact />
          <PrivateRouteAuthUser path='/signup' component={SignupPage} exact />
          <PrivateRouteAuthUser
            path='/auth/activate/:token'
            component={ActivateAccountPage}
            exact
          />
          <PrivateRouteAuthUser
            path='/forgot-password'
            component={ForgotPasswordPage}
            exact
          />
          <PrivateRouteAuthUser
            path='/auth/password/reset/:token'
            component={ResetPasswordPage}
            exact
          />
          <PrivateRoute path='/profile/:id' component={ProfilePage} exact />
          <PrivateRoute path='/profiles' component={ProfilesPage} exact />
          <PrivateRoute path='/add-post' component={AddPostPage} exact />
          <PrivateRoute path='/browse' component={BrowsePostsPage} exact />
          <PrivateRoute path='/post/:postId' component={PostPage} exact />
        </Switch>
      </Router>
  );
}

export default App;
