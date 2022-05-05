import React, { useCallback, useEffect, useRef } from 'react';
import { confirmDialog } from 'primereact/confirmdialog';
import { useFormik } from 'formik';

import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';

import { StudentAcFormDetailItemsApp } from '../StudentAcFormDetailItemsApp';

import { getIconRole } from '../../../../../helpers/topic/table/topicTable';
import { getMultipleFormError } from '../../../../../helpers/topic/student/ac/acCoordinator';


export const StudentAcOrganizerAssingDetailApp = React.memo(({
  student
}) => {

  const isMounted = useRef(true);
  const initialState = [{
    item: ''
  }];

  const infoMsg = useRef(null);
  const formik = useFormik({
    initialValues: {
      studentRoles: initialState
    },
    validate: (data) => {
      let errors = {};

      return getMultipleFormError(errors, data.studentRoles, 'studentRoles');
    },
    onSubmit: (data) => {
      handleConfirmSaveOrganizerActivities( data );
    }
  });

  const { values, errors, setFieldValue, handleSubmit } = formik;

  const handleSubmitOrganizerStudentActivities = ( data ) => {
    console.log(data);
  }

  const handleConfirmSaveOrganizerActivities = ( data ) => {
    const oneRole = 'la siguiente actividad';
    const manyRoles = 'las siguientes actividades'
    confirmDialog({
      message: `¿Está seguro de guardar ${
        data.studentRoles.length === 1 ? oneRole : manyRoles 
      }?`,
      header: 'Confirmación de guardado',
      icon: 'fas fa-exclamation-triangle icon-warn',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSubmitOrganizerStudentActivities( data ),
    });
  };

  const handleSetFieldValue = useCallback(
    ( field, value ) => {
      setFieldValue( field, value );
    }, [setFieldValue],
  );

  useEffect(() => {
    if ( infoMsg.current?.state.messages?.length === 0 ) {
      infoMsg.current.show({
        severity: 'info',
        detail: 'Hasta un máximo de 3 actividades.',
        sticky: true
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <Messages
          ref={infoMsg}
          className='align-justify'
        />
      </div>
      <div className='col-12'>
        <h5 className='text-center'>
          <i className={`${getIconRole(student.role_type)} icon-primary`} />
          {student.owner.name}
        </h5>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-6'>
            <Button 
              label={ 
                values.studentRoles.length === 1 
                ? "Guardar Actividad" : "Guardar Actividades" 
              }
              icon='fas fa-envelope-open-text'
              type='submit'
              className="p-button-raised p-button-success" 
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
      {
        isMounted.current && (
          <StudentAcFormDetailItemsApp 
            acContainer={values.studentRoles}
            errors={errors}
            field={'studentRoles'}
            maxItems={3}
            placeholder={'Ingresar actividad*'}
            buttonLabelAdd={'Añadir Actividad'}
            buttonLabelRemove={'Quitar Actividad'}
            setFieldValue={handleSetFieldValue}
          />
        )
      }
    </div>
  )
});
