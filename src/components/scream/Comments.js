import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  ...theme.spreadThis,
  commentImage: {
    maxWidth: '100%',
    minWidth: '100%',
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%'
  },
  commentData: {
    marginLeft: 20
  }
});

class Comments extends Component {
 
  render() {
    //destructuring to get the needed items from the passed-in props
    const { comments, classes } = this.props;
    return (
      <Grid container>
        {/* 1: comment.map: from comments.array, map each comment
            2: index: function gotten from .map that allows getting position of items in array*/}
        {comments && (comments.map((comment, index) => {
          //destructuring to get the needed items from comment
          const { body, createdAt, userImage, userHandle } = comment;

          //returning @material-ui JSX for each components of mapped-comment
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  {/* comment-Image */}
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      alt="comment"
                      className={classes.commentImage}
                    />
                  </Grid>

                  {/* comment-details */}
                  <Grid item sm={9}>
                    <div className={classes.commentData}>

                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${userHandle}`}
                        color="primary"
                      >
                        {userHandle}
                      </Typography>

                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                      </Typography>

                      <hr className={classes.invisibleSeparator} />
                      <Typography variabnt="body1">{body}</Typography>
                    </div>
                  </Grid>

                </Grid>
              </Grid>
              {/* conditioner rendering: if its not last comment display visibleSeperator  */}
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })
        )}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array
};

export default withStyles(styles)(Comments);
