import React from 'react';
import Button from '@material-ui/core/Button';
// import MenuItem from '@material-ui/core/MenuItem';
import {FormControl, InputLabel, makeStyles, NativeSelect} from "@material-ui/core";
import {getAllCategories} from "../../request";
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
            margin: theme.spacing(3, 0, 2),
        },
    search: {
        marginLeft: theme.spacing(3),
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const ChooseCategory = ({page, sortColumn, direction, setFetchedData, setSearchWord, setCategoryId, setIsCategory, categoryId}) => {
    const classes = useStyles();

    const [categoriesData, setCategoriesData] = React.useState({});
    // const [categoryId, setCategoryId] = React.useState(0);


    React.useEffect(() => {
        getAllCategories(setCategoriesData);
    }, []);

    // const handleChange = (id) => {
    //     setCategoryId(id);
    // };

    return (
        <Formik
            initialValues={{categoryId: 0}}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    setIsCategory(1);
                    setSubmitting(false);
                    setSearchWord('');
                    // handleChange(values.categoryId);
                    setCategoryId(values.categoryId);
                    console.log(categoryId)
                    if (categoryId === ""){
                        setIsCategory(0);
                        console.log("Ups");
                    }
                    // getAllJournalsByCategory({page, sortColumn, direction, setFetchedData}, values.categoryId, setSearchWord);
                }, 400);
            }}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="category-native-simple">Grupa</InputLabel>
                        <NativeSelect
                            value={values.categoryId}
                            onChange={handleChange}
                            inputProps={{
                                name: 'categoryId',
                                id: 'category-native-simple',
                            }}
                        >
                            <option aria-label="None" value=""/>
                            {categoriesData.length > 0 &&categoriesData.map((category) => {
                                return (
                                    <option value={category.id} key={category.id}>
                                        {category.name}
                                    </option>
                                )
                            })}
                        </NativeSelect>
                    </FormControl>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        variant="outlined"
                        color="primary"
                        className={classes.submit}
                    >
                        Szukaj
                    </Button>
                </form>
            )}
        </Formik>

                    );


//
//     <Formik
//         initialValues={{categoryId: 0}}
//         onSubmit={((values, {setSubmitting}) => {
//             setTimeout(() => {
//                 console.log(values.categoryId);
//                 setCategoryId(values.categoryId);
//                 getSearchingJournals({page, sortColumn, direction, setFetchedData}, values.search);
                // setSubmitting(false);
            // })
        // })}
    // >
    //     {formik => (
    //         <form onSubmit={formik.handleSubmit}>
    //             <InputLabel id="categoryLabel">Kategoria</InputLabel>
    //             <Select
    //                 labelId="categoryLabel"
    //                 id="category"
    //                 name="category"
    //                 type="text"
    //                 onChange={formik.handleChange}
    //                 value={formik.values.categoryId}
    //             >
    //                 {/*{categoriesData.map(category => {*/}
    //                 {/*    <MenuItem value={category.id}>{category.name}</MenuItem>*/}
    //                 <MenuItem value={1}>pierwszy</MenuItem>
    //                 <MenuItem value={2}>drugi</MenuItem>
    //                 <MenuItem value={3}>trzeci</MenuItem>
    //                 {/*})}*/}
    //             </Select>
    //             <Button type="submit">Szukaj</Button>
    //         </form>
    //     )}
    // </Formik>

}

export default ChooseCategory;
