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
import "./navigation.css";

var NavigationControlInstance;

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

});

class Navigation extends Component {
    constructor(props) {
        super(props);
        NavigationControlInstance = this;
        this.state = {
            MoveAction: "",
            //Odometry
            x: 0, y:0, z:0, h:0,
            //navigation
            x1: 0, y1:0, heading:0
        }
        document.onkeydown = this.checkKeyDown;
        document.onkeyup = this.checkKeyUp;
    }
    //key down
    checkKeyDown = (e) => {
        e = e || window.event;
        if (e.keyCode == '38') {// up arrow
            this.move_forward_down();
        }
        else if (e.keyCode == '40') {// down arrow
            this.move_backward_down();
        }
        else if (e.keyCode == '37') {// left arrow
            this.move_left_down();
        }
        else if (e.keyCode == '39') {// right arrow
            this.move_right_down();
        }
        else if (e.keyCode == '71'){//g or G
            this.go_to_target();
        }
    }
    //key up
    checkKeyUp = (e) => {
        e = e || window.event;
        if (e.keyCode == '38') {// up arrow
            this.move_stop_down();
        }
        else if (e.keyCode == '40') {// down arrow
            this.move_stop_down();
        }
        else if (e.keyCode == '37') {// left arrow
            this.move_stop_down();
        }
        else if (e.keyCode == '39') {// right arrow
            this.move_stop_down();
        }
    }
    //control
    move_forward_down = () => {
        this.setState({MoveAction : "forward"}); console.log("move_forward pressed"); //SyncJobFunction();
    }
    move_forward_up = () => {
        this.setState({MoveAction : ""}); console.log("move_forward released"); 
    }
    move_left_down = () => {
        this.setState({MoveAction : "left"}); console.log("move_left pressed"); //SyncJobFunction();
    }
    move_left_up = () => {
        this.setState({MoveAction : ""}); console.log("move_left released"); 
    }
    move_right_down = () => {
        this.setState({MoveAction : "right"}); console.log("move_right pressed"); //SyncJobFunction();
    }
    move_right_up = () => {
        this.setState({MoveAction : ""}); console.log("move_right released");
    }
    move_backward_down = () => {
        this.setState({MoveAction : "backward"}); console.log("move_backward pressed"); //SyncJobFunction();
    }
    move_backward_up = () => {
        this.setState({MoveAction : ""}); console.log("move_backward released");
    }
    move_stop_down = () => {
        this.setState({MoveAction : "stop"}); console.log("move_stop pressed"); //SyncJobFunction();
    }
    move_stop_up = () => {
        this.setState({MoveAction : ""}); console.log("move_stop released");
    }
    //goal change handlers
    onChangeGoalX = (e) => {
        NavigationControlInstance.setState({x1: e.target.value});
    }
    onChangeGoalY = (e) => {
        NavigationControlInstance.setState({y1: e.target.value});
    }
    onChangeGoalHeading = (e) => {
        NavigationControlInstance.setState({heading: e.target.value});
    }
    go_to_target = (e) => {
        //GoToTargetFunction(NavigationControlInstance.state.x1, NavigationControlInstance.state.y1, NavigationControlInstance.state.heading);
    }
    //save map
    map_save = () => {
        //SaveMapFunction();
    }

    render() {
        const { classes } = this.props;
        let redirectVar = null;
        console.log(this.state);
        if(!localStorage.getItem('email')){
            redirectVar = <Redirect to= "/"/>
        }
        return(
            <div>
                {redirectVar}
                <UserNavbar/>
                <div>
                    <Typography variant="h1" className={classes.title}>Navigation</Typography>
                    <hr className={classes.hr}/>
                </div>
                <div class="background">
                    <div class="whiteboard">
                        <div className="top">
                            {/* Controller */}
                            <div class="controller">
                                <div class="forward">
                                <button class="button move_button" onMouseDown={this.move_forward_down} onMouseUp={this.move_forward_up} >↑</button>
                                </div>
                                <div class="left">
                                <button class="button move_button"  onMouseDown={this.move_left_down} onMouseUp={this.move_left_up}>←</button> 
                                </div>
                                <div className="stop">
                                <button class="button move_button"  onMouseDown={this.move_stop_down} onMouseUp={this.move_stop_up}>・</button>
                                </div>
                                <div className="right">
                                <button class="button move_button"  onMouseDown={this.move_right_down} onMouseUp={this.move_right_up}>→</button>
                                </div>
                                <div className="backward">
                                <button class="button move_button"  onMouseDown={this.move_backward_down} onMouseUp={this.move_backward_up}>↓</button>
                                </div>
                            </div>
                            {/* Odometry */}
                            <div class="location">
                                <div class="title">Location</div>
                                <div class="name">Odometry</div>
                                <div class="odom_x">x</div>
                                <div class="odom_y">y</div>
                                <div class="odom_z">z</div>
                                <div class="odom_heading">heading</div>
                                <div class="odom_value_x">{this.state.x}</div>
                                <div class="odom_value_y">{this.state.y}</div>
                                <div class="odom_value_z">{this.state.z}</div>
                                <div class="odom_value_heading">{this.state.h}</div>
                            </div>
                        </div>
                        <div class="bottom">
                            {/* Navigation */}
                            <div class="goal">
                                <div class="title_goal">Goal</div>
                                <div class="goal_x">x</div>
                                <div class="goal_y">y</div>
                                <div class="goal_heading">heading</div>
                                <div class="goal_value_x"><input class="input_field" type="text" onChange={this.onChangeGoalX} value={this.state.x1} /></div>
                                <div class="goal_value_y"><input class="input_field" type="text" onChange={this.onChangeGoalY} value={this.state.y1} /></div>
                                <div class="goal_value_heading"><input class="input_field" type="text" onChange={this.onChangeGoalHeading} value={this.state.heading} /></div>
                                <div class="goal_button"><button class="button action_button" onClick={this.go_to_target}>[G]o To</button></div>
                            </div>
                            {/* SaveMap */}
                            <div class="save">
                                <div class="save_button">
                                <button class="button action_button" onClick={this.map_save}>Save Map</button> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(Navigation);
