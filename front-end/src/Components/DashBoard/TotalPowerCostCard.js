import PropTypes from 'prop-types';
import React from 'react';
// material-ui
import { makeStyles } from '@material-ui/styles';
import {Grid,Typography } from '@material-ui/core';
import Chart from 'react-apexcharts';
import { TotalOrderMonthLineCharData } from '../../variables/charts.js';
import OrderMainCard from '../Card/OrderMainCard';


// style constant
const useStyles = makeStyles(() => ({
    card: {
        backgroundColor: '#1e88e5',
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: 'linear-gradient(210.04deg, #900ff9 -50.94%, rgba(144, 202, 249, 0) 83.49%)',
            borderRadius: '50%',
            top: '-85px',
            right: '-95px',
            
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: 'linear-gradient(140.9deg, #90caf9 -14.02%, rgba(144, 202, 249, 0) 77.58%)',
            borderRadius: '50%',
            top: '-125px',
            right: '-15px',
            opacity: 0.5,
           
        }
    },
    cardHeading: {
        fontSize: '2.125rem',
        fontWeight: 500,
    },
}));

//===========================|| DASHBOARD DEFAULT - EARNING CARD ||===========================//

const TotalPowerCostCard = ({ isLoading ,option,series,totalPowerCost}) => {
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
            
                <OrderMainCard border={false} className={classes.card} contentClass={classes.content}>
                        
                <Grid item sx={{ mb: 0.75 }}>
                            <Grid container alignItems="center">
                                <Grid item xs={3}>
                                    <Grid container alignItems="center">
                                        <Grid item>
                                         
                                                <Typography className={classes.cardHeading}>${totalPowerCost}</Typography>
                                            
                                        </Grid>
                                       
                                        <Grid item xs={12}>
                                            <Typography >Total Cost</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={9}>
                                   <Chart height='95px' series={TotalOrderMonthLineCharData.seriesTotalOrderMonthLineCharData(series)} options={TotalOrderMonthLineCharData.optionTotalOrderMonthLineCharData(option)} type= 'line' /> 
                                </Grid>
                            </Grid>
                        </Grid>
                </OrderMainCard>
        
        </React.Fragment>
    );
};

TotalPowerCostCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalPowerCostCard;
