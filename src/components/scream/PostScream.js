import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
// Redux stuff
import { connect } from 'react-redux';
import { postScream, clearErrors } from '../../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '3%'
  }
});

class PostScream extends Component {
  state = {
    open: false,
    body: '',
    errors: {}
  };
  //assign UI.errors to state.errors if UI.errors exist
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    //if errors doesn't exist && it's not loading, set dialog-body to empty, close dialog, set errors = null
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '', open: false, errors: {} });
    }
  }
  //handleOpen: method that open postScream-dialog-box
  handleOpen = () => {
    this.setState({ open: true });
  };
  //handleclose: method that close postScream-dialog-box
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  //handleChange: method that sets the current value of input == the its corresponding value on the state
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  //handleSubmit: method that validates inputted scream.body and postScream
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postScream({ body: this.state.body });
  };

      render() {
        //destructuring to get the needed items from the passed-in props and this.state
        const { errors } = this.state;
        const { classes, UI: { loading } } = this.props;

        //returning @material-ui JSX for postScream dialog
        return (
          <Fragment>
            <MyButton onClick={this.handleOpen} tip="Post a Scream!">
              <AddIcon />
            </MyButton>

            <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">

              <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                <CloseIcon />
              </MyButton>

              <DialogTitle>Post a new scream</DialogTitle>

              <DialogContent>

                  <form onSubmit={this.handleSubmit}>
                      {/* Scream.body Textfield */}
                      <TextField
                        name="body"
                        type="text"
                        label="SCREAM!!"
                        multiline
                        rows="3"
                        placeholder="Scream at your highest tone"
                        error={errors.body ? true : false}
                        helperText={errors.body}
                        className={classes.textField}
                        onChange={this.handleChange}
                        fullWidth
                      />

                      {/* Submit-Button */}
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submitButton}
                        disabled={loading}>

                          Submit
                          {/* CircularProgress: displayed when validating inputted scream.body */}
                          {loading && (<CircularProgress size={30} className={classes.progressSpinner}/>)}
                      </Button>
                </form>
              </DialogContent>
            </Dialog>
          </Fragment>
        );
      }
    }

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  UI: state.UI
});

export default connect( mapStateToProps, { postScream, clearErrors })(withStyles(styles)(PostScream));
