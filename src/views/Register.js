import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import Button from '@material-ui/core/Button';
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from '@material-ui/core/Link';
import Grid from "@material-ui/core/Grid";
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import Typography from "@material-ui/core/Typography";
import { makeStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit:
        {
            margin: theme.spacing(3, 0, 2),
        },
}));

export default function Register() {
    const classes = useStyles();

    return (
        <Container consponent="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PersonOutlineOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant='h5'>
                    Rejestracja
                </Typography>
                <form className={classes.form} noValidate={false}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        type="password"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Hasło"
                        name="password"
                        autoComplete="current-password"
                    />
                    <TextField
                        type="password2"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password2"
                        label="Potwierdź hasło"
                        name="password2"
                        autoComplete="current-password"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Imię"
                        name="name"
                        autoComplete="name"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="surname"
                        label="Nazwisko"
                        name="surname"
                        autoComplete="surname"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Zarejestruj
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/login" variant="body2">
                                {"Masz konto? Zaloguj się!"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
