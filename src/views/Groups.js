import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { getGroupsByUser, deleteJournalFromGroup, addUserToGroup } from "../request";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import Box from "@material-ui/core/Box";
import AddUserToGroup from "../components/atoms/AddUserToGroup";
import DeleteUserFromGroup from "../components/atoms/DeleteUserFromGroup";
import DeleteGroup from "../components/atoms/DeleteGroup";

const columns = [
    {id: 'id', label: 'ID', minWidth: '10', align: 'left'},
    {id: 'title1', label: 'Tytuł', minWidth: '300', align: 'left'},
    {id: 'issn1', label: 'ISSN', minWidth: '150', align: 'left'},
    {id: 'eissn1', label: 'EISSN', minWidth: '150', align: 'left'},
    {id: 'points', label: 'Punkty', minWidth: '100', align: 'left'},
    {id: 'categories', label: 'Dyscypliny', minWidth: '300', align: 'left'},
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        minHeight: 100,
    },
    button: {
        width: "20px",
    }
});


const Groups = () => {

    const classes = useStyles();

    const [fetchData, setFetchData] = React.useState({});

    React.useEffect(() => {
        getGroupsByUser(setFetchData);
    }, []);

    function handleDeleteJournal(groupId, journalId) {
        deleteJournalFromGroup(groupId, journalId);
        console.log("Delete with id: {} from {}", journalId, groupId);
    }

    return (
        <Paper className={classes.root}>
            <Button color="inherit" href="/addGroup">Dodaj nową grupę</Button>
            {fetchData.length > 0 && fetchData.map((table) => {
                console.log("owner: {}", table.ownerDto.email);
                console.log("users: {}", table.userDtos);
                return (
                    <Box key={table.id}>
                        <Box component="span" >
                            <h1 align="center">{table.name}</h1>
                            {table.ownerDto.email === localStorage.getItem('user') &&
                                <>
                                <AddUserToGroup
                                    groupId={table.id}
                                />
                                <DeleteUserFromGroup
                                    users={table.userDtos}
                                    groupId={table.id}
                                />
                                <DeleteGroup groupId={table.id} />
                                </>
                            }
                        </Box>
                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                                    <TableCell
                                                        className={column.id}
                                                        key={column.id}
                                                        align={column.align}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                        ))}
                                        { table.ownerDto.email === localStorage.getItem('user') &&

                                                <TableCell
                                                className="remove"
                                                key="remove"
                                                align="center"
                                                >
                                                    Usuń
                                                </TableCell>

                                    }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {table.journals.map((row) => {
                                        return (
                                            <TableRow hover tabIndex={-1} key={row.id}>
                                                {columns.map((column) => {
                                                    let value;
                                                    let cat = '';
                                                    if (column.id === 'categories') {
                                                        row[column.id].map((item) => {
                                                            cat += item.name
                                                            cat += ', '
                                                        })
                                                        value = cat;
                                                    } else {
                                                        value = row[column.id];
                                                    }
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {value}
                                                        </TableCell>
                                                    );
                                                    })}
                                                    { table.ownerDto.email === localStorage.getItem('user') &&
                                                        <TableCell
                                                            className="remove"
                                                            key="remove"
                                                            align="center"
                                                        >
                                                            <Button onClick={() => {handleDeleteJournal(table.id, row.id)}}>Usuń</Button>
                                                        </TableCell>
                                                    }
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                    </Table>
                        </TableContainer>
                    </Box>

                );
            })}
        </Paper>
    )
}

export default Groups;
