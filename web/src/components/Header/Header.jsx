import React from 'react';
import clsx from 'clsx';
import { Avatar, Badge, Card, Menu, MenuItem, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Brightness4Outlined from '@material-ui/icons/Brightness4Outlined';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';


const Header = (props) => {
    const drawerWidth = props.drawerWidth;
    const t = props.translation;

    const useStyles = makeStyles((theme) => ({
        grow: {
            flexGrow: 1,
        },
        root: {
            display: 'flex',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
            }),
        },
        headerButton: {
            borderRadius: 0,
            marginRight: 11,
        },
    }));

    const classes = useStyles();

    const handleDrawer = () => {
        props.handleChangeTheme('drawer', !props.open);
    };

    return (
        <React.Fragment>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: props.open,
                })}>

                <Toolbar>
                    <Tooltip title={clsx({
                            [t('hideMenu')]: props.open,
                            [t('showMenu')]: !props.open
                        })} placement="bottom">
                        <IconButton
                            className={classes.headerButton}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawer}
                            edge="start">
                            {
                                props.open ? 
                                <React.Fragment><MenuIcon/><ChevronLeftIcon /></React.Fragment> : 
                                <React.Fragment><MenuIcon/><ChevronRightIcon /></React.Fragment>
                            }
                        </IconButton>
                    </Tooltip>

                    {/* <Typography variant="h6" noWrap>
                        {t('test')}
                    </Typography> */}

                    <div className={classes.grow} id="teste"/>

                    <Tooltip title={t('toggleThemeColor')}>
                        <IconButton aria-label="show 4 new mails" variant="contained" color="inherit" onClick={props.toggleThemeColor} className={classes.headerButton}>
                            <Badge color="secondary">
                                <Brightness4Outlined/>
                            </Badge>
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default Header;