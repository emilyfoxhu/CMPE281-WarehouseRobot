import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button, Paper } from '@material-ui/core';
import { Form } from 'react-bootstrap';
import Toolbar from '@material-ui/core/Toolbar';
import { Accordion, AccordionDetails, AccordionSummary, Divider, List } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import UserNavbar from '../Navbar/UserNavbar';
import backendConfig from "../../backendConfig";

const useStyles = (theme) => ({
    
});

class UserDashboard extends Component {
    constructor(props){
        super(props);
        this.state = {  
            usageList : []
        }
        
    }  
    componentDidMount(){ 
        axios.get(`${backendConfig}/userdashboard/usage`)
            .then((response) => {
                this.setState({usageList : response.data})
            })
            .catch(err => {
                console.log(err.response);
            });
    }
    
    render(){
        const { classes } = this.props;
        //if not logged in go to login page
        let redirectVar = null;
        if(!localStorage.getItem('email')){
            redirectVar = <Redirect to= "/"/>
        }
        return(
            <div>
                {redirectVar}
                <UserNavbar/>
                <div class="container">
                    <h2>User Dashboard</h2>
                </div>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item sm={12} md={6}>
                            <Paper className={classes.paper}>
                                <Typography variant="h4" className={classes.title}>
                                        Simulation
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <Paper className={classes.paper}>
                                <Typography variant="h4" className={classes.title}>
                                        Billing 
                                </Typography>
                                {this.state.usageList.map((listing, index) => {
                                    return (
                                        <List>
                                            <Typography variant="h6" className={classes.detail}>Month: {listing.month}-{listing.year}</Typography>
                                            <Typography variant="h6" className={classes.detail}>Usage: {listing.duration_hours} hours</Typography>
                                        </List>
                                        
                                    )}
                                )}
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div> 
        )
    }
}

export default withStyles(useStyles)(UserDashboard);