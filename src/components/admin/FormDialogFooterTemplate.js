import React from 'react';
import { Button } from 'primereact/button';

export const FormDialogFooterTemplate = React.memo(({
    hideDialog,
    handleSubmit
}) => {
    console.log('HOLA DESDE FORM DIALOG FOOTER TEMPLATE');
    return (
        <>
            <Button
                label="Cancel" 
                icon="fas fa-times-circle" 
                className="p-button-text p-button-danger" 
                onClick={hideDialog}
            />
            <Button 
                label="Save" 
                icon="fas fa-check-circle" 
                className="p-button-text p-button-success" 
                type='submit'
                onClick={handleSubmit}
            />   
        </>
    )
})
