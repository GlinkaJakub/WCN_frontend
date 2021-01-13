import React from 'react';
import Button from '@material-ui/core/Button';
// import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core";
// import Container from "@material-ui/core/Container";
import {Formik} from "formik";

// import { getSearchingJournals } from "../../request";

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
            marginLeft: theme.spacing(2),
            marginTop: theme.spacing(1),
        },
    search: {
        marginLeft: theme.spacing(2),
    }
}));

const SearchInput = ({page, sortColumn, direction, setFetchedData, setSearchWord, setIsCategory, isCategory}) => {
    const classes = useStyles();

    return (
        <Formik
            initialValues={{search: ''}}
            onSubmit={((values, {setSubmitting}) => {
                setTimeout(() => {
                    setIsCategory(0);
                    setSearchWord(values.search);
                    // getSearchingJournals({page, sortColumn, direction, setFetchedData}, values.search);
                    setSubmitting(false);
                })
            })}
            >
            {formik => (
            <form onSubmit={formik.handleSubmit}>
                {/*<label htmlFor="search"></label>*/}
                <TextField
                    className={classes.search}
                    id="search"
                    name="search"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.search}
                    label="Wpisz frazę..."
                />
                <Button
                    className={classes.submit}
                    variant="outlined"
                    type="submit"
                    color="primary"
                >
                    Szukaj
                </Button>
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
