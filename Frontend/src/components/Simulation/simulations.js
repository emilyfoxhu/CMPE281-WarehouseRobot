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
import TablePagination from '@material-ui/core/TablePagination';

import { DataGrid } from '@material-ui/data-grid';

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

    table: {
        width: '100%',
    },

});

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'firstName', headerName: 'First name', width: 350 },
    { field: 'lastName', headerName: 'Last name', width: 350 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 150,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 500,
        valueGetter: (params) =>
            `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

class Simulations extends Component {
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
                    <Typography variant="h1" className={classes.title}>Simulations</Typography>
                    <hr className={classes.hr}/>
                </div>
                <br />
                <div style={{ height: 530, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} pageSize={8} />
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(Simulations);