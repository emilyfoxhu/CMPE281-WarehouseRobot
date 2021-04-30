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

class Logs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usageList: []
        }

    }

    render() {
        const { classes } = this.props;
        let redirectVar = null;
        if(!localStorage.getItem('email')){
            redirectVar = <Redirect to= "/"/>
        }

        return(
            <div>
                {redirectVar}
                <UserNavbar/>
                <div>
                    <Typography variant="h1" className={classes.title}>Logs</Typography>
                    <hr className={classes.hr}/>
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(Logs);