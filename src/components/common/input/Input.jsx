import React from 'react';

const Input = ({ classes, attributes, defaultValue, onChangeFunc }) => {

    return (
        <input className={classes.join(' ')} 
            {...attributes} 
            placeholder={defaultValue}
            onChange={onChangeFunc}
        />
    );
};

export default Input;