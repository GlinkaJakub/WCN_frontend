import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { getGroupsByUser } from "../request";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import Box from "@material-ui/core/Box";

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

    function handleDeleteJournal(id) {
        console.log("Delete with id: {}", id);
    }

    return (
        <Paper className={classes.root}>
            {fetchData.length > 0 && fetchData.map((table) => {
                console.log("owner: {}", table.ownerDto.email);
                return (
                    <Box>
                        <h1 align="center">{table.name}</h1>
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
                                { table.ownerDto.email === 'jakub@wp.pl' &&

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
                                            { table.ownerDto.email === 'jakub@wp.pl' &&
                                                <TableCell
                                                    className="remove"
                                                    key="remove"
                                                    align="center"
                                                >
                                                    <Button onClick={() => {handleDeleteJournal(row.id)}}>Usuń</Button>
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
