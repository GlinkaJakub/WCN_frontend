import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {getGroupsByUser, deleteJournalFromGroup, deleteMyselfFromGroup} from "../request";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TableBody from "@material-ui/core/TableBody";
import Box from "@material-ui/core/Box";
import AddUserToGroup from "../groups/AddUserToGroup";
import DeleteUserFromGroup from "../groups/DeleteUserFromGroup";
import DeleteGroup from "../groups/DeleteGroup";

const columns = [
    {id: 'id', label: 'ID', minWidth: '5%', align: 'left'},
    {id: 'title1', label: 'Tytuł', minWidth: '37%', align: 'left'},
    {id: 'issn1', label: 'ISSN', minWidth: '6%', align: 'left'},
    {id: 'eissn1', label: 'EISSN', minWidth: '6%', align: 'left'},
    {id: 'points', label: 'Punkty', minWidth: '7%', align: 'left'},
    {id: 'categories', label: 'Dyscypliny', minWidth: '37%', align: 'left'},
];

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        minHeight: 100,
        marginBottom: theme.spacing(2),
    },
    button: {
        width: "20px",
    },
    menuButton: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}));


const Groups = ({isAuthenticated, accessToken, user}) => {

    const classes = useStyles();
    const [isChanged, setChanged] = useState(false);

    const [fetchData, setFetchData] = React.useState({});

    React.useEffect(() => {
        getGroupsByUser(setFetchData);
    }, [isChanged]);

    function handleDeleteJournal(groupId, journalId) {
        deleteJournalFromGroup(groupId, journalId, setChanged);
        console.log("Delete with id: {} from {}", journalId, groupId);
        setChanged(false);
    }

    function handleDeleteMyselfFromGroup(groupId) {
        deleteMyselfFromGroup(groupId, setChanged);
        console.log("Delete with id: {} from {}", user, groupId);
        setChanged(false);
    }

    return (
        <Paper className={classes.root}>
            <Button
                className={classes.menuButton}
                variant="outlined"
                color="inherit"
                href="/addGroup"
            >
                Dodaj nową grupę
            </Button>
            {fetchData.length > 0 && fetchData.map((table) => {
                return (
                    <Box key={table.id}>
                        <Box component="span" >
                            <h1 align="center">{table.name}</h1>
                            {table.ownerDto.email === user &&
                                <ButtonGroup>
                                    <AddUserToGroup
                                        groupId={table.id}
                                        setChanged={setChanged}
                                    />
                                    <DeleteUserFromGroup
                                        users={table.userDtos}
                                        groupId={table.id}
                                        setChanged={setChanged}
                                    />
                                    <DeleteGroup
                                        groupId={table.id}
                                        setChanged={setChanged} />
                                </ButtonGroup>
                            }
                            {table.ownerDto.email !== user &&
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleDeleteMyselfFromGroup(table.id)}
                                >
                                    Odejdź z grupy
                                </Button>
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
                                                        style={{ width: column.minWidth }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                        ))}
                                        { table.ownerDto.email === user &&

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
                                                        if (column.id === 'title1' && row['title2'] !== ''){
                                                            value = row['title1'] + " \n\n\n (" + row['title2'] + ")";
                                                        } else if (column.id === 'title1' && row['title2'] === ''){
                                                            value = row['title1'];
                                                        } else  if (column.id === 'issn1' && row['issn2'] !== ''){
                                                            value = row['issn1'] + " \n (" + row['issn2'] + ")";
                                                        } else if (column.id === 'issn1' && row['issn2'] === ''){
                                                            value = row['issn1'];
                                                        } else  if (column.id === 'eissn1' && row['eissn2'] !== ''){
                                                            value = row['eissn1'] + " \n (" + row['eissn2'] + ")";
                                                        } else if (column.id === 'eissn1' && row['eissn2'] === ''){
                                                            value = row['eissn1'];
                                                        } else {
                                                            value = row[column.id];
                                                        }
                                                    }
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {value}
                                                        </TableCell>
                                                    );
                                                    })}
                                                    { table.ownerDto.email === user &&
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
