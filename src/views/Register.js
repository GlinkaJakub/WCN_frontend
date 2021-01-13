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
import { Formik } from "formik";

import { RegisterRequest} from "../request";
import FormHelperText from "@material-ui/core/FormHelperText";
import {useHistory} from "react-router-dom";

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
    const history = useHistory();

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
                <Formik
                    initialValues={{email: '', password: '', matchingPassword: '', name: '', surname: ''}}
                    validate={values => {
                        const errors = {};
                        if (!values.email){
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
                            setSubmitting(false);
                            RegisterRequest(values);
                            history.push("/login");
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
                    }) => (
                        <form onSubmit={handleSubmit}>
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
                                type="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            <FormHelperText id="email">
                                {errors.email && touched.email && errors.email}
                            </FormHelperText>
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
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            <TextField
                                type="password"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="matchingPassword"
                                label="Potwierdź hasło"
                                name="matchingPassword"
                                autoComplete="current-matching-password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.matchingPassword}
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
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
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
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.surname}
                            />
                            <Button
                                type="submit"
                                disabled={isSubmitting}
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
                    )}
                </Formik>
            </div>
        </Container>
    );
}
