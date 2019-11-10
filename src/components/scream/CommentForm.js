import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// Redux stuff
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.spreadThis,
});

class CommentForm extends Component {
  state = {
    body: '',
    errors: {}
  };

  //assign UI.errors to state.errors if UI.errors exist
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    //if !error.exist && !loading, setState({......})
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '' });
      this.setState({ errors: {} });
    }
  }
  //handleChange: method that sets the current value of input == the its corresponding value on the state
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  //handleSubmit: method that validates inputted comment.body and submitComment
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitComment(this.props.screamId, { body: this.state.body });
    
  };

  render() {
    //destructuring to get the needed items from the passed-in props and this.state
    const { classes, authenticated } = this.props;
    const errors = this.state.errors;

    //conditioner rendering for diplaying commentFormMarkup
    //commentFormMarkup: if authenticated ? display commentFormMarkup : display null
    const commentFormMarkup = authenticated ? (
      //JSX for displaying commentForm
      <Grid item sm={12} style={{ textAlign: 'center' }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Comment on scream"
            error={errors.comment ? true : false}
            helperText={errors.comment}
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
        <hr className={classes.visibleSeparator} />
      </Grid>
    ) : null;
    return commentFormMarkup;
  }
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

export default connect( mapStateToProps, { submitComment })(withStyles(styles)(CommentForm));