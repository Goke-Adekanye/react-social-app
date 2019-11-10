import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// Redux stuff
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
// Icons
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';

const styles = (theme) => ({
    ...theme.spreadThis,
    button: {
    
      float: 'right'
    }
  });

class EditDetails extends Component {
  //setting default state
  state = {
    bio: '',
    website: '',
    location: '',
    open: false
  };
  //mapUserDetailsToState: method that check if credentials exist ? diplay credential : display none
  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : ''
    });
  };
  //handleOpen: method that open EditDetails-dialog-box
  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);

  };
  //handleClose: method that closes EditDetails-dialog-box
  handleClose = () => {
    this.setState({ open: false });
  };
  //Mounts credentials on Dialog-open
  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }
  //handleChange: method that sets the current value of input == the its corresponding value on the state
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  //handleSubmit: method that validates inputted userDetails and updates userDetails
  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };
  render() {
    const { classes } = this.props;

    //returning @material-ui JSX for EditDetails dialog
    return (
      <Fragment>
        <Tooltip title="Edit details" placement="top">
            <IconButton onClick={this.handleOpen}
                        className={classes.button}>
                    
                    <EditIcon color="primary" />
            </IconButton>
        </Tooltip>
        
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                tpye="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="A short bio about yourself"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="website"
                tpye="text"
                label="Website"
                placeholder="Your personal/professional website"
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="location"
                tpye="text"
                label="Location"
                placeholder="Where you live"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials
});

export default connect( mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));