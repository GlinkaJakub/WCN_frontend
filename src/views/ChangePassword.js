import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import Typography from "@material-ui/core/Typography";
import {Formik} from "formik";
import {changePassword} from "../request";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
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
            marginTop: theme.spacing(2),
        },
}));

const ChangePassword = ({isAuthenticated}) => {

    const classes = useStyles();
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState('');

    return(
        <Container consponent="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockTwoToneIcon/>
                </Avatar>
                <Typography component="h1" variant='h5'>
                    Zmień hasło
                </Typography>
                <Formik
                    initialValues={{
                        oldPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                    }}
                    validate={values => {
                        const errors = {};
                        if (!values.oldPassword) {
                            errors.oldPassword = 'Required';
                        }
                        if (!values.newPassword) {
                            errors.newPassword = 'Required';
                        }
                        if (values.newPassword !== values.confirmPassword){
                            errors.confirmPassword = 'Passwords must match'
                        }
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        setTimeout(() => {
                            // alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                            changePassword(values, setErrorMessage);
                             // history.push("/groups");
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
                                id="oldPassword"
                                label="Aktualne hasło"
                                autoComplete="name"
                                autoFocus
                                type="password"
                                name="oldPassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.oldPassword}
                            />
                            {errors.oldPassword && touched.oldPassword && errors.oldPassword}
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="newPassword"
                                label="Nowe hasło"
                                autoComplete="name"
                                type="password"
                                name="newPassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.newPassword}
                            />
                            {errors.newPassword && touched.newPassword && errors.newPassword}
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="confirmPassword"
                                label="Nowe hasło"
                                autoComplete="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}
                            />
                            {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                            <Typography>
                                {errorMessage}
                            </Typography>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Zmień hasło
                            </Button>
                        </form>
                    )}
                </Formik>
            </div>
        </Container>
    );
}

export default ChangePassword;
