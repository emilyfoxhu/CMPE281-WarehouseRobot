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
import AdminNavbar from '../Navbar/AdminNavbar';
import backendConfig from "../../backendConfig";

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
        marginRight: theme.spacing(20),
    },
    title: {
        flexGrow: 1,
        fontSize: 30,
        fontWeight: 'bold',
    },
    table: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    text: {
        flexGrow: 1,
        fontSize: 13,
    },
    message: {
        flexGrow: 1,
        fontSize: 10,
        fontWeight: 'bold',
    },
    dialogtext: {
        flexGrow: 1,
        fontSize: 13,
        fontWeight: 'bold',
    },
});

class AdminDashboard extends Component {
    constructor(props){
        super(props);
        this.state = {  
            userlist: [],
        }
        this.handleCreate = this.handleCreate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleBilling = this.handleBilling.bind(this);
    }  
    componentDidMount(){ 
        axios.get(`${backendConfig}/admindashboard/users`)
            .then((response) => {
                this.setState({userlist : response.data})
            })
            .catch(err => {
                console.log(err.response);
            });
    }
    handleCreate = (event) => {
        event.preventDefault();//stop refresh
        
    }
    handleDelete = (event) => {
        event.preventDefault();//stop refresh
        
    }
    handleBilling = (event) => {
        event.preventDefault();//stop refresh
        
    }

    render(){
        const { classes } = this.props;
        console.log(this.state);
        //if not logged in go to login page
        let redirectVar = null;
        if(!localStorage.getItem('email')){
            redirectVar = <Redirect to= "/"/>
        }
        return(
            <div>
                {redirectVar}
                <AdminNavbar/>
                <div class="container">
                    <h2>Admin Dashboard</h2>
                </div>
                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} spacing={1}>
                            <Grid container spacing={5}>
                                <Grid item xs={5}>
                                    User Tracking<br/>
                                    Robot Tracking<br/>
                                    ...
                                </Grid>
                                <Grid item xs={7}>
                                    <Toolbar>
                                        <Typography variant="h6" className={classes.title}>
                                            Registered Users
                                        </Typography>
                                        <Button variant="contained" size="large" color="primary" onClick={this.handleCreate}>Create a user</Button>
                                        <div className="error" id="errorMsg" />  
                                    </Toolbar>
                                    <List className={classes.list}>
                                        {!this.state.userlist.length && <Typography className={classes.message}>There is no user yet...</Typography>}
                                        {this.state.userlist.map((listing, index) => {
                                            return (
                                                <Accordion>
                                                    <AccordionDetails>
                                                        <div className={classes.column}>
                                                            <Typography variant="h6" className={classes.detail}>User ID: {listing.iduser}</Typography>
                                                        </div>
                                                        <div className={classes.column}>
                                                            <Typography variant="h6" className={classes.detail}>User Name: {listing.username}</Typography>
                                                        </div>
                                                        <div className={classes.column} />
                                                        <div className={classes.column}>
                                                            <Typography variant="h6" className={classes.detail}>User Email: {listing.email}</Typography>
                                                        </div>
                                                        <div className={classes.column} />
                                                        <div className={classes.column}>
                                                            <Button variant="contained" size="large" color="primary" onClick={this.handleDelete}>Delete</Button>
                                                            <Button variant="contained" size="large" color="primary" onClick={this.handleBilling}>Billing</Button>
                                                        </div>
                                                    </AccordionDetails><br/>
                                                </Accordion>
                                            )}
                                        )}                                              
                                    </List>
                                    <Toolbar>
                                        <Typography variant="h6" className={classes.title}>
                                            Messages from user
                                        </Typography>
                                    </Toolbar>
                                    <List className={classes.list}>
                                                                                 
                                    </List>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div> 
            </div> 
        )
    }
}

export default withStyles(useStyles)(AdminDashboard);