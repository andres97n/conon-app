import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { Button } from 'primereact/button';

import { OwnerUpdateDialogApp } from './OwnerUpdateDialogApp';

import { startDeleteStudent } from '../../../actions/admin/admin';


export const OwnerActionBodyApp = React.memo(({
  admin,
  toast
}) => {
  
  const dispatch = useDispatch();
  const [viewEditAdmin, setViewEditAdmin] = useState(false);

  const handleDeleteAdmin = ( admin ) => {
    dispatch( startDeleteStudent(admin.id, toast) );
  }

  const handleConfirmDeleteAdmin = ( admin ) => {
    confirmDialog({
      message: (
        <p>¿Está seguro que desea eliminar este Administrador?</p>
      ),
      header: 'Panel de Confirmación',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'No eliminar',
      acceptClassName: 'p-button-raised p-button-danger',
      accept: () => handleDeleteAdmin( admin )
    });
  }

  const handleSetViewEditAdmin = useCallback(
    ( value ) => {
      setViewEditAdmin( value );
    }, [],
  );

  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <div className='center-inside'>
          <Button
            icon="fas fa-user-edit"
            tooltip='Editar Administrador'
            tooltipOptions={{position:'bottom'}}
            className="p-button-rounded p-button-warning mr-2"
            onClick={() => setViewEditAdmin(true)}
          />
          {
            !admin.is_superuser && (
              <Button
                icon="fas fa-user-times"
                className="p-button-rounded p-button-danger"
                tooltip='Eliminar Administrador'
                tooltipOptions={{position:'bottom'}}
                onClick={() => handleConfirmDeleteAdmin(admin)}
              />
            )
          }
        </div>
      </div>
      <OwnerUpdateDialogApp
        admin={admin}
        isShow={viewEditAdmin}
        toast={toast}
        handleSetShow={handleSetViewEditAdmin}
      />
    </div>
  )
});
