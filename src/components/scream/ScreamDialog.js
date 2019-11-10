import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton'
import Comments from './Comments';
import CommentForm from './CommentForm'
// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
// Redux stuff
import { connect } from 'react-redux';
import { getScream, clearErrors } from '../../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  profileImage: {
    minWidth: 200,
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '90%'
  },
  expandButton: {
    position: 'absolute',
    left: '90%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  }
});

class ScreamDialog extends Component {
  state = {
    open: false,
    oldPath: '',
    newPath: ''

  }
  //openDialog: scream-props that opens ScreamDialog for scream that matches screamIdParams
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }

  //handleOpen: method that open ScreamDialog, && setting url-path for opened-screamDialog & its relative user-page
  //2.i: setstate open = true
  //2.ii: calls function getscream which handles getting the clicked-scream displayed in ScreamDialog
  handleOpen = () => {
    //1: section that set url-path for opened-screamDialog & its relative user-page
    /* let oldPath = window.location.pathname

    const { userHandle, screamId } = this.props
    const newPath = `users/${userHandle}/scream/${screamId}`

    window.history.pushState(null,null, newPath)
    this.setState({ oldPath, newPath }); */

    //2; section that open ScreamDialog
    this.setState({ open: true });
    this.props.getScream(this.props.screamId);
  }

  //handleClose: method that close ScreamDialog, && setback the relative url-path
  //1: setstate open = false
  handleClose = () => {
    window.history.pushState(null,null, this.state.oldPath)

    this.setState({ open: false });
    this.props.clearErrors();
  }

  render() {
    //nested-destructuring to get the needed items from the passed-in props
    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        likeCount,
        commentCount,
        screamId,
        comments
     
      },
      UI: { loading }
    } = this.props;

    //conditioner rendering: dialogMarkup = if loading ? display CircularProgress : display scream and its properties
    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>

        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>

          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>

          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>

          <LikeButton screamId={screamId} />
          <span>{likeCount} likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
          
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm screamId={screamId} />
        <Comments comments={comments} />
        
      </Grid>
    );
    
    //returning @material-ui JSX for ScreamDialog 
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand scream"
          tipClassName={classes.expandButton}
        >

          <UnfoldMore color="primary" />
        </MyButton>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >

          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>

        </Dialog>
      </Fragment>
    );
  }
}

ScreamDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  
  
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  comments: state.data.scream.comments,
  UI: state.UI
});

const mapActionsToProps = {
  getScream,
  clearErrors
};

export default connect( mapStateToProps, mapActionsToProps )(withStyles(styles)(ScreamDialog));
