import React from 'react';
import { useDispatch } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { Button } from 'primereact/button';

import { 
  startBlockComment, 
  startDeleteComment 
} from '../../../actions/admin/comment';


export const CommentButtonApp = React.memo(({
  comment,
  toast
}) => {

  const dispatch = useDispatch();

  const handleBlockComment = ( comment ) => {
    const newComment = { ...comment, state: false };
    dispatch( startBlockComment( newComment, toast ));
  }

  const handleDeleteComment = ( commentId ) => {
    dispatch( startDeleteComment( commentId, toast ));
  }

  const handleConfirmBlockComment = ( data ) => {
    confirmDialog({
      message: '¿Está seguro que desea bloquear el siguiente Hilo de Comentarios?',
      header: 'Confirmación de Bloqueo',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, bloquear',
      rejectLabel: 'No bloquear',
      acceptClassName: 'p-button-secondary',
      accept: () => handleBlockComment( data ),
    });
  }

  const handleConfirmDeleteComment = ( data ) => {
    confirmDialog({
      message: '¿Está seguro que desea eliminar el siguiente Hilo de Comentarios?',
      header: 'Confirmación de Eliminado',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'No eliminar',
      acceptClassName: 'p-button-danger',
      accept: () => handleDeleteComment( data ),
    });
  }

  return (
    <>
      {
        comment.state === true && (
          <Button 
            icon="fas fa-ban"
            tooltip='Bloquear Comentario'
            tooltipOptions={{position:'bottom'}}
            className="p-button-rounded p-button-secondary mr-2" 
            onClick={() => handleConfirmBlockComment(comment)} 
          />
        )
      }
      <Button 
        icon="fas fa-trash" 
        tooltip='Eliminar Comentario'
        tooltipOptions={{position:'bottom'}}
        className="p-button-rounded p-button-danger" 
        onClick={() => handleConfirmDeleteComment(comment.id)} 
      />
    </>
  )
});
