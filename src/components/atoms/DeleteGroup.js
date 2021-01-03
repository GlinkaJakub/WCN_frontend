import React from "react";
import Button from "@material-ui/core/Button";
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    makeStyles
} from "@material-ui/core";
import {getSimpleGroupsByUser, deleteGroup} from "../../request";

const DeleteGroup = ({groupId}) => {

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

    const handleDeleteGroupClose = (groupId) => {
        console.log("Usuwanie grupy ", groupId);
        deleteGroup(groupId);
        setOpen(false);
    }

    return (
        <Box>
            <Button color="primary" onClick={() => handleOpen()}>
                Usuń grupę
            </Button>
            <Dialog open={open} onClose={() => handleClose()} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Usunąć grupę?</DialogTitle>
                <DialogContent>
                    <Button onClick={() => handleDeleteGroupClose(groupId)}>
                        Usuń
                    </Button>
                    <Button onClick={() => handleClose()}>Anuluj</Button>
                </DialogContent>
            </Dialog>
        </Box>
    );
}
export default DeleteGroup;
