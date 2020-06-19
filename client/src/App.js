import React, { useEffect } from 'react';
import Landing from './components/Landing';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Reset from './components/Reset';
import Terms from './components/Terms';
import Policy from './components/Policy';
import Dashboard from './components/Dashboard';
import AddProfileImage from './components/AddProfileImage';
import EnterCode from './components/EnterCode';
import AddSocials from './components/AddSocials';
import Bio from './components/Bio';
import EditProfile from './components/EditProfile';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/registerUser';
import PublicProfile from './components/PublicProfile';
import ResetPassword from './components/ResetPassword';
require('dotenv').config();

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/landing">
            <Landing />
          </Route>

          <Route exact path="/register">
            <Register />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/add_profile_image">
            <AddProfileImage />
          </Route>

          <Route exact path="/add_socials">
            <AddSocials />
          </Route>

          <Route exact path="/bio">
            <Bio />
          </Route>

          <Route exact path="/reset_password">
            <Reset />
          </Route>

          <Route exact path="/enter_code">
            <EnterCode />
          </Route>

          <Route exact path="/new_password">
            <ResetPassword />
          </Route>

          <Route exact path="/terms_and_conditions">
            <Terms />
          </Route>

          <Route exact path="/privacy_policy">
            <Policy />
          </Route>

          <Route exact path="/edit_profile">
            <EditProfile />
          </Route>

          <Route exact path="/">
            <Landing />
          </Route>

          <Route exact path="/profile/:id">
            <PublicProfile />
          </Route>

          <Route exact path="/profile">
            <Login />
          </Route>

          <Route exact path="/:id">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
