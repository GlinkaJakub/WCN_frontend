import React from "react";

import MauTable from '@material-ui/core/Table';
import PropTypes from 'prop-types';
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "./TablePaginationActions";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableToolbar from "./TableToolbar";
import Checkbox from "@material-ui/core/Checkbox";
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import {useRowSelect} from "react-table/src/plugin-hooks/useRowSelect";

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return (
            <>
                <Checkbox ref={resolvedRef} {...rest} />
            </>
        )
    }
)

const inputStyle = {
    padding: 0,
    margin: 0,
    border: 0,
    background: 'transparent',
};

const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData,
}) => {
    const [value, setValue] = React.useState(initialValue);
    const onChange = e => {
        setValue(e.target.value)
    }

    const onBlur = () => {
        updateMyData(index, id, value)
    }

    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return (
        <input
            style={inputStyle}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            />
    )
}

EditableCell.propTypes = {
    cell: PropTypes.shape({
        value:PropTypes.any.isRequired,
    }),
    row: PropTypes.shape({
        index: PropTypes.number.isRequired,
    }),
    column: PropTypes.shape({
        id: PropTypes.number.isRequired,
    }),
    updateMyData: PropTypes.func.isRequired,
}

const defaultColumn = {
    Cell: EditableCell,
}

const EnhancedTable = ({
    columns,
    data,
    setData,
    updateMyData,
    skipPageReset,
}) => {
    const {
        getTableProps,
        headerGroups,
        prepareRow,
        page,
        gotoPage,
        setPageSize,
        preGlobalFilteredRows,
        setGlobalFilter,
        state: { pageIndex, pageSize, selectedRowsId, globalFilter },
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            autoResetPage: !skipPageReset,
            updateMyData,
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        hooks => {
            hooks.allColumns.push(columns => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllPageRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                        </div>
            ),
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleAllPageRowsSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ])
        }
    )

    const handleChangePage = (event, newPage) => {
        gotoPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setPageSize(Number(event.target.value))
    }

    return (
        <TableContainer>
            <TableToolbar
                setGlobalFilter={setGlobalFilter}
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                />
                <MauTable {...getTableProps()}>
                    <TableHead>
                        {headerGroups.map(headerGroup => (
                            <TableRow {...headerGroup.getHeaderProps()}>
                                {headerGroup.headers.map(column => (
                                    <TableCell
                                        {...(column.id === 'selection'
                                        ? column.getHeaderProps()
                                        : column.getHeaderProps(column.getSortByToggleProps()))}
                                    >
                                        {column.render('Header')}
                                        {column.id !== 'selection' ? (
                                            <TableSortLabel
                                                active={column.isSorted}
                                                direction={column.isSortedDesc ? 'desc' : 'asc'}
                                                />
                                        ) : null}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {page.map((row, i) => {
                            prepareRow(row)
                                return (
                                    <TableRow {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return (
                                                <TableCell {...cell.getCellProps()}>
                                                    {cell.render('Cell')}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[
                                    10,
                                    20,
                                    50,
                                    100,
                                    { label: 'All', value: data.length },
                                ]}
                                colSpan={3}
                                count={data.length}
                                rowsPerPage={pageSize}
                                page={pageIndex}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page'},
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                                />
                        </TableRow>
                    </TableFooter>
                </MauTable>
        </TableContainer>
    )
}

EnhancedTable.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    updateMyData: PropTypes.func.isRequired,
    setData: PropTypes.func.isRequired,
    skipPageReset: PropTypes.bool.isRequired,
}

export default EnhancedTable
