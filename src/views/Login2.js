import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import Button from '@material-ui/core/Button';
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from '@material-ui/core/Link';
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import FormHelperText from "@material-ui/core/FormHelperText";
import {Formik} from "formik";

import { LoginRequest } from "../request";
import {Redirect} from "react-router-dom";

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

export default function Login() {
    const classes = useStyles();

    if (localStorage.getItem('jwt').length > 7) {
        return <Redirect to='/groups' />
    }

    return (
        <Container consponent="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant='h5'>
                    Logowanie
                </Typography>
                <Formik
                initialValues={{email: '', password: ''}}
                validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }}
                onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    // alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    LoginRequest(values);
                }, 400);
            }}
                >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            autoComplete="email"
                            autoFocus
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        <FormHelperText id="email">
                            {errors.email && touched.email && errors.email}
                        </FormHelperText>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Hasło"
                            autoComplete="current-password"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {errors.password && touched.password && errors.password}
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Zaloguj
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Nie masz konta? Zarejestruj się!"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </div>
</Container>
);
}
