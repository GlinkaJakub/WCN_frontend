import React from 'react';

import InputBase from "@material-ui/core/InputBase";
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';

const GlobalFilter = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) => {
    const count = preGlobalFilteredRows.length

    return (
        <div>
            <div>
                <SearchIcon />
            </div>
            <InputBase
                value={globalFilter || ''}
                onChange={e => {
                  setGlobalFilter(e.target.value || undefined)
                }}
                placeholder={`${count} czasopism...`}
                inputProps={{ 'aria-label' : 'search'}}
                />
        </div>
    )
}

GlobalFilter.propTypes = {
    preGlobalFilteredRows: PropTypes.array.isRequired,
    globalFilter: PropTypes.string.isRequired,
    setGlobalFilter: PropTypes.func.isRequired,
}

export default GlobalFilter
