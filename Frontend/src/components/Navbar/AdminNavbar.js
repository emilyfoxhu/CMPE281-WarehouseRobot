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
class AdminNavbar extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        const { classes } = this.props;
        
        const handleHomeButtonEvent = (event) => {
            event.preventDefault();//stop refresh
            window.location.href = "/admin-dashboard"
        };

        //handle logout to destroy the cookie
        const handleLogOut = (event) => {
            event.preventDefault();//stop refresh
            window.localStorage.clear();
            this.props.userLogout();
            window.location.href = "/"
        };
   
        return(
            <div>
                <div className={classes.root}>
                    <AppBar position="static" style={{ background: '#9de0fa' }}>
                        <Toolbar>
                            <IconButton edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu"
                                onClick={handleHomeButtonEvent}
                            >
                            <Avatar alt="Splitwise" src={icon}/>
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Warehouse Robot
                            </Typography>
                            <Button variant="contained" size="large" color="primary" className={classes.button1} onClick={handleLogOut}>Log out</Button>
                        </Toolbar>
                    </AppBar>
                </div>
            </div>
        )
    }
}
            
AdminNavbar.propTypes = {
    userLogout: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.logout.user
});

export default connect(mapStateToProps, { userLogout })(withStyles(useStyles)(AdminNavbar));