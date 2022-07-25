import React, { useCallback, useEffect, useRef } from 'react';
import { confirmDialog } from 'primereact/confirmdialog';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { Messages } from 'primereact/messages';
import { Button } from 'primereact/button';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { EmptyContentScreen } from '../../../../ui/EmptyContentScreen';
import { StudentAcFormDetailItemsApp } from '../StudentAcFormDetailItemsApp';
import { StudentAcCoordinatorStrategyViewApp } from './StudentAcCoordinatorStrategyViewApp';

import { getMultipleFormError } from '../../../../../helpers/topic/student/ac/acCoordinator';
import { 
  startLoadCoordinatorStrategiesAcList, 
  startSaveCoordinatorStrategyAc 
} from '../../../../../actions/student/ac_roles/coordinatorAc/coordinatorStategyAc';
import { 
  getCoordinatoStrategyObject 
} from '../../../../../helpers/topic/student/ac_roles/coordinatorAc';


export const StudentAcCoordinatorStrategyFormApp = React.memo(({
  teamDetailAc,
  toast
}) => {
  
  const initialState = [{
    item: ''
  }];

  const dispatch = useDispatch();
  const { 
    coordinatorStrategies, 
    loadingCoordinatorStrategy 
  } = useSelector( state => state.dashboard.coordinatorAc );
  const infoMsg = useRef(null);
  const formik = useFormik({
    initialValues: {
      coordinatorStrategies: initialState
    },
    validate: (data) => {
      let errors = {};

      return getMultipleFormError(
        errors, 
        data.coordinatorStrategies, 
        'coordinatorStrategies'
      );

    },
    onSubmit: (data) => {
      handleConfirmSaveCoordinatorStrategies( data );
    }
  });

  const { values, errors, setFieldValue, handleReset, handleSubmit } = formik;

  const handleSubmitCoordinatorStrategies = ( data ) => {
    const newCoordinatorStrategies = getCoordinatoStrategyObject( 
      data.coordinatorStrategies, 
      teamDetailAc.id
    );
    dispatch( startSaveCoordinatorStrategyAc( newCoordinatorStrategies, toast ) );
    handleReset();
  }
  
  const handleConfirmSaveCoordinatorStrategies = ( data ) => {
    const oneStrategy = 'la siguiente estrategia';
    const manyStrategies = 'las siguientes estrategias'
    confirmDialog({
      message: `¿Está seguro de guardar ${
        data.coordinatorStrategies.length === 1 ? oneStrategy : manyStrategies 
      }?`,
      header: 'Confirmación de guardado',
      icon: 'fas fa-exclamation-triangle icon-warn',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSubmitCoordinatorStrategies( data ),
    });
  };

  const handleLoadCoordinatorStrategiesAc = useCallback(
    ( teamDetailAc ) => {
      dispatch( startLoadCoordinatorStrategiesAcList( teamDetailAc ));
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
        detail: 'Plantear estrategias tiene como propósito tener un camino fijado ' +
        'hacia el desarrollo y solución del problema; el docente valorará las ' +
        'estrategias que tome.', 
        sticky: true 
      });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(teamDetailAc).length > 0) {
      handleLoadCoordinatorStrategiesAc( teamDetailAc.id );
    }
  }, [teamDetailAc, handleLoadCoordinatorStrategiesAc]);

  if (!loadingCoordinatorStrategy) {
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
          Plantear Estrategias
        </h5>
        <Messages
          ref={infoMsg} 
          className='align-justify'
        />
      </div>
      {
        coordinatorStrategies.length > 0 && (
          <Accordion>
            <AccordionTab header="Estrategias Subidas">
              <StudentAcCoordinatorStrategyViewApp 
                coordinatorStrategies={coordinatorStrategies}
                toast={toast}
              />
            </AccordionTab>
          </Accordion>
        )
      }
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-6'>
            <Button 
              label={ 
                values.coordinatorStrategies.length === 1 
                ? "Guardar Estrategia" : "Guardar Estrategias" 
              }
              icon='fas fa-envelope-open-text'
              type='submit'
              className="p-button-raised p-button-success" 
              disabled={coordinatorStrategies.length >= 10}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
      <StudentAcFormDetailItemsApp 
        acContainer={values.coordinatorStrategies}
        errors={errors}
        field={'coordinatorStrategies'}
        maxItems={10 - coordinatorStrategies.length}
        placeholder={'Ingresar estrategia*'}
        buttonLabelAdd={'Añadir Estrategia'}
        buttonLabelRemove={'Quitar Estrategia'}
        buttonLabelSave={'Guardar Estrategias'}
        setFieldValue={handleSetFieldValue}
      />
    </>
  )
});
