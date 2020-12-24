import React from 'react';
import {makeStyles} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import Typography from "@material-ui/core/Typography";
import {Formik} from "formik";
import {AddGroupRequest, LoginRequest} from "../request";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
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

const AddGroup = () => {

    const classes = useStyles();

    return(
        <Container consponent="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PlaylistAddIcon/>
                </Avatar>
                <Typography component="h1" variant='h5'>
                    Dodaj nową grupę
                </Typography>
                <Formik
                    initialValues={{id: 0, name: ''}}
                    validate={values => {
                        const errors = {};
                        if (!values.name) {
                            errors.name = 'Required';
                        } else if (
                            !/^[^%]{3,}$/i.test(values.name)
                        ) {
                            errors.name = 'Invalid group name: min 3 characters';
                        }
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        setTimeout(() => {
                            // alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                            AddGroupRequest(values);
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
                                id="name"
                                label="Nazwa Grupy"
                                autoComplete="name"
                                autoFocus
                                type="text"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                            {errors.name && touched.name && errors.name}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Utwórz grupę
                            </Button>
                        </form>
                    )}
                </Formik>
            </div>
        </Container>
    );
}

export default AddGroup;
