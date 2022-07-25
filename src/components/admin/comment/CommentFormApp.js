import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';
import classNames from 'classnames';

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

import { startSaveComment } from '../../../actions/admin/comment';


export const CommentFormApp = React.memo(({
  userId,
  name,
  topicId,
  toast,
  setShowForm
}) => {
  
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: '',
      comment: '',
    },
    validate: (data) => {
      let errors = {}

      if (!data.title) {
        errors.title = 'El título es requerido.';
      } else if (data.title.length < 5) {
        errors.title = 'El título tiene que tener por lo menos cinco caracteres.';
      }
      if (!data.comment) {
        errors.comment = 'El comentario es requerido.';
      }

      return errors;
    },
    onSubmit: (data) => {
      handleConfirmSubmitComment( data );
    }
  });

  const { values, errors, handleChange, handleReset, handleSubmit } = formik;

  const handleSubmitComment = ( data ) => {
    const owner = {
      id: userId,
      name
    };
    const newComment = {
      owner: owner.id,
      topic: topicId,
      title: data.title,
      wrong_use: false,
      state: true
    };
    const newReply = {
      owner: owner.id,
      detail: data.comment,
      wrong_use: false,
      state: true,
    };
    dispatch( startSaveComment( newComment, newReply, owner, toast ));
    handleReset();
    setShowForm(false);
  }

  const handleConfirmSubmitComment = ( data ) => {
    confirmDialog({
      message: '¿Está seguro que desea guardar el siguiente Comentario?',
      header: 'Confirmación de Guardado',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSubmitComment( data ),
    });
  }

  return (
    <>
      <div className="field col-12 mt-2">
        <span className="p-float-label">
          <InputText
            id='title'
            name='title'
            value={values.title}
            autoComplete="off"
            disabled={values.title.length >= 150}
            className={classNames({ 
              'p-invalid': errors['title'] 
            })}
            onChange={handleChange}
          />
          <label 
            htmlFor='title'
            className={classNames({ 
              'p-error': errors['title'] 
            })}
          >Título del Hilo*</label>
        </span>
        {
          errors['title']
            ? (
              <small className="p-error">{errors['title']}</small>
            )
            : (
              <small 
              id="title-help" 
              className="p-d-block"
              >
                Puede escribir hasta un máximo de 150 caracteres, ahora lleva
                <b> {values.title.length}</b>. Si llega a hacerlo deberá cancelar el ingreso.
              </small>
            )
        }
      </div>
      <div className="field col-12">
        <span className="p-float-label">
          <InputTextarea
            id='comment'
            name='comment'
            autoComplete="off"
            required rows={5} cols={20} 
            value={values.comment}
            className={classNames({ 
              'p-invalid': errors['comment'] 
            })}
            onChange={handleChange}
          />
          <label 
            htmlFor='comment'
            className={classNames({ 
              'p-error': errors['comment'] 
            })}
          >
            Comentario*
          </label>
        </span>
        <small className="p-error">{errors['comment']}</small>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-4'>
            <Button 
              label='Crear Hilo'
              icon='fas fa-save'
              type='submit'
              className='p-button-raised'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  )
});
