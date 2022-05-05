import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import classNames from 'classnames';

import { confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { InputTextarea } from 'primereact/inputtextarea';

import { 
  startSavePerformActionStepFiveAbp 
} from '../../../../../actions/student/abp_steps/performActionStepFiveAbp';

export const StudentPerformActionFormApp = React.memo(({
  performActionListSize,
  teamDetailId,
  toast
}) => {
  
  const dispatch = useDispatch();
  const infoMsg = useRef(null);
  const formik = useFormik({
    initialValues: {
      actions: [{
        action: ''
      }]
    },
    validate: (data) => {
      let errors = {}
      let actions = [];
      let isValid = true;
      
      data.actions.forEach( (data, index) => {
        let errorConcept = {};

        if (!data.action) {
          errorConcept.action = `La estrategia ${performActionListSize + index + 1} es requerida.`;  
        }
        actions = [ ...actions, errorConcept ];
      });

      actions.forEach( error => {
        if (Object.keys(error).length > 0) {
          isValid = false;
        }
      });
      if (!isValid) {
        errors.actions = actions;
      }

      return errors;
    },
    onSubmit: (data) => {
      handleConfirmSavePerformActions( data );
    }
  });

  const { values, errors, setValues, resetForm, handleChange, handleSubmit } = formik;

  const handleSubmitPerformAction = ( data ) => {
    let newActions;
    if (data.actions.length === 1) {
      newActions = {
        team_detail_abp: teamDetailId,
        action: data.actions[0].action,
        active: true
      };
    } else {
      newActions = data.actions.map( data => ({
        team_detail_abp: teamDetailId,
        action: data.action,
        active: true
      }));
    }
    resetForm();
    dispatch( startSavePerformActionStepFiveAbp( newActions, toast ) );
  }

  const handleConfirmSavePerformActions = ( data ) => {
    const oneAction = 'la siguiente estrategia';
    const manyActions = 'las siguientes estrategias';
    confirmDialog({
        message: `Está seguro que desea guardar ${
        values.actions.length === 1 ? oneAction : manyActions 
        }?`,
        header: 'Confirmación de guardado',
        icon: 'fas fa-exclamation-triangle',
        acceptLabel: 'Sí, guardar',
        rejectLabel: 'No guardar',
        accept: () => handleSubmitPerformAction( data ),
    });
  }

  const handleSetNewAction = () => {
    setValues({
      actions: [ 
        ...values.actions, 
        {
          action: '',
        } 
      ]
    });
  }

  const handleRemoveAction = ( position ) => {
    setValues({
      actions: values.actions.filter( (data, index) => index !== position )
    });
  }

  useEffect(() => {
    if ( infoMsg.current?.state.messages?.length === 0 ) {
      infoMsg.current.show({
        severity: 'info',
        detail: 'Plantee las estrategias más viables para resolver el problema, ' +
        'recuerde que puede ingresar un máximo de 10 estrategias.',
        sticky: true
      });
    }
  }, []);
  
  return (
    <div className='col-12'>
      <div className='grid p-fluid'>
        <div className='col-12'>
          <h5 className='text-center'>
            <i className="fas fa-lightbulb mr-2" />
            Estas son las estrategias que propongo...
          </h5>
        </div>
      </div>
      <div className='col-12'>
        <Messages
          ref={infoMsg}
          className='align-justify'
        />
      </div>
      <div className='col-2'>
          <Button 
            icon="fas fa-plus"
            label='Nueva Estrategia'
            className='p-button-raised p-button-success mr-4'
            onClick={handleSetNewAction}
          />
      </div>
      {
        values.actions.map( (data, index) => (
          <div className='col-12 mt-2' key={index}>
            <div className='card'>
              <div className='grid p-fluid'>
                <div className='col-11'>
                  <span className="p-float-label mt-3">
                    <InputTextarea
                      id={`actions[${index}].action`}
                      name={`actions[${index}].action`}
                      value={data.action} 
                      className={classNames(
                        { 
                          'p-invalid': 
                          errors.actions && errors.actions[index]?.action
                        }
                      )}
                      onChange={handleChange} 
                    />
                    <label 
                      htmlFor={`actions[${index}].action`}
                    >
                      {`Estrategia ${performActionListSize + 1 + index}*`}
                    </label>
                  </span>
                  {
                    ( errors.actions && errors.actions[index]?.action )
                      && (
                        <small className="p-error mt-1">
                          {errors.actions[index].action}
                        </small>
                      )
                  }
                </div>
                <div className='col-1'>
                  <div className='center-inside'>
                    <Button 
                      icon="fas fa-trash"
                      tooltip='Eliminar Estrategia'
                      tooltipOptions={{position: 'bottom'}}
                      disabled={values.actions.length === 1}
                      className='p-button-raised p-button-danger'
                      onClick={() => handleRemoveAction( index )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      }
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-3'>
            <Button 
              icon="fas fa-save"
              label={
                values.actions.length === 1
                  ? ('Guardar Estrategia')
                  : ('Guardar Estrategias')
              }
              type='submit'
              disabled={performActionListSize + values.actions.length > 10}
              className='p-button-raised mr-4'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  )
});
