import React from 'react';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

const SortButtons = ({handleSortBy}) => {

    if (column.id !== 'categories') {
        return (
            <>
                <Button onClick={() => {
                    handleSortBy(column.id, "ASC");
                }}>
                    <IconButton aria-label="direction" size="small">
                        <ArrowDropDownIcon fontSize="small"/>
                    </IconButton>
                </Button>
                <Button onClick={() => {
                    handleSortBy(column.id, "DESC");
                }}>
                    <IconButton aria-label="direction" size="small">
                        <ArrowDropUpIcon fontSize="small"/>
                    </IconButton>
                </Button>
            </>
        )
    }
}

export default SortButtons;
