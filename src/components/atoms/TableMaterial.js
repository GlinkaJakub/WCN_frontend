import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import TablePagination from "@material-ui/core/TablePagination";
import { getAllJournalsByCategory, getSearchingJournals } from "../../request";
import Button from "@material-ui/core/Button";
import AddJournalToGroup from "../../groups/AddJournalToGroup";
import SearchInput from "./SerachInput";
import ChooseCategory from "./ChooseCategory";

const columns = [
    {id: 'id', label: 'ID', minWidth: '5%', align: 'left'},
    {id: 'title1', label: 'Tytuł', minWidth: '37%', align: 'left'},
    {id: 'issn1', label: 'ISSN', minWidth: '6%', align: 'left'},
    {id: 'eissn1', label: 'EISSN', minWidth: '6%', align: 'left'},
    {id: 'points', label: 'Punkty', minWidth: '7%', align: 'left'},
    {id: 'categories', label: 'Dyscypliny', minWidth: '37%', align: 'left'},
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
        minWidth: "20px",
        maxWidth: "20px",
        padding: 0,
        margin: 0,
    }
});

const TableMaterial = ({isAuthenticated}) => {

    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [direction, setDirection] = React.useState('ASC');
    const [sortColumn, setSortColumn] = React.useState('id');
    const [fetchData, setFetchedData] = React.useState({});
    const [searchWord, setSearchWord] = React.useState('');
    const [categoryId, setCategoryId] = React.useState(1);
    const [isCategory, setIsCategory] = React.useState(0);

    React.useEffect(() => {
            if (isCategory === 1 ){
                getAllJournalsByCategory({page, sortColumn, direction, setFetchedData}, categoryId, setSearchWord);
                console.log("by category");
            } else if (isCategory === 0 ) {
                getSearchingJournals({page, sortColumn, direction, setFetchedData}, searchWord);
                console.log("by word");
            }
            // console.log("isCategory ", isCategory);
            // console.log("page (" + page + ") \n sort (" + sortColumn + ") \n direction (" + direction + ") \n word (\'" + searchWord + "\') \n categoryId (" + categoryId + ")")
        // getAllJournals({page, sortColumn, direction, setFetchedData});
    }, [page, direction, sortColumn, searchWord, categoryId]);

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleSortBy(column, directionParam) {
        setSortColumn(column);
        setDirection(directionParam);
        // getSearchingJournals({page, sortColumn, direction, setFetchedData}, searchWord);
        // getAllJournals({page, sortColumn, direction, setFetchedData});
    }

    return (
        <Paper className={classes.root}>
            {/*<h1 align="center">Wykaz czasopism naukowych MNiSW 2019</h1>*/}
            <SearchInput
                page={page}
                sortColumn={sortColumn}
                direction={direction}
                setFetchedData={setFetchedData}
                setSearchWord={setSearchWord}
                setIsCategory={setIsCategory}
                isCategory={isCategory}
            />
            <ChooseCategory
                page={page}
                sortColumn={sortColumn}
                direction={direction}
                setFetchedData={setFetchedData}
                setSearchWord={setSearchWord}
                setCategoryId={setCategoryId}
                setIsCategory={setIsCategory}
                categoryId={categoryId}
                />
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
                                    <span>
                                    {column.label}
                                    {column.id !== 'categories' &&
                                        <>
                                        <Button size="small"
                                                className={classes.button} onClick={() => {
                                            handleSortBy(column.id, "ASC");
                                        }}>
                                            {/*<IconButton aria-label="direction" size="small">*/}
                                            <ArrowDropDownIcon fontSize="small"/>
                                            {/*</IconButton>*/}
                                        </Button>
                                        <Button size="small"
                                                className={classes.button} onClick={() => {
                                            handleSortBy(column.id, "DESC");
                                        }}>
                                        {/*<IconButton aria-label="direction" size="small" >*/}
                                            <ArrowDropUpIcon fontSize="small"/>

                                            {/*</IconButton>*/}
                                        </Button>
                                        </>
                                    }
                                    </span>
                                </TableCell>
                            ))}
                            {isAuthenticated &&
                            <TableCell key="addJournal" align="right">
                                Dodaj
                            </TableCell>
                            }
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
                                            if (column.id === 'title1' && row['title2'] !== ''){
                                               // value = row['title1'] + " \n\n\n (" + row['title2'] + ")";
                                                value = <><div>{row['title1']}</div> <div>({row['title2']})</div></>;
                                            } else if (column.id === 'title1' && row['title2'] === ''){
                                                value = row['title1'];
                                            } else  if (column.id === 'issn1' && row['issn2'] !== ''){
                                                // value = row['issn1'] + " \n (" + row['issn2'] + ")";
                                                value = <><div>{row['issn1']}</div> <div>({row['issn2']})</div></>;
                                            } else if (column.id === 'issn1' && row['issn2'] === ''){
                                                value = row['issn1'];
                                            } else  if (column.id === 'eissn1' && row['eissn2'] !== ''){
                                                // value = row['eissn1'] + " \n (" + row['eissn2'] + ")";
                                                value = <><div>{row['eissn1']}</div> <div>({row['eissn2']})</div></>;
                                            } else if (column.id === 'eissn1' && row['eissn2'] === ''){
                                                value = row['eissn1'];
                                            } else {
                                                value = row[column.id];
                                                // console.log(column.id);
                                            }
                                        }
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                    {isAuthenticated &&
                                    <TableCell key="addJournal" align="right">
                                        <AddJournalToGroup journalId={row.id}/>
                                    </TableCell>
                                    }
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
