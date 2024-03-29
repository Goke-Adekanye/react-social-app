import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';


import Profile from '../components/profile/Profile'
import Scream from '../components/scream/Scream'
import ScreamSkeleton from '../util/ScreamSkeleton';

import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

class home extends Component {
    //getscream: function Mounted in other to get all screams displayed on the Homepage
    componentDidMount() {
        this.props.getScreams();
    }

    render() {
        const { screams, loading } = this.props.data;
        //recentScreamMarkup: !loading ? map each scream into <Screaam /> and display screams : display loading
        let recentScreamsMarkup = !loading ? (
                                screams.map((scream) =>
                                                    <Scream key={scream.screamId} scream={scream} />)) 
                                
                                :  <ScreamSkeleton /> 

        return (
            <Grid container spacing={10}>
                 <Grid item sm={4} xs={12}>
                     <Profile /> 
                </Grid>

                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>

               
            </Grid>
        )
    }
}

home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    data: state.data
  });
  
  export default connect( mapStateToProps, { getScreams })(home);
