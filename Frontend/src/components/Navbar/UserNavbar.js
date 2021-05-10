import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Grid from '@material-ui/core/Grid';
import { Container, Typography, Button } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import icon from '../../image/icon.png';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogout } from '../../redux/actions/logoutAction';
import {withRouter} from 'react-router-dom'

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    },
    button1: {
        margin: theme.spacing(1),
        marginRight: theme.spacing(20),
    },
    menuButton: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(20),
    },
    title: {
        flexGrow: 1,
        fontSize: 25,
    },
});

//create the Navbar Component
class UserNavbar extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            simulation: false
        }

        this.handleHomeButtonEvent = this.handleHomeButtonEvent.bind(this);
        this.handleHelp = this.handleHelp.bind(this);
        this.handleProfile = this.handleProfile.bind(this);
        this.handleSimulations = this.handleSimulations.bind(this);
        this.handleLogs = this.handleLogs.bind(this);
        this.handleNavigation = this.handleNavigation.bind(this);
        this.handleRobot = this.handleRobot.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    handleHomeButtonEvent = (event) => {
        this.props.history.push('/user-dashboard');
    };
    handleHelp = (event) => {
        this.props.history.push('/help');
    };
    handleProfile = (event) => {
        this.props.history.push('/profile');
    };
    handleSimulations = (event) => {
        this.props.history.push('/simulations');
    };

    handleLogs = (event) => {
        event.preventDefault();//stop refresh
        this.props.history.push('/logs');
    };
    handleNavigation = (event) => {
        event.preventDefault();//stop refresh
        this.props.history.push('/navigation');
    };
    handleRobot = (event) => {
        event.preventDefault();//stop refresh
        this.props.history.push('/robot');
    };
    //handle logout to destroy the cookie
    handleLogOut = (event) => {
        event.preventDefault();//stop refresh
        window.localStorage.clear();
        this.props.userLogout();
        window.location.reload(false);
    };

    render() {
        const { classes } = this.props;

        return(
            <div>
                <div className={classes.root}>
                    <AppBar position="static" style={{ background: '#9de0fa' }}>
                        <Toolbar>
                            <IconButton edge="start"
                                className={classes.menuButton}
                                color="inherit" 
                                aria-label="menu"
                                onClick={this.handleHomeButtonEvent}
                            >
                            <Avatar alt="Splitwise" src={icon}/>
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Warehouse Robot
                            </Typography>
                            <Button variant="contained" size="large" color="primary" className={classes.button} onClick={this.handleHomeButtonEvent}>Home</Button>
                            <Button variant="contained" size="large" color="primary" className={classes.button} onClick={this.handleRobot}>Robot</Button>
                            <Button variant="contained" size="large" color="primary" className={classes.button} onClick={this.handleSimulations}>Simulations</Button>
                            <Button variant="contained" size="large" color="primary" className={classes.button} onClick={this.handleNavigation}>Navigation</Button>
                            <Button variant="contained" size="large" color="primary" className={classes.button} onClick={this.handleProfile}>Profile</Button>
                            <Button variant="contained" size="large" color="primary" className={classes.button} onClick={this.handleHelp}>Help</Button>
                            <Button variant="contained" size="large" color="primary" className={classes.button1} onClick={this.handleLogOut}>Log out</Button>
                        </Toolbar>
                    </AppBar>
                </div>
            </div>
        )
    }
}
            
UserNavbar.propTypes = {
    userLogout: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.logout.user,
});

export default withRouter(connect(mapStateToProps, { userLogout })(withStyles(useStyles)(UserNavbar)));