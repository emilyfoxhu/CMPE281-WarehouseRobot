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
import Link from '@material-ui/core/Link';
import simulationCloudConfig from "../../simulationCloudConfig";
import {withRouter} from 'react-router-dom'

const useStyles = makeStyles({
    table: {
        width: '82%',
    },
});

class Simulations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            simulationList: [],
            accountId: 0
        }

    }

    componentDidMount() {
        axios.get(`${simulationCloudConfig}/aws_robomaker/get_simulation/${localStorage.getItem("email")}`)
            .then((response) => {
                this.setState({simulationList : response.data.message.simulations});
                this.setState({ accountId: response.data.message.account_id });
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    viewLogs = (event) => {
        event.preventDefault();//stop refresh
        let sim = event.target.parentNode.parentNode.childNodes[1].innerText;
        this.props.history.push('/logs/' + sim);
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
                    <br />
                    <br />
                    <br />
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="left">Simulation</TableCell>
                                    <TableCell align="left">ARN</TableCell>
                                    <TableCell align="left">Username</TableCell>
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="left">Account Id</TableCell>
                                    <TableCell align="left">Details</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.simulationList.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.robotApplicationNames.toString().replace("deliverychallenge_robot", "cmpe281_robot")}
                                        </TableCell>
                                        <TableCell align="left">{row.arn.split('/')[1]}</TableCell>
                                        <TableCell align="left">{row.arn}</TableCell>
                                        <TableCell align="left">{localStorage.getItem("email")}</TableCell>
                                        <TableCell align="left">{row.status}</TableCell>
                                        <TableCell align="left">{this.state.accountId}</TableCell>
                                        <TableCell align="left"><Link href="#" onClick={(event)=>{
                                            this.viewLogs(event);
                                        }}> Details </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        );
    }
}

export default withRouter(withStyles(useStyles)(Simulations));