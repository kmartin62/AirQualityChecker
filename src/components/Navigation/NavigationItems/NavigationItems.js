import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';


const NavigationItems = () => {
    // var isActive = this.props.location.pathname === this.props.link;
    // var activeClass = isActive ? 'active' : '';
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">HOME</NavigationItem>
            <NavigationItem link="/stats">STATS</NavigationItem>
            <NavigationItem link="/process">PROCESS</NavigationItem>
        </ul>
    )
}


export default NavigationItems
