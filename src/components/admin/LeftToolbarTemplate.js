import React from 'react';
import { Button } from 'primereact/button';

export const LeftToolbarTemplate = React.memo(({ 
    openNew, 
    labels,
    selectedTeachers,
    confirmDeleteSelected, 
}) => {
    console.log('HOLA DESDE LEFT TOOL TEMPLATE');
    return (
        <>
            <Button 
                label={labels.new}
                icon="fas fa-plus" 
                className="p-button-primary mr-2" 
                onClick={openNew} 
            />
            <Button 
                label={labels.delete} 
                icon="fas fa-trash-alt" 
                className="p-button-danger" 
                onClick={confirmDeleteSelected} 
                disabled={!selectedTeachers || !selectedTeachers.length}
            />
        </>
    )
})
