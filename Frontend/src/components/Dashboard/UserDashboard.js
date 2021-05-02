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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = (theme) => ({
    
    title:{
        color: "grey",
        fontSize: 45,
        textAlign: "center",
        marginTop: "30px",
        marginBottom: "0px"
    },

    hr:{
        width: '45%',
        borderStyle: 'inset',
        borderWidth: '2px',
    },
    
    paper:{
        margin: '30px 30px 30px 30px',
        padding: '30px 30px 30px 30px'
    },

    panelTitle:{
        marginBottom: '20px',
    },

    chartContainer:{
        marginTop: '30px'
    },

    button:{
        fontSize: '15px'
    },

    instancesContainer: {
        marginTop: '20px'
    },

    tablecell: {
        fontSize: '15px'
    },

});

function createData(id, runtime) {
    return { id, runtime};
  }
  
  const rows = [
    createData('WHR23546', 8),
    createData('WHR42384', 24),
    createData('WHR12973', 12),
  ];

class UserDashboard extends Component {
    constructor(props){
        super(props);
        this.state = {  
            usageList : []
        }
        
    }  
    componentDidMount(){ 
        axios.get(`${backendConfig}/userdashboard/usage/${localStorage.getItem("email")}`)
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
        console.log(this.state);
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
                <div>
                    <Typography variant="h1" className={classes.title}>User Dashboard</Typography>
                    <hr className={classes.hr}/>
                </div>
                <div>
                    <Grid container spacing={0}>
                        <Grid item sm={12} md={6}>
                            <Paper className={classes.paper} elevation={3}>
                                <Typography variant="h2" className={classes.panelTitle}>
                                        Simulation
                                </Typography>
                                <div>
                                    <Button variant="contained" size="large" color="primary" className={classes.button}>Start a warehouse robot</Button>
                                </div>
                                <div className={classes.instancesContainer}>
                                    <Typography variant="h4">Running Instances:</Typography>
                                    <br />
                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead>
                                            <TableRow>
                                                <TableCell className={classes.tablecell}>Robot ID</TableCell>
                                                <TableCell align="right" className={classes.tablecell}>Runtime(hours)</TableCell>
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {rows.map((row) => (
                                                <TableRow key={row.name}>
                                                <TableCell component="th" scope="row" className={classes.tablecell}>
                                                    {row.id}
                                                </TableCell>
                                                <TableCell align="right" className={classes.tablecell}>{row.runtime}</TableCell >
                                                </TableRow>
                                            ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <Paper className={classes.paper} elevation={3}>
                                <Typography variant="h2" className={classes.panelTitle}>
                                        Billing 
                                </Typography>
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
                                
                                <div className={classes.chartContainer}>
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
                                                display: false
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