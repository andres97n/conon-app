import { useState } from 'react';


export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues( initialState );
    }

    const handleInputChange = (field, value) => {

        setValues({
            ...values,
            [ field ]: value
        });

    }

    return [ values, handleInputChange, reset ];

}