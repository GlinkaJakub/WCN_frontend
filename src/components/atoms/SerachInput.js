import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import {Formik, useFormik} from "formik";

import { getSearchingJournals } from "../../request";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit:
        {
            margin: theme.spacing(3, 0, 2),
        },
}));

const SearchInput = ({page, sortColumn, direction, setFetchedData, setSearchWord}) => {
    const classes = useStyles();

    return (
        <Formik
            initialValues={{search: ''}}
            onSubmit={((values, {setSubmitting}) => {
                setTimeout(() => {
                    console.log(values.search);
                    setSearchWord(values.search);
                    // getSearchingJournals({page, sortColumn, direction, setFetchedData}, values.search);
                    setSubmitting(false);
                })
            })}
            >
            {formik => (
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="search">Szukaj</label>
                <input
                    id="search"
                    name="search"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.search}
                />
                <button type="submit">Szukaj</button>
            </form>
            )}
        </Formik>

    );


//     return (
//         <Container consponent="main" maxWidth="xs">
//             <CssBaseline/>
//             <div className={classes.paper}>
//                 <Formik
//                 initialValues={{searchWord: ''}}
//                 onSubmit={(values, {setSubmitting}) => {
//                     setTimeout(() => {
//                         console.log("test");
//                         // alert(JSON.stringify(values, null, 2));
//                         setSubmitting(false);
//                         // getSearchingJournals({page, sortColumn, direction, setFetchedData, values.searchWord});
//                     }, 400);
//             }}
//                 >
//                 {({
//                       values,
//                       errors,
//                       touched,
//                       handleChange,
//                       handleBlur,
//                       handleSubmit,
//                       isSubmitting,
//                       /* and other goodies */
//                   }) => (
//                     <form onSubmit={handleSubmit}>
//                         <TextField
//                             variant="outlined"
//                             margin="normal"
//                             fullWidth
//                             id="search"
//                             label="Szukaj"
//                             autoComplete="search"
//                             type="text"
//                             name="search"
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             value={values.searchWord}
//                         />
//                         <Button
//                             type="submit"
//                             disabled={isSubmitting}
//                             fullWidth
//                             variant="contained"
//                             color="primary"
//                             className={classes.submit}
//                         >
//                             Szukaj
//                         </Button>
//                     </form>
//                 )}
//             </Formik>
//         </div>
// </Container>
// );
}

export default SearchInput;
