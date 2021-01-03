import React from "react";
import Button from "@material-ui/core/Button";
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle, FormControl, InputLabel,
    makeStyles, NativeSelect
} from "@material-ui/core";
import { deleteUserFromGroup} from "../../request";
import {Formik} from "formik";

const DeleteUserFromGroup = ({users, groupId}) => {

    console.log(users);

    const useStyles = makeStyles((theme) => ({
        submit:
            {
                margin: theme.spacing(3, 0, 2),
            },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
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

    const handleDeleteUserClose = (userId) => {
        console.log("Usuwanie ", userId, " z grupy ", groupId);
        deleteUserFromGroup(groupId, userId);
        setOpen(false);
    }

    return (
        <Box>
            <Button color="primary" onClick={() => handleOpen()}>
                Usuń użytkownika
            </Button>
            <Dialog open={open} onClose={() => handleClose()} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Usuń użytkownika</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{userId: 0}}
                        onSubmit={(values, {setSubmitting}) => {
                            setTimeout(() => {
                                setSubmitting(false);
                                console.log(values)
                                handleDeleteUserClose(values.userId, groupId);
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

                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="email-native-simple">Email</InputLabel>
                                    <NativeSelect
                                        value={values.userId}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'userId',
                                            id: 'email-native-simple',
                                        }}
                                    >
                                        <option aria-label="None" value=""/>
                                        {users.length > 0 && users.map((user) => {
                                            return (
                                                user.email !== localStorage.getItem('user') &&
                                                <option value={user.id} key={user.id}>
                                                    {user.email}
                                                </option>
                                            )
                                        })}
                                    </NativeSelect>
                                </FormControl>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Usuń
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
export default DeleteUserFromGroup;
