import React from 'react';
import { useDispatch } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';

import { startDeleteTopics } from '../../../actions/admin/topic';
import { getSingleModelKeys } from '../../../helpers/admin';


export const TeacherTopicDeleteManyApp = React.memo(({
  selectedTopics,
  toast,
  handleClearSelectedTopics
}) => {

  const dispatch = useDispatch();

  const handleTopicsDelete = ( selectedTopics ) => {
    dispatch( startDeleteTopics(
      getSingleModelKeys( selectedTopics ),
      toast
    ));
    handleClearSelectedTopics();
  }

  const handleConfirmDeleteTopics = ( selectedTopics ) => {
    confirmDialog({
      message: (
        <span>¿Está seguro que desea eliminar los siguientes 
            <b> {selectedTopics.length}</b> temas seleccionadas?
        </span>
      ),
      header: 'Panel de Confirmación',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'No eliminar',
      acceptClassName: 'p-button-raised p-button-danger',
      accept: () => handleTopicsDelete( selectedTopics )
    });
  }

  const leftTemplate = (
    <Button
      label="Eliminar Tópicos" 
      icon="fas fa-trash"  
      className="p-button-danger"
      disabled={selectedTopics.length < 2}
      onClick={() => handleConfirmDeleteTopics( selectedTopics )} 
    />
  );

  return (
    <>
      <Toolbar
        className="mb-4" 
        left={leftTemplate}
      ></Toolbar>
    </>
  )
});
