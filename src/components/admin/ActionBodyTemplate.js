import React from 'react';
import { Button } from 'primereact/button';

export const ActionBodyTemplate = React.memo(({ 
    openUpdate,
    confirmDelete,
    rowData
}) => {
    console.log('HOLA DESDE ACTION BODY TEMPLATE');
    return (
        <div className="actions">
            <Button 
                icon="far fa-edit" className="p-button-rounded p-button-primary mr-2" onClick={() => openUpdate(rowData)} 
            />
            <Button 
                icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDelete(rowData)} 
            />
        </div>
    )
})
