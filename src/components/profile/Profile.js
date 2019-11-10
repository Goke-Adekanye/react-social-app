import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import ProfileSkeleton from '../../util/ProfileSkeleton';
import EditDetails from './EditDetails';

// MUI stuff
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
//Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';

const styles = (theme) => ({
  ...theme.spreadThis
});

class Profile extends Component {
    //handleImageChange: method that --
    //1: image: get the first file picked
    //2: formData.append: assign image and image.name to formData
    //3: uploadImage(formdata): action that connects to image-server to handle image-upload
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
      };
      //handleEditPicture: method that handles click on hidden-input-type
      handleEditPicture = () => {
          //1: get the id of the hidden-input-type
          //2: click the hidden-input-type
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
      };
      handleLogout = () => {
        this.props.logoutUser();
      };
    render() {
        //nested-destructuring to get needed items from this.props
        const { classes, user: {
                            credentials: { handle, createdAt, imageUrl, bio, website, location },
                            loading,
                            authenticated 
                        }
             } = this.props
        //profileMarkup nested-conditioner-rendering
        //1: !loading ? (if authenticated ? display profileMarkup : display login n signup button) : display Loading... state
        let profileMarkup = !loading ? (
          authenticated ? (
            //profileMarkup  
            <Paper className={classes.paper}>
              <div className={classes.profile}>
                {/* Image-wrapper */}
                <div className="image-wrapper">
                    <img src={imageUrl} alt="profile" className="profile-image" />
                    {/* Hidden input-type */}
                    <input
                        type="file"
                        id="imageInput"
                        hidden="hidden"
                        onChange={this.handleImageChange}
                    />
                    {/* Tooltip: gives tip for icon's function */}
                    <Tooltip title="Edit profile picture" placement="top"> 
                        <IconButton  onClick={this.handleEditPicture} className="button">
                            <EditIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                </div>

                <hr />
                {/* Details */}
                <div className="profile-details">
                    <MuiLink
                        component={Link}
                        to={`/users/${handle}`}
                        color="primary"
                        variant="h5"
                    >
                        @{handle}
                    </MuiLink>

                  <hr />
                    {/* conditioner-rendering for profile-details (Bio, location, website) */}
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr />

                    {location && (
                        <Fragment>
                        <LocationOn color="primary" /> <span>{location}</span>
                        <hr />
                        </Fragment>
                    )}
                    
                    {website && (
                        <Fragment>
                        <LinkIcon color="primary" />
                        <a href={website} target="_blank" rel="noopener noreferrer">
                            {' '}
                            {website}
                        </a>
                        <hr />
                        </Fragment>
                    )}
                  <CalendarToday color="primary" />{' '}
                  <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span> 
                </div>
                {/* Logout Icon */}
                <Tooltip title="Logout" placement="top">
                    <IconButton  onClick={this.handleLogout}>
                        <KeyboardReturn color="primary" />
                    </IconButton>
                </Tooltip>
                <EditDetails/>
              </div>
              
            </Paper>
           
          ) : (
            <Paper className={classes.paper}>
              <Typography variant="body2" align="center">
                No profile found, please login again
              </Typography>
              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/login"
                >
                  Login
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/signup"
                >
                  Signup
                </Button>
              </div>
            </Paper>
          )
        ) : (
          <ProfileSkeleton />
        );
    
        return profileMarkup;
      }
    }

const mapStateToProps = (state) => ({
    user: state.user
  });
  
  const mapActionsToProps = { logoutUser, uploadImage };
  
  Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };
  
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(withStyles(styles)(Profile));
