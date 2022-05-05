import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

import { TopicCreateRubricFormApp } from './TopicCreateRubricFormApp';

import {
  getRubricDetailsAbc,
  getRubricDetailsAbp,
  getRubricErrorsForm,
  getRubricInitialState,
  getRubricMsg
} from '../../../../../../../../helpers/topic/headerRubric';
import { startSaveRubricAbp } from '../../../../../../../../actions/teacher/rubricAbp';
import { startSaveRubricAc } from '../../../../../../../../actions/teacher/rubricAc';

// TODO: Resolver el problema al asignar un valor final a la rúbrica

export const TopicCreateRubricApp = React.memo(({
  selectedMethodology,
  toast,
  handleSetShowBackMessage,
  handleSetBackMessage,
  handleHideCreateDialog,
  setIsSecondDialogBlock
}) => {

  const dispatch = useDispatch();
  const { currentAbp } = useSelector(state => state.dashboard.abp);
  const { currentAc } = useSelector(state => state.dashboard.ac);
  const formik = useFormik({
    initialValues: {
      description: '',
      finalValue: 0,
      observations: '',
      ...getRubricInitialState
    },
    validate: (data) => {
      let errors = {}
      return getRubricErrorsForm( errors, data );
    },
    onSubmit: (data) => {
      handleConfirmSaveRubric(data);
    }
  });

  const { values, errors, setFieldValue, handleSubmit } = formik;

  const handleSaveRubric = ( data ) => {
    if (selectedMethodology === 2) {
      const newRubric = {
        abp: currentAbp.id,
        description_rubric: data.description,
        abp_final_value: data.finalValue,
        observations: data.observations,
        state: 1
      };
      const newRubricDetails = getRubricDetailsAbp( data );
      dispatch( startSaveRubricAbp( newRubric, newRubricDetails, toast ) );
    } else {
      const newRubric = {
        ac: currentAc.id,
        description_rubric: data.description,
        ac_final_value: data.finalValue,
        observations: data.observations,
        state: 1,
      };
      const newRubricDetails = getRubricDetailsAbc( data );
      dispatch( startSaveRubricAc( newRubric, newRubricDetails, toast ) );
    }
    handleSetShowBackMessage(true);
    handleSetBackMessage('Está seguro de regresar sin antes asignar grupos al tópico?');
    handleHideCreateDialog();
    setIsSecondDialogBlock(true);
  }

  const handleConfirmSaveRubric = ( data ) => {
    confirmDialog({
      message: 'Está seguro que desea guardar la siguiente rúbrica?',
      header: 'Confirmación de Guardado',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSaveRubric( data ),
    });
  }

  return (
    <div className='p-grid crud-demo'>
      <div className='p-col-12'>
        <div className='grid p-fluid'>
          <div className='col-12'>
            <div className='card'>
              <h5 className='text-center'>
                <i className="fas fa-spell-check mr-2 icon-primary" />
                Valor Final: {values.finalValue}
              </h5>
              <div className='center-inside'>
                <div className='col-6'>
                  <Button
                    label='Guardar Rúbrica'
                    icon='fas fa-save'
                    type='submit'
                    disabled={
                      Object.keys(currentAbp).length === 0 && Object.keys(currentAc).length === 0
                    }
                    className="p-button-raised p-button-success"
                    onClick={handleSubmit}
                  />
                </div>
              </div>
              {
                Object.keys(errors).length > 0 && (
                  <div className='col-12'>
                    <Message
                      severity="error"
                      text={getRubricMsg(errors)}
                    />
                  </div>
                )
              }
            </div>
          </div>
          {
            ((selectedMethodology === 2 && Object.keys(currentAbp).length === 0) || 
            (selectedMethodology === 3 && Object.keys(currentAc).length === 0))
              ? (
                <small>No se encontró la metodología guardada.</small>
              )
              : (
                <div className='col-12'>
                  <div className='card'>
                    <TopicCreateRubricFormApp
                      values={values}
                      errors={errors}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                </div>
              )
          }
        </div>
      </div>
    </div>
  )
});
