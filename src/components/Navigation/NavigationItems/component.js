import React from 'react'
import NavigationItem from './NavigationItem/component'
import classes from './style.module.css'

const NavigationItems = () => (
        <ul className={classes.NavigationItems}>
            <NavigationItem active link={'/'}>Burger Builder</NavigationItem>
            <NavigationItem link={'/'}>Checkout</NavigationItem>
        </ul>
)

export default NavigationItems
