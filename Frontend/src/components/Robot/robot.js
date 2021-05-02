import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import UserNavbar from '../Navbar/UserNavbar';
import backendConfig from "../../backendConfig";
import {Button} from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
    table: {
        width: '82%',
    },
    fieldset: {
        margin: '4%',
        border: '1px solid #ccc'
    }
});

function makeid(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}

let simulationName = '';

class Robot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            robotList: [],
            accountId: 0,
            disableStartButton: false,
            disableStopButton: true,
            selectedRobot: '',
            currentSimulation: ''
        }

    }

    componentDidMount() {
        axios.get(`${backendConfig}/aws_robomaker/list_robots`)
            .then((response) => {
                this.setState({robotList : response.data.message.simulations});
                this.setState({ accountId: response.data.message.account_id });
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    render() {
        const handleStartSimulation = (event) => {
            event.preventDefault();//stop refresh
            let sim = "sim-" + makeid(11);
            simulationName = sim;
            this.setState({ currentSimulation: sim });
            this.setState( { disableStartButton: true });
            axios.post(`${backendConfig}/users/startSimulation`, {
                email: localStorage.getItem('email'),
                robotName: this.state.selectedRobot,
                simulationName: sim
            })
                .then((response) => {
                    alert("Simulation started successfully.");
                    this.setState( { disableStopButton: false });
                })
                .catch(err => {
                    console.log(err.response);
                });
        };

        const handleChange = (event) => {
            this.setState({ selectedRobot: event.target.value });
        }

        const handleStopSimulation = (event) => {
            event.preventDefault();//stop refresh
            this.setState( { disableStopButton: true });
            let sim = this.state.currentSimulation;
            if (sim === "") {
                sim = simulationName;
            }

            axios.post(`${backendConfig}/users/stopSimulation`, {
                simulationName: sim,
            })
                .then((response) => {
                    alert("Simulation stopped successfully.");
                    this.setState( { disableStartButton: false });
                    axios.post(`${backendConfig}/users/addPricingDetails`, {
                            email: localStorage.getItem('email'),
                            robotName: this.state.selectedRobot,
                            simulationName: sim
                        })
                        .then((response) => {
                            alert("Price added successfully.");
                        })
                        .catch(err => {
                            console.log(err.response);
                        });
                })
                .catch(err => {
                    console.log(err.response);
                });
        };

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
                    <br />
                    <br />
                    <br />
                    <div className={classes.fieldset}>
                        <fieldset>
                            <legend>Robots</legend>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell align="left">ARN</TableCell>
                                            <TableCell align="left">Version</TableCell>
                                            <TableCell align="left">Software Name</TableCell>
                                            <TableCell align="left">Software Version</TableCell>
                                            <TableCell align="left">Account Id</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.robotList.map((row) => (
                                            <TableRow key={row.name}>
                                                <TableCell component="th" scope="row">
                                                    {row.name.replace('deliverychallenge', 'cmpe281')}
                                                </TableCell>
                                                <TableCell align="left">{row.arn.replace('deliverychallenge', 'cmpe281')}</TableCell>
                                                <TableCell align="left">{row.version}</TableCell>
                                                <TableCell align="left">{row.robotSoftwareSuite.name}</TableCell>
                                                <TableCell align="left">{row.robotSoftwareSuite.version}</TableCell>
                                                <TableCell align="left">{this.state.accountId}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </fieldset>
                    </div>
                </div>
                <div>
                    <fieldset>
                        <legend>Simulation</legend>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Robots</TableCell>
                                        <TableCell align="left">Start</TableCell>
                                        <TableCell align="left">Stop</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <FormControl variant="outlined" className={classes.formControl}>
                                                <InputLabel id="demo-simple-select-outlined-label">Robots</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="ddlRobots"
                                                    label="Robots"
                                                    onChange={handleChange}
                                                >
                                                    {this.state.robotList.map((row) => (
                                                        <MenuItem value={row.name.replace('deliverychallenge', 'cmpe281')}>{row.name.replace('deliverychallenge', 'cmpe281')}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            <Button disabled={this.state.disableStartButton} variant="contained" size="large" color="primary" className={classes.button} onClick={handleStartSimulation}>Start Simulation</Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button disabled={this.state.disableStopButton} variant="contained" size="large" color="primary" className={classes.button} onClick={handleStopSimulation}>Stop Simulation</Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </fieldset>
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(Robot);