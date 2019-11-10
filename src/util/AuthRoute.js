import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//destructuring items needed such as the component, the authentication state, and spread the rest of the properties....
//...rest: meaning include any other properties added later on
const AuthRoute = ({ component: Component, authenticated, ...rest }) => (

  <Route
    {...rest}
    //if authentication is true, proceed to homepage, else go to Login or Signup
    render={(props) =>
      authenticated === true ? <Redirect to="/" /> : <Component {...props} />
    }
  />
)

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});

AuthRoute.propTypes = {
  user: PropTypes.object
};

export default connect(mapStateToProps)(AuthRoute);