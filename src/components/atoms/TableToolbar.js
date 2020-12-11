import React from "react";
import GlobalFilter from "./GlobalFilter";
import { lighten, makeStyles } from "@material-ui/core";
import PropTypes from 'prop-types';
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
    theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 8.85),
        }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
        },
    title: {
        flex: '1 1 100%',
    },
}))

const TableToolbar = props => {
    const classes = useStyles()
    const {
        preGlobalFilteredRows,
        setGlobalFilter,
        globalFilter,
    } = props
    return (
        <Toolbar className={classes.root}>
            <GlobalFilter
                globalFilter={preGlobalFilteredRows}
                setGlobalFilter={globalFilter}
                preGlobalFilteredRows={setGlobalFilter}
                />
        </Toolbar>
    )
}

TableToolbar.propTypes = {
    setGlobalFilter: PropTypes.func.isRequired,
    preGlobalFilteredRows: PropTypes.array.isRequired,
    globalFilter: PropTypes.string.isRequired,
};

export default TableToolbar;
