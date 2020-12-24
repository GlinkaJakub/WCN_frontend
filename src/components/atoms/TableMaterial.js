import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import TablePagination from "@material-ui/core/TablePagination";
import {getAllJournals} from "../../request";
import Button from "@material-ui/core/Button";

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
        minHeight: 440,
    },
    button: {
        width: "20px",
    }
});

const TableMaterial = ({headerTitle}) => {

    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [direction, setDirection] = React.useState('ASC');
    const [sortColumn, setSortColumn] = React.useState('id');
    const [fetchData, setFetchedData] = React.useState({});

    React.useEffect(() => {
        getAllJournals({page, sortColumn, direction, setFetchedData});
    }, [page]);

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleSortBy(column, directionParam) {
        setSortColumn(column);
        setDirection(directionParam);
        getAllJournals({page, sortColumn, direction, setFetchedData});
    }

    return (
        <Paper className={classes.root}>
            <h1 align="center">{headerTitle}</h1>
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
                                    <span>
                                        <Button className={classes.button} onClick={() => {
                                            handleSortBy(column.id, "ASC");
                                        }}>
                                            <IconButton aria-label="direction" size="small">
                                                <ArrowDropDownIcon fontSize="small" />
                                            </IconButton>
                                        </Button>
                                        <Button className={classes.button} onClick={() => {
                                            handleSortBy(column.id, "DESC");
                                        }}>
                                            <IconButton aria-label="direction" size="small" >
                                                <ArrowDropUpIcon fontSize="small" />
                                            </IconButton>
                                        </Button>
                                    </span>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fetchData.length > 0 && fetchData.map((row) => {
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
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={-1}
                onChangePage={handleChangePage}
                page={page}
                rowsPerPage={25}
                labelRowsPerPage="Czasopisma na stronę: "
                rowsPerPageOptions={[25]}
            />
        </Paper>
    );
};

export default TableMaterial;
