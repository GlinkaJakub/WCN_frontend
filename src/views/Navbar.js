import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    loginName: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar({isAuthenticated, logout, user}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {/*<IconButton href="/" edge="start" className={classes.menuButton} color="inherit" aria-label="menu">*/}
                    {/*    <MenuIcon />*/}
                    {/*</IconButton>*/}
                    <Typography variant="h6" className={classes.title}>
                        Wyszukiwarka Czasopism Naukowych
                    </Typography>
                    { isAuthenticated &&
                        <>
                            <Typography className={classes.loginName}>Zalogowany jako: {user}</Typography>
                            <Button className={classes.menuButton} variant="outlined" color="inherit" href="/changePassword">Zmień hasło</Button>
                        </>
                    }
                    <Button className={classes.menuButton} variant="outlined" color="inherit" href="/">Strona główna</Button>
                    {isAuthenticated &&
                        <>
                            <Button className={classes.menuButton} variant="outlined" color="inherit" href="/groups">Grupy</Button>
                            <Button className={classes.menuButton} variant="outlined" color="inherit" href="/" onClick={() => {
                                    logout();
                                }
                            }>
                                Wyloguj
                            </Button>
                        </>
                    }
                    {!isAuthenticated &&
                    <>
                        <Button className={classes.menuButton} variant="outlined" color="inherit" href="/register">Rejestracja</Button>
                        <Button className={classes.menuButton} variant="outlined" color="inherit" href="/login">Login</Button>
                    </>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}
