import React from 'react';

const SearchInput = ({name, label, ...props}) => (
    <div>
    <input
        placeholder={name}
        type="text"
        name={name}
        id={name}
        {...props}
        />
        <label htmlFor={name}>
            {label}
        </label>
    </div>
);

export default SearchInput;
