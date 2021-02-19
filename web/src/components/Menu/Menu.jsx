import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from './MenuItem';
import { useLocation } from 'react-router-dom';

import data from '../../menu.json';

const Menu = (props) => {
    const t = props.translation;

    const drawerWidth = props.drawerWidth;
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        listSubHeader: {
            paddingLeft: 0,
            paddingRight: 0,
            backgroundColor: theme.palette.background.paper,
        }
    }));

    const classes = useStyles();
    const location = useLocation();

    let menuItems = [];
    let selectedItems = [];

    const collapsedMenu = function(elements, callback) {
        elements.forEach(element => {
            if (element.name !== undefined) {

                menuItems[element.name] = (element.to !== undefined ? element.to : '#');
                if (element.to !== undefined && element.to === location.pathname) {
                    selectedItems.push({name: element.name, to: element.to});

                    callback({name: element.name, to: element.to});
                    return;
                }
            }

            if (element.items !== undefined) {
                collapsedMenu(element.items, function(value) {
                    if (value) {
                        selectedItems.push({name: element.name, to: value.to !== undefined ? value.to : '#'});

                        callback(value);
                        return;
                    }
                });
            }
        });
    }

    if (Array.isArray(data)) {
        data.forEach(element => {
            if (element.name !== undefined) {
                menuItems[element.name] = (element.to !== undefined ? element.to : '#');

                if (element.items !== undefined) {
                    collapsedMenu(element.items, function(value) {
                        if (value) {
                            selectedItems.push({name: element.name, to: value.to !== undefined ? value.to : '#'});
                        }
                    });
                }
            }
        });
    }

    const menuItemsKeys = Object.keys(menuItems);
    menuItemsKeys.forEach(key => {
        selectedItems.forEach(item => {
            if (key === item.name) {
                menuItems[key] = item.to !== undefined ? item.to : '#';
            }
        });
    });

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={props.open}
            classes={{
                paper: classes.drawerPaper,
            }}>

            <List 
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                <ListSubheader component="div" className={classes.listSubHeader}>
                    {t('appName')}
                    <Divider/>
                </ListSubheader>
                }>
                {data.map((sidebarItem, index) => {
                    const { name, divider } = sidebarItem;

                    return (
                        <React.Fragment key={`${name}${index}`}>
                            {divider !== undefined ? ( <Divider/> ) : ( <MenuItem item={sidebarItem} menuItems={menuItems} selectedItems={selectedItems}/>)}
                        </React.Fragment>
                    );
                })}
            </List>
        </Drawer>
    );
}

export default Menu;