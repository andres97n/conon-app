import React from 'react';
import { Button } from 'primereact/button';

export const DeleteDialogFooterTemplate = React.memo(({
    hideDeleteDialog,
    handleDelete
}) => {
    console.log('HOLA DESDE DELETE DIALOG FOOTER TEMPLATE');
    return (
        <>
            <Button 
                label="No" 
                icon="fas fa-times-circle" 
                className="p-button-text p-button-success" 
                onClick={hideDeleteDialog} 
            />
            <Button 
                label="Yes" 
                icon="fas fa-check-circle" 
                className="p-button-text p-button-danger" 
                onClick={handleDelete} 
            />
        </>
    )
})
