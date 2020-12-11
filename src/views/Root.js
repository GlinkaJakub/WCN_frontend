import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import ButtonJS from "../components/atoms/ButtonJS";
import Navbar from "../components/molecules/Navbar";
// import Table  from "../components/molecules/Table";
// import Pagination from "../components/atoms/Pagination";
import DataTable from "../components/molecules/DataTable";

const auth = false;

const Root = () => (
    <>
        <Navbar />
        <DataTable />
        {/*<Table />*/}
        {/*<Pagination />*/}
        {/*<ButtonJS>przycisk</ButtonJS>*/}
        {/*<DataTable />*/}
    </>
);

export default Root;
