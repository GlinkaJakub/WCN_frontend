import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import EnhancedTable from "../atoms/EnhancedTable";
import Data from './../../Data';

const DataTable = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Id',
                accessor: 'id',
            },
            {
                Header: 'Tytuł',
                accessor: 'title',
            },
            {
                Header: 'Issn',
                accessor: 'issn',
            },
            {
                Header: 'Eissn',
                accessor: 'eissn',
            },
            {
                Header: 'Tytuł2',
                accessor: 'title2',
            },
            {
                Header: 'Issn2',
                accessor: 'issn2',
            },
            {
                Header: 'Eissn2',
                accessor: 'eissn2',
            },
            {
                Header: 'Punkty',
                accessor: 'punkty',
            },
            {
                Header: 'Dyscypliny',
                accessor: 'categories',
            },
        ],
        []
    )

    const [data, setData] = React.useState(React.useMemo(() => Data(), []))
    const [skipPageReset, setSkipPageReset] = React.useState(false)

    const updateMyData = (rowIndex, columnId, value) => {
        setSkipPageReset(true)
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    }
                }
                return row
            })
        )
    }

    return (
        <div>
            <CssBaseline />
            <EnhancedTable
                skipPageReset={skipPageReset}
                setData={setData}
                updateMyData={updateMyData}
                columns={columns}
                data={data}
                />
        </div>
    )
}

export default DataTable
