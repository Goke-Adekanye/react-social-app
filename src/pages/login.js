import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import { Link } from 'react-router-dom';
// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// Redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = (theme) => ({
  ...theme.spreadThis
});

class login extends Component {
    //Form-handling: controlled component using the state
    constructor() {
        super();
        this.state = {
          email: '',
          password: '',
          errors: {}
        };
      }
      //assigning error-values to the local errors-state
      UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
          this.setState({ errors: nextProps.UI.errors });
        }
      }
      //handleChange: method that sets the current value of input == the its corresponding value on the state
      handleChange = (event) => {
          this.setState({
          [event.target.name]: event.target.value
          });
      };
      //handleSubmit: method that validates form and prompt the next line of action
      handleSubmit = (event) => {
          event.preventDefault();
          
          const userData = {
          email: this.state.email,
          password: this.state.password
          };
          //LoginUser: passed-in userData and this.props.history(to redirect on Login-success)
          this.props.loginUser(userData, this.props.history)
          
      };

    render() {
        //destructuring to get the needed items from this.props and this.state
        const { classes, UI: {loading} } = this.props;
        const { errors } = this.state
        //returning @material-ui login-form JSX for login display
        return (
            //Grid: container holding the login-form and its properties in the center
            <Grid container className={classes.form}>
              <Grid item sm />
                    <Grid item sm>
                        {/* image */}
                        <img src={AppIcon} alt="monkey" className={classes.image} />
                        {/* Login text */}
                        <Typography variant="h2" className={classes.pageTitle}>
                        Login
                        </Typography>
                        {/* Form section */}
                        <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            className={classes.textField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                        />

                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            className={classes.textField}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        {/* if errors.general, render */}
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                            {errors.general}
                            </Typography>
                        )}
                        {/* Submit-Button */}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            disabled={loading}
                        >
                            {/* CircularProgress: displayed when validating inputted fields */}
                            Login
                            {loading && (
                            <CircularProgress size={30} className={classes.progress} />
                            )}
                        </Button>
                        
                        {/* text for Signup */}
                        <br />
                        <small className={classes.accountText}>
                            dont have an account ? sign up <Link to="/signup">here</Link>
                        </small>
                        </form>
                    </Grid>
              <Grid item sm />
            </Grid>
          );
        }
      }
    
      
      login.propTypes = {
        classes: PropTypes.object.isRequired,
        loginUser: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        UI: PropTypes.object.isRequired
      };
      //mapStateToProps: function that takes the global state and extract what is needed from the state
      const mapStateToProps = (state) => ({
        user: state.user,
        UI: state.UI
      });
      //mapActionsToProps
      const mapActionsToProps = {
        loginUser
      };
      
      export default connect( mapStateToProps, mapActionsToProps )(withStyles(styles)(login));