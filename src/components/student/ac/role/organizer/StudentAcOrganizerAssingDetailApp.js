import React, { useCallback, useEffect, useRef } from 'react';
import { confirmDialog } from 'primereact/confirmdialog';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { EmptyContentScreen } from '../../../../ui/EmptyContentScreen';
import { StudentAcFormDetailItemsApp } from '../StudentAcFormDetailItemsApp';
import { 
  StudentAcOrganizerAssignActivityViewApp 
} from './StudentAcOrganizerAssignActivityViewApp';

import { getIconRole } from '../../../../../helpers/topic/table/topicTable';
import { getMultipleFormError } from '../../../../../helpers/topic/student/ac/acCoordinator';
import { 
  startLoadAssignActivityOrganizerAcByMember, startSaveAssignActivityOrganizerAc 
} from '../../../../../actions/student/ac_roles/organizerAc/assignActivityOrganizerAc';
import { getOrganizerAssignActivityObject } from '../../../../../helpers/topic/student/ac_roles/organizerAc';


export const StudentAcOrganizerAssingDetailApp = React.memo(({
  student,
  teamDetailAc,
  toast
}) => {

  const dispatch = useDispatch();
  const {
    organizerAssignActivities,
    loadingOrganizerAssignActivity
  } = useSelector( state => state.dashboard.organizerAc ); 
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

  const { values, errors, setFieldValue, handleReset, handleSubmit } = formik;

  const handleSubmitOrganizerStudentActivities = ( data ) => {
    const newActivities =  getOrganizerAssignActivityObject(
      data.studentRoles,
      teamDetailAc.id,
      student.id
    );
    dispatch( startSaveAssignActivityOrganizerAc( newActivities, toast ));
    handleReset();
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

  const handleLoadOrganizerAssignActivities = useCallback(
    ( teamDetailId, memberId ) => {
      dispatch( startLoadAssignActivityOrganizerAcByMember( teamDetailId, memberId ));
    }, [dispatch],
  );

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

  useEffect(() => {
    if (
      Object.keys(teamDetailAc).length > 0 &&
      Object.keys(student).length > 0 &&
      isMounted.current  
    ) {
      handleLoadOrganizerAssignActivities( teamDetailAc.id, student.id );
    }
  }, [teamDetailAc, student, handleLoadOrganizerAssignActivities]);

  if (loadingOrganizerAssignActivity) {
    return (
    <div className='grid p-fluid'>
      <EmptyContentScreen />
    </div>
    )
  }

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
      {
        organizerAssignActivities.length > 0 && (
          <div className='col-12'>
            <Accordion>
              <AccordionTab header="Actividades Asignadas">
                <StudentAcOrganizerAssignActivityViewApp 
                  organizerAssignActivities={organizerAssignActivities}
                  toast={toast}
                />
              </AccordionTab>
            </Accordion>
          </div>
        )
      }
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
              disabled={organizerAssignActivities.length >= 3}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
        <StudentAcFormDetailItemsApp 
          acContainer={values.studentRoles}
          errors={errors}
          field={'studentRoles'}
          maxItems={3 - organizerAssignActivities.length}
          placeholder={'Ingresar actividad*'}
          buttonLabelAdd={'Añadir Actividad'}
          buttonLabelRemove={'Quitar Actividad'}
          setFieldValue={handleSetFieldValue}
        />
    </div>
  )
});
