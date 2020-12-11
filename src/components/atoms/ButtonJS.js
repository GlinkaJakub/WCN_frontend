import React from 'react';
import Button from '@material-ui/core/Button';

const ButtonJS = ({children, auth, ...props}) => {
 return(
    <>
        {
            auth === true ? (
                <p></p>
            ) : <Button variant="contained" color="primary">{children}</Button>
        }
    </>
 )};

export default ButtonJS;
