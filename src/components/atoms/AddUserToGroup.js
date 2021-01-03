import React from "react";
import Button from "@material-ui/core/Button";
import {
    Box,
    FormHelperText,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    makeStyles
} from "@material-ui/core";
import {addUserToGroup} from "../../request";
import {Formik} from "formik";

const AddUserToGroup = ({groupId}) =>  {

    const useStyles = makeStyles((theme) => ({
        submit:
            {
                margin: theme.spacing(3, 0, 2),
            },
    }));

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleAddUserClose = ( email) => {
        console.log("Dodano {} go grupy {}", email, groupId);
        addUserToGroup(email, groupId);
        setOpen(false);
    }

    return (
        <Box>
            <Button color="primary" onClick={() => handleOpen()}>
                Dodaj użytkownika
            </Button>
            <Dialog open={open} onClose={() => handleClose()} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Dodaj użytkownika</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Wpisz email użytkownika
                    </DialogContentText>
                    <Formik
                        initialValues={{email: ''}}
                        validate={values => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Wpisz email';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Błędny adres email';
                            }
                            return errors;
                        }}
                        onSubmit={(values, {setSubmitting}) => {
                            setTimeout(() => {
                                setSubmitting(false);
                                handleAddUserClose( values.email);
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
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Dodaj
                                </Button>
                                <Button onClick={() => handleClose()}>
                                    Anuluj
                                </Button>
                            </form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default AddUserToGroup;
