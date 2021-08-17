import React from "react";
import Link from "next/link";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        display: "flex",
        backgroundColor: 'blue',
        color: 'white',
        justifyContent: "space-around",
        alignItems: 'flex-start',
        fontSize: '40px',
        listStyleType: 'none',
        '& li:hover': {
            'color': 'orange',
        }
    }
    
  });
  
const MenuBar = (props) => {
    const classes = useStyles(props);
    return (
        <ul className={classes.root}>
            {props.navItems.map((item, index) => {
                return <li key={index}>
                     <Link href={item.url}>{item.name}</Link>
                </li>
            })}
        </ul>
    )
}

export default MenuBar;