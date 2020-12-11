import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

//TODO

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function createData(id, title, issn, eissn, title2, issn2, eissn2, points, price) {
    return {
        id,
        title,
        issn,
        eissn,
        title2,
        issn2,
        eissn2,
        points,
        price,
        category: [
            { categoryId: 1, name: 'filologia', number: 101 },
            { categoryId: 2, name: 'biologia', number: 102 },
        ],
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.issn}</TableCell>
                <TableCell>{row.eissn}</TableCell>
                <TableCell>{row.title2}</TableCell>
                <TableCell>{row.issn2}</TableCell>
                <TableCell>{row.eissn2}</TableCell>
                <TableCell>{row.points}</TableCell>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Dyscypliny
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Dyscyplina</TableCell>
                                        <TableCell>Numer</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.category.map((categoryRow) => (
                                        <TableRow key={categoryRow.categoryId}>
                                            <TableCell component="th" scope="row">
                                                {categoryRow.categoryId}
                                            </TableCell>
                                            <TableCell>{categoryRow.name}</TableCell>
                                            <TableCell>{categoryRow.number}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        title: PropTypes.string.isRequired,
        eissn: PropTypes.string.isRequired,
        issn: PropTypes.string.isRequired,
        title2: PropTypes.string,
        issn2: PropTypes.string,
        eissn2: PropTypes.string,
        points: PropTypes.number.isRequired,
        category: PropTypes.arrayOf(
            PropTypes.shape({
                number: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                categoryId: PropTypes.number.isRequired,
            }),
        ).isRequired,
        id: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
};

const rows = [
    createData(1, 'Frozen yoghurt', '1592-2341', '5356-3456', 'Ale zimny!', '5342-8324', '5482-3759', 70),
    createData(2, 'Ice cream sandwich', '1592-2341', '5356-3456', 'Ale zimny!', '5342-8324', '5482-3759', 70),
    createData(3, 'Eclair', '1592-2341', '5356-3456', 'Ale zimny!', '5342-8324', '5482-3759', 70),
    createData(4, 'Cupcake', '1592-2341', '5356-3456', 'Ale zimny!', '5342-8324', '5482-3759', 70),
    createData(5, 'Gingerbread', '1592-2341', '5356-3456', 'Ale zimny!', '5342-8324', '5482-3759', 70),
];

export default function CollapsibleTable() {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Tytuł</TableCell>
                        <TableCell>Issn</TableCell>
                        <TableCell>Eissn</TableCell>
                        <TableCell>Tytuł 2</TableCell>
                        <TableCell>Issn 2</TableCell>
                        <TableCell>Eissn 2</TableCell>
                        <TableCell>Punkty</TableCell>
                        <TableCell>Dyscypliny</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
