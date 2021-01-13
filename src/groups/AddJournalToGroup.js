import React from "react";
import Button from "@material-ui/core/Button";
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle, FormControl, InputLabel,
    makeStyles, NativeSelect
} from "@material-ui/core";
import { getSimpleGroupsByUser, addJournalToGroup } from "../request";
import {Formik} from "formik";

const AddJournalToGroup = ({journalId}) => {

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
    const [groups, setGroups] = React.useState([]);

    const handleOpen = () => {
        setOpen(true);
        getSimpleGroupsByUser(setGroups);

    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleAddJournalClose = (groupId, journalId) => {
        console.log("Usuwanie ", journalId, " z grupy ", groupId);
        addJournalToGroup(groupId, journalId);
        setOpen(false);
    }

    return (
        <Box>
            <Button color="primary" onClick={() => handleOpen()}>
                +
            </Button>
            <Dialog open={open} onClose={() => handleClose()} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Dodaj czasopismo</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{groupId: 0}}
                        onSubmit={(values, {setSubmitting}) => {
                            setTimeout(() => {
                                setSubmitting(false);
                                console.log(values)
                                handleAddJournalClose(values.groupId, journalId);
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
                                    <InputLabel htmlFor="group-native-simple">Grupa</InputLabel>
                                    <NativeSelect
                                        value={values.groupId}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'groupId',
                                            id: 'group-native-simple',
                                        }}
                                    >
                                        <option aria-label="None" value=""/>
                                        {groups.length > 0 && groups.map((group) => {
                                            return (
                                                <option value={group.id} key={group.id}>
                                                    {group.name}
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
export default AddJournalToGroup;
