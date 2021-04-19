import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Container, Col, Row, Form, Button, ButtonGroup, Card } from 'react-bootstrap';
import { Grid, Typography } from "@material-ui/core";
import {Redirect} from 'react-router';
import UserNavbar from '../Navbar/UserNavbar';
import backend from "../../backendConfig";

const useStyles = (theme) => ({
    root: {
        marginLeft: theme.spacing(25),
        marginRight: theme.spacing(25),
        marginTop: theme.spacing(5),
    },
    title: {
        flexGrow: 1,
        fontSize: 25,
    },

});

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_id: "",
            username : "",
            email : "",
            phone : "",
            image : "default",
            file : ""
        }
        //Bind the handlers to this class

    }
    //handlers
    

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
                <div className={classes.root}>
                    <Typography variant="h6" className={classes.title}>
                        My Account
                    </Typography>
                    
                    <div className="error" id="errorMsg" />                 
                </div>
            </div>
        )
    }
}

export default withStyles(useStyles)(Profile);