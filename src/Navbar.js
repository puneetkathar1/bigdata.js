import React from 'react'
import { Container, Paper, Box, Typography, AppBar, IconButton, makeStyles, Toolbar, Button, useMediaQuery, useTheme} from '@material-ui/core'
import Menu from '@material-ui/core/Menu'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';





const useStyles = makeStyles({
    header: {
backgroundColor: "#1e212d",
fontFamily: "Libre Baskerville",
letterSpacing: "100px",
padding: "10px 5px 10px 0"
    },
    button: {
        backgroundColor: "#1e212d",
        color: "#f9f3f3",
        textTransform: "initial",
        fontSize: "20px",
        marginleft: "5vh",
        marginRight: "5vh",


        "&:hover": {
           textDecoration: "underline"
        }
    }
})



function Navbar() {
   
   



    const classes = useStyles();

    return (
        
        <div>
            <AppBar position='sticky' className= {classes.header}>
               <Toolbar>
                 <IconButton>
                     <Menu />
                 </IconButton>
                 
                 <Typography variant = 'h4' style={{color: "#f9f3f3", flexGrow: 1, paddingRight: "1120px"}}> Dashboard </Typography> 


               <Button style={{textDecoration:"none"}} > <AccountCircleIcon fontSize='large' style={{color:'#f9f3f3'}} /> </Button> 
                 {/* <Button style={{textDecoration:"none"}} > <AccountCircleIcon fontSize='large' style={{color:'#f9f3f3'}} /> </Button>  */}


               </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
