import React, { useCallback, useEffect, useRef } from 'react';
import { confirmDialog } from 'primereact/confirmdialog';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { Messages } from 'primereact/messages';
import { Button } from 'primereact/button';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { EmptyContentScreen } from '../../../../ui/EmptyContentScreen';
import { StudentAcFormDetailItemsApp } from '../StudentAcFormDetailItemsApp';
import { StudentAcOrganizerActionViewApp } from './StudentAcOrganizerActionViewApp';

import { getMultipleFormError } from '../../../../../helpers/topic/student/ac/acCoordinator';
import { 
  startLoadOrganizerActionsAcList, startSaveOrganizerActionAc 
} from '../../../../../actions/student/ac_roles/organizerAc/organizerActionAc';
import { 
  getOrganizerActionObject 
} from '../../../../../helpers/topic/student/ac_roles/organizerAc';


export const StudentAcOrganizerActionFormApp = React.memo(({
  teamDetailAc,
  toast
}) => {
  
  const initialState = [{
    item: ''
  }];

  const dispatch = useDispatch();
  const { 
    organizerActions, 
    loadingOrganizerAction 
  } = useSelector( state => state.dashboard.organizerAc );
  const infoMsg = useRef(null);
  const formik = useFormik({
    initialValues: {
      organizerActions: initialState
    },
    validate: (data) => {
      let errors = {};      
      return getMultipleFormError(errors, data.organizerActions, 'organizerActions');
    },
    onSubmit: (data) => {
      handleConfirmSaveOrganizerActions( data );
    }
  });

  const { values, errors, setFieldValue, handleReset, handleSubmit } = formik;

  const handleSubmitOrganizerActions = ( data ) => {
    const newOrganizerActions = getOrganizerActionObject(
      data.organizerActions,
      teamDetailAc.id
    );
    dispatch( startSaveOrganizerActionAc( newOrganizerActions, toast ));
    handleReset();
  }

  const handleConfirmSaveOrganizerActions = ( data ) => {
    const oneAction = 'la siguiente acción';
    const manyActions = 'las siguientes acciones'
    confirmDialog({
      message: `¿Está seguro de guardar ${
        data.organizerActions.length === 1 ? oneAction : manyActions 
      }?`,
      header: 'Confirmación de guardado',
      icon: 'fas fa-exclamation-triangle icon-warn',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSubmitOrganizerActions( data ),
    });
  };

  const handleLoadOrganizerActions = useCallback(
    ( teamDetailId ) => {
      dispatch( startLoadOrganizerActionsAcList( teamDetailId ));
    }, [dispatch],
  );

  const handleSetFieldValue = useCallback(
    ( field, value ) => {
      setFieldValue( field, value );
    }, [setFieldValue],
  );

  useEffect(() => {
    if (infoMsg.current?.state.messages?.length === 0) {
      infoMsg.current.show({ 
        severity: 'info', 
        detail: 'Es importante plantear acciones de trabajo a seguir para que la ' +
        'información luzca mucho más organizada, así la solución sea concreta y comprendida.', 
        sticky: true 
      });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(teamDetailAc).length > 0) {
      handleLoadOrganizerActions( teamDetailAc.id );
    }
  }, [teamDetailAc, handleLoadOrganizerActions]);

  if (loadingOrganizerAction) {
    return (
      <div className='grid p-fluid'>
        <EmptyContentScreen />
      </div>
    )
  }

  return (
    <>
      <div className='col-12'>
        <h5 className='text-center'>
          <i className="fas fa-list-ul mr-2 icon-primary" />
          Plantear Acciones a Realizar
        </h5>
        <Messages
          ref={infoMsg} 
          className='align-justify'
        />
      </div>
      {
        organizerActions.length > 0 && (
          <div className='col-12'>
            <Accordion>
              <AccordionTab header="Acciones Guardadas">
                <StudentAcOrganizerActionViewApp 
                  organizerActions={organizerActions}
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
                values.organizerActions.length === 1 
                ? "Guardar Acción" : "Guardar Acciones" 
              }
              icon='fas fa-envelope-open-text'
              type='submit'
              className="p-button-raised p-button-success"
              disabled={organizerActions.length >= 10}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
      <StudentAcFormDetailItemsApp 
        acContainer={values.organizerActions}
        errors={errors}
        field={'organizerActions'}
        maxItems={10 - organizerActions.length}
        placeholder={'Ingresar acción*'}
        buttonLabelAdd={'Añadir Acción'}
        buttonLabelRemove={'Quitar Acción'}
        setFieldValue={handleSetFieldValue}
      />
    </>
  )
});
