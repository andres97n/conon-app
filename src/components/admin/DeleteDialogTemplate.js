import React from 'react';
import { Dialog } from 'primereact/dialog';

export const DeleteDialogTemplate = React.memo(({
    data,
    deleteDialog,
    deleteDialogFooter,
    hideDeleteDialog,
    message,
    selectedData
}) => {
    console.log('HOLA DESDE DELETE DIALOG TEMPLATE');
    return (
        <Dialog 
            modal 
            header="Confirmar" 
            visible={deleteDialog} 
            footer={deleteDialogFooter} 
            style={{ width: '450px' }} 
            onHide={hideDeleteDialog}
        >
            <div className="flex align-items-center justify-content-center"
            >
                <i 
                    className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                />
                    {
                        selectedData
                            ? (data && <span>¿Está seguro que desea eliminar    a los <b>{selectedData && selectedData.length}</b> registros seleccionados?</span>)
                            : (data && <span>{message} <b>{data.person.name}</b>?</span>)
                    }
            </div>
        </Dialog>
    )
})
