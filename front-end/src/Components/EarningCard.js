import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, Grid, Menu, MenuItem, Typography } from '@material-ui/core';

// project imports
import MainCard from './Card/MainCard';


// style constant
const useStyles = makeStyles(() => ({
    card: {
        backgroundColor: '#5e35b1',
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: 'linear-gradient(210.04deg, #900ff9 -50.94%,rgb(94,53,177) 83.49%)',
            borderRadius: '50%',
            top: '-85px',
            right: '-95px',
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: 'linear-gradient(140.9deg, #90caf9 -14.02%,rgb(94,53,177) 77.58%)',
            borderRadius: '50%',
            top: '-125px',
            right: '-15px',
            opacity: 0.25,
           
        }
    },
    cardHeading: {
        fontSize: '2.125rem',
        fontWeight: 500,
    },
}));

//===========================|| DASHBOARD DEFAULT - EARNING CARD ||===========================//

const EarningCard = ({ isLoading }) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            
                <MainCard border={false} className={classes.card} contentClass={classes.content}>
                    <Grid container direction="column">
                      
                        <Grid item>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Typography className={classes.cardHeading}>$500.00</Typography>
                                </Grid>
                                
                            </Grid>
                        </Grid>
                        <Grid item sx={{ mb: 1.25 }}>
                            <Typography >Total Earning</Typography>
                        </Grid>
                    </Grid>
                </MainCard>
        
        </React.Fragment>
    );
};

EarningCard.propTypes = {
    isLoading: PropTypes.bool
};

export default EarningCard;
