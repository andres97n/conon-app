import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';
import classNames from 'classnames';

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

import { isValidHttpUrl } from '../../../../helpers/abp-steps';
import { 
  startSaveGlossary, 
  startSaveGlossaryDetail 
} from '../../../../actions/admin/glossary';


export const ToolGlossaryFormApp = React.memo(({
  uid,
  name,
  glossary,
  classroomId,
  toast,
  setShowForm
}) => {

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      path: '',
      observations: '',
    },
    validate: (data) => {
      let errors = {}

      if (!data.title) {
        errors.title = 'El título es requerido.';
      } else if (data.title.length < 5) {
        errors.title = 'El título tiene que tener por lo menos cinco caracteres.';
      }
      if (!data.description) {
        errors.description = 'La descripción es requerida.';
      }
      if (data.path && !isValidHttpUrl(data.path)) {
        errors.path = 'El enlace ingresado no es válido.';
      }

      return errors;
    },
    onSubmit: (data) => {
      handleConfirmSubmitWord( data );
    }
  });

  const { values, errors, handleChange, handleReset, handleSubmit } = formik;

  const handleSubmitWord = ( data ) => {
    const owner = { id: uid, name };
    const newWord = {
      owner: uid,
      title: data.title,
      description: data.description,
      image: '',
      url: data.path,
      observation: data.observations,
      state: 1
    }
    if (glossary?.id) {
      dispatch( startSaveGlossaryDetail( glossary.id, newWord, owner, toast ) );
    } else {
      const newGlossary = {
        classroom: classroomId,
        observations: 'S/N',
        state: 1,
      }
      dispatch( startSaveGlossary( newGlossary, newWord, owner, toast ) );
    }
    handleReset();
    setShowForm(false);
  }

  const handleConfirmSubmitWord = ( data ) => {
    confirmDialog({
      message: '¿Está seguro que desea guardar el siguiente Término?',
      header: 'Confirmación de Guardado',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSubmitWord( data ),
    });
  }

  return (
    <>
      <div className="field col-12">
        <span className="p-float-label">
          <InputText
            id='title'
            name='title'
            value={values.title}
            autoComplete="off"
            disabled={values.title.length >= 60}
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
          >Título*</label>
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
                Puede escribir hasta un máximo de 60 caracteres, ahora lleva
                <b> {values.title.length}</b>. Si llega a hacerlo deberá cancelar el ingreso.
              </small>
            )
        }
      </div>
      <div className="field col-12">
        <span className="p-float-label">
          <InputTextarea
            id='description'
            name='description'
            autoComplete="off"
            required rows={5} cols={20} 
            value={values.description}
            className={classNames({ 
              'p-invalid': errors['description'] 
            })}
            onChange={handleChange}
          />
          <label 
            htmlFor='description'
            className={classNames({ 
              'p-error': errors['description'] 
            })}
          >
            Descripción*
          </label>
        </span>
        <small className="p-error">{errors['description']}</small>
      </div>
      <div className="field col-12">
        <span className="p-float-label">
          <InputText
            id='path'
            name='path'
            value={values.path}
            autoComplete="off"
            className={classNames({ 
              'p-invalid': errors['path'] 
            })}
            onChange={handleChange}
          />
          <label 
            htmlFor='path'
            className={classNames({ 
              'p-error': errors['path'] 
            })}
          >Enlace de Referencia</label>
        </span>
        <small className="p-error">{errors['path']}</small>
      </div>
      <div className="field col-12">
        <span className="p-float-label">
          <InputTextarea
            id='observations'
            name='observations'
            autoComplete="off"
            required rows={3} cols={20} 
            value={values.observations}
            onChange={handleChange}
          />
          <label htmlFor='observations'>
            Observaciones
          </label>
        </span>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-6'>
            <Button 
              label='Guardar Término'
              icon='fas fa-save'
              iconPos='left'
              type='submit'
              className='p-button-raised p-button-success'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  )
});
