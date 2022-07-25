import React, { useState } from 'react';
import { confirmDialog } from 'primereact/confirmdialog';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';

import { startSaveReply } from '../../../actions/admin/comment';


export const ReplyNewFormApp = React.memo(({
  userId,
  userName,
  commentId,
  setShowForm,
  toast
}) => {
  
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const handleSubmitReply = ( data ) => {
    const owner = {
      id: userId,
      name: userName
    };
    const newReply = {
      owner: owner.id,
      detail: data,
      wrong_use: false,
      state: true,
    };
    dispatch( startSaveReply( commentId, newReply, owner, toast ));
    setShowForm(false);
  }

  const handleConfirmSubmitReply = ( data ) => {
    confirmDialog({
      message: '¿Está seguro que desea guardar el siguiente Comentario?',
      header: 'Confirmación de Guardado',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      acceptClassName: 'p-button-success',
      accept: () => handleSubmitReply( data ),
    });
  }

  return (
    <>
      <div className="field col-12">
        <span className="p-float-label">
          <InputTextarea
            id='comment'
            name='comment'
            autoComplete="off"
            required rows={5} cols={20} 
            value={comment}
            className={classNames({ 
              'p-invalid': !!comment 
            })}
            onChange={(e) => setComment(e.target.value)}
          />
          <label 
            htmlFor='comment'
            className={classNames({ 
              'p-error': !!comment 
            })}
          >
            Escriba su comentario...
          </label>
        </span>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-4'>
            <Button
              label='Guardar Comentario'
              icon="fas fa-save" 
              disabled={!comment}
              className="p-button-raised p-button-success mr-2" 
              onClick={() => handleConfirmSubmitReply(comment)} 
            />
          </div>
        </div>
      </div>
    </>
  )
});
