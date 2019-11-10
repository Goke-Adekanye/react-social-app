import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton'
// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// Icons
import ChatIcon from '@material-ui/icons/Chat';

// Redux
import { connect } from 'react-redux';


const styles = {
    card: {
      position: 'relative',
      display: 'flex',
      marginBottom: 20
    },
    image: {
      minWidth: 200,
      objectFit: 'cover'
    },
    content: {
      padding: 25,
      
    }
  };

class Scream extends Component {

    render() {
    //dayjs innitialization
    dayjs.extend(relativeTime)

    //destructuring to get the needed items from the passed-in props
    const { classes, scream: { body, createdAt, userImage, screamId, userHandle, likeCount, commentCount }, 
            user: {authenticated, credentials: { handle } } } = this.props;

    //conditioner rendering for diplaying delete-button
    //deleteButton: if authenticated && scream.userHandle === user.handle ? display delete-button : display null
    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteScream screamId={screamId} />
      ) : null;

        //returning @material-ui JSX for scream's display
        return (
            <Card className={classes.card}>
            {/* //Scream Image */}
            <CardMedia
              image={userImage}
              title="Profile image"
              className={classes.image}
            />
            {/* //Scream Contents - userHandle, createdAt.... */}
            <CardContent className={classes.content}>
              <Typography
                variant="h5"
                component={Link}
                to={`/users/${userHandle}`}
                color="primary" >
                {userHandle}
              </Typography>

              {deleteButton}
           
              <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).fromNow()}
              </Typography>

              <Typography variant="body1">{body}</Typography>

              {/* like and comment section */}
              <LikeButton  screamId={screamId}/>
              <span>{likeCount} Likes</span>
              <MyButton tip="comments">
                <ChatIcon color="primary" />
              </MyButton>
              <span>{commentCount} comments</span>

              {/* Open ScreamDialog section */}
              <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog} />
              
            </CardContent>
          </Card>
        )
    }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
  
};

const mapStateToProps = (state) => ({
  user: state.user
});



export default connect(mapStateToProps)(withStyles(styles)(Scream));
