import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Scream from '../components/scream/Scream';
import StaticProfile from '../components/profile/StaticProfile';
import ScreamSkeleton from '../util/ScreamSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
  state = {
    profile: null,
    screamIdParam: null
  };
  
  componentDidMount() {
    //.match.params: function that gets parameter from url
    const handle = this.props.match.params.handle;
    const screamId = this.props.match.params.screamId

    if(screamId) this.setState({screamIdParam: screamId })
    
    //onMount - 1; getUserData(scream) of the handle of current page
    //axios.get - 2: get user-profile from user-collection
    //srtState - 3: set state-profile: user-profile 
    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    //destructuring to get needed items from this.props
    const { screams, loading } = this.props.data;
    const { screamIdParam } = this.state
    
    //nested-conditioner rendering: loading ? display Loading : screams === null ? (display no scream) : (map user-scream to scraem)
    const screamsMarkup = loading ? (
      <ScreamSkeleton />
    ) :
      screams === null ? (
      <p>No screams from this user</p>
    ) : //!screamIdParam ? display screams : condition ? (display screams) : (display screamDialog)
      !screamIdParam ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      screams.map((scream) => {
      if(scream.screamId !== screamIdParam ) 
            return <Scream key={scream.screamId} scream={scream} />
      
      else  return <Scream key={scream.screamId} scream={scream} openDialog/>
    })
    )

    return (
      //JSX displaying user/:handle page
      <Grid container spacing={10}>
        
        <Grid item sm={4} xs={12}>
            {/* conditioner rendering for displaying profile */}
            {this.state.profile === null ? (
              <ProfileSkeleton />
            ) : (
              <StaticProfile profile={this.state.profile} />
            )}
        </Grid>

        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);
