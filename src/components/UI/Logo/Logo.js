import React from 'react';
import appLogo from '../../../assets/Images/logo2.png';
import classes from './Logo.css';
import { NavLink} from 'react-router-dom';

const Logo = (props) => {
    return (
        <div className={classes.Logo} style={{height: props.height}}>
            <NavLink to="/">
            <img src={appLogo} to="/" alt="App Logo"/>    
            </NavLink>
        </div>
    )   
}

export default Logo
