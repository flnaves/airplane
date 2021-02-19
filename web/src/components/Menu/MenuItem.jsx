
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Collapse } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';

const MenuItem = ({ depthStep = 10, depth = 0, expanded, item, subItems = '', menuItems, selectedItems}) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        primaryNested: {
            paddingLeft: theme.spacing(4),
        },
        seccondNested: {
            paddingLeft: theme.spacing(6),
        },
        thirdNested: {
            paddingLeft: theme.spacing(8),
        },
        iconWidth: {
            minWidth: 40
        },
        listItemText: {
            width: 180
        }
    }));

    const classes = useStyles();
    const location = useLocation();

    let itemClasses = '';
    if (subItems === 'primary') {
        itemClasses = classes.primaryNested;
    } else if (subItems === 'seccond') {
        itemClasses = classes.seccondNested;
    } else if (subItems === 'third') {
        itemClasses = classes.thirdNested;
    }

    let { name, label, items, Icon, to} = item;

    const [itemSelected, setCollapsed] = React.useState({});

    const menuItemsKeys = Object.keys(menuItems);
    menuItemsKeys.forEach(key => {
        if (key === name) {
            if (name === key) {
                to = menuItems[key];
            }
        }
    });

    const CustomLink = React.useMemo(
      () =>
        React.forwardRef((linkProps, ref) => (
          <Link to={to} {...linkProps} />
        )),
      [to],
    );

    const toggleCollapse = function() {
        setCollapsed(name);
    }

    const toggleMenu = function(e) {
        if (Array.isArray(items)) {
            toggleCollapse();
        }
    }

    let expandIcon;
    if (Array.isArray(items) && items.length) {
        expandIcon = location.pathname === to ? <ExpandLess /> : <ExpandMore />;
    }

    return (
        <React.Fragment>
                
            <ListItem
                key={label}
                onClick={toggleMenu}
                button 
                className={itemClasses}
                component={CustomLink}
                selected={location.pathname === to}>
                
                <ListItemIcon className={classes.iconWidth}>
                    {Icon ? <span className="material-icons">{Icon}</span> : <React.Fragment/>}
                </ListItemIcon>
                <ListItemText primary={label} className={classes.listItemText}/>
                {expandIcon}
            </ListItem>

            <Collapse in={(location.pathname === to)} timeout={'auto'} unmountOnExit>
                {Array.isArray(items) ? (
                    <List component="div" disablePadding>
                        {items.map((subItem, index) => (
                            <React.Fragment key={`${subItem.name}${index}`}>
                                {subItem.divider !== undefined ? (
                                    <Divider/>
                                ) : (
                                    <MenuItem
                                        depth={depth + 1}
                                        depthStep={depthStep}
                                        item={subItem}
                                        menuItems={menuItems}
                                        selectedItems={selectedItems}
                                        subItems={
                                            subItems === '' ? 'primary' : 
                                            subItems === 'seccond' ? 'third' : 'seccond'}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </List>
                ) : null}
            </Collapse>
            
        </React.Fragment>
    );
}

export default MenuItem;