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
import { signupUser } from '../redux/actions/userActions';

const styles = {
    form: {
        textAlign: 'center'
      },
      image: {
        margin: '20px auto 20px auto'
      },
      pageTitle: {
        margin: '10px auto 10px auto'
      },
      textField: {
        margin: '10px auto 10px auto'
      },
      button: {
        marginTop: 20,
        position: 'relative'
      },
      customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
      },
      progress: {
        position: 'absolute'
      },
      accountText: {
        marginTop: 10
          
      }
}

class signup extends Component {
    //Form-handling: controlled component using the state
    constructor() {
        super();
        this.state = {
          email: '',
          password: '',
          confirmPassword: '',
          handle: '',
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
                const newUserData = {
                    email: this.state.email,
                    password: this.state.password,
                    confirmPassword: this.state.confirmPassword,
                    handle: this.state.handle
                };
                //LoginUser: passed-in userData and this.props.history(to redirect on Login-success)
                this.props.signupUser(newUserData, this.props.history)
                
              }

    render() {
        //destructuring to get the needed items from this.props and this.state
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state
        //returning @material-ui login-form JSX for login display
        return (
            //Grid: container holding the signup-form and its properties in the center
            <Grid container className={classes.form}>
              <Grid item sm />
                    <Grid item sm>
                        {/* image */}
                        <img src={AppIcon} alt="monkey" className={classes.image} />
                        {/* Login text */}
                        <Typography variant="h2" className={classes.pageTitle}>
                        Signup
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

                        <TextField
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        className={classes.textField}
                        helperText={errors.confirmPassword}
                        error={errors.confirmPassword ? true : false}
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        fullWidth
                        />

                        <TextField
                        id="handle"
                        name="handle"
                        type="text"
                        label="Handle"
                        className={classes.textField}
                        helperText={errors.handle}
                        error={errors.handle ? true : false}
                        value={this.state.handle}
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
                            Signup
                            {loading && (
                            <CircularProgress size={30} className={classes.progress} />
                            )}
                        </Button>
                        
                        {/* text for login */}
                        <br />
                        <small className={classes.accountText}>
                            already have an account ? login <Link to="/login">here</Link>
                        </small>
                        </form>
                    </Grid>
              <Grid item sm />
            </Grid>
          );
        }
      }
    
      
      signup.propTypes = {
        classes: PropTypes.object.isRequired,
        signupUser: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        UI: PropTypes.object.isRequired
      };
      //mapStateToProps: function that takes the global state and extract what is needed from the state
      const mapStateToProps = (state) => ({
        user: state.user,
        UI: state.UI
      });
     
      
      export default connect( mapStateToProps, { signupUser } )(withStyles(styles)(signup));