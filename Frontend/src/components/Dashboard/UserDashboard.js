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
import {Bar, defaults} from "react-chartjs-2";

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

        let numMonths = 3;
        let feePerHour = 0.06;
        let graphLabel = [];
        let graphData = [];


        for(let i = 0; i < numMonths; i++){
            let d = new Date();
            d.setMonth(d.getMonth() - i);
            
            var monthRecord = this.state.usageList.filter((record) => {
                return record.month == d.getMonth() + 1 && record.year == d.getFullYear();
            })

            graphLabel.unshift(d.toLocaleString('default', {month:'long'}));

            if(monthRecord.length != 0){
                graphData.unshift(monthRecord[0].duration_hours * feePerHour);
            }else{
                graphData.unshift(0);
            }

        }

    
        return(
            <div>
                {redirectVar}
                <UserNavbar/>
                <div className="container">
                    <h2>User Dashboard</h2>
                </div>
                <div>
                    <Grid container spacing={3}>
                        <Grid item sm={12} md={6}>
                            <Paper>
                                <Typography variant="h4" className={classes.title}>
                                        Simulation
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <Paper>
                                <Typography variant="h2">
                                        Billing 
                                </Typography>
                                <br />
                                {/* {this.state.usageList.map((listing, index) => {
                                    return (
                                        <List>
                                            <Typography variant="h6" className={classes.detail}>Month: {listing.month}-{listing.year}</Typography>
                                            <Typography variant="h6" className={classes.detail}>Usage: {listing.duration_hours} hours</Typography>
                                        </List>
                                        
                                    )}
                                )} */}

                                <div>
                                    <Typography variant="h4">Current month-to-date balance for {graphLabel[graphLabel.length-1]}</Typography>
                                    <Typography variant="h3">${graphData[graphData.length-1]}</Typography>
                                </div>
                                
                                <div>
                                    <Bar
                                        data = {{
                                            labels: graphLabel,
                                            datasets: [
                                                {
                                                // label: '# of Votes',
                                                data: graphData,
                                                backgroundColor: [
                                                    'rgba(255, 99, 132, 0.2)',
                                                    'rgba(54, 162, 235, 0.2)',
                                                    'rgba(255, 206, 86, 0.2)',
                                                ],
                                                borderColor: [
                                                    'rgba(255, 99, 132, 1)',
                                                    'rgba(54, 162, 235, 1)',
                                                    'rgba(255, 206, 86, 1)',
                                                ],
                                                borderWidth: 1,
                                                },
                                            ],
                                            }}
                                            height={300}
                                            width={500}
                                            options={{
                                            maintainAspectRatio: false,
                                            scales: {
                                                yAxes: [
                                                {
                                                    ticks: {
                                                    beginAtZero: true,
                                                    },
                                                },
                                                ],
                                            },
                                            legend: {
                                                labels: {
                                                fontSize: 25,
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>

            </div> 
        )
    }
}

export default withStyles(useStyles)(UserDashboard);