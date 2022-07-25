import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { confirmDialog } from 'primereact/confirmdialog';

import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

import { TopicTeacherHeaderTabApp } from './TopicTeacherHeaderTabApp';
import { TopicTeacherTabApp } from './TopicTeacherTabApp';

import { 
  getMainTopicFormFieldsErrors,
  getMethodologyFormFields, 
  getMethodologyFormFieldsErrors, 
  getMethodologyType, 
  getTopicFormData
} from '../../../../../helpers/topic/main';
import { getToastMsg } from '../../../../../helpers/abp';
import { 
  clearAllDuaLocalStorageFiles, 
  getDuaMethodologyData 
} from '../../../../../helpers/topic/duaMethodology';
import { 
  clearAllAbpLocalStorageFiles, 
  getAbpMethodologyData 
} from '../../../../../helpers/topic/abpMethodology';
import { startSaveTopic } from '../../../../../actions/admin/topic';
import { 
  clearAllAcLocalStorageFiles, 
  getAcMethodologyData 
} from '../../../../../helpers/topic/acMethodology';


export const TopicTeacherFormApp = React.memo(({
  userId,
  topicData,
  toast,
  setIsTopicSaved
}) => {

  const dispatch = useDispatch();
  const [isTitleSaved, setIsTitleSaved] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      objective: '',
      start_at: null,
      start_time: null,
      end_at: null,
      end_time: null,
      observations: '',
      ...getMethodologyFormFields( topicData.methodology.abbrev )
    },
    validate: (data) => {
      let errors = {};

      errors = getMainTopicFormFieldsErrors( data, errors );
      
      return getMethodologyFormFieldsErrors( 
        topicData.methodology.abbrev, data, errors 
      );
    },
    onSubmit: (data) => {
      handleConfirmSaveTopic( data );
    }
  });
  
  const { values, errors, setFieldValue, handleSubmit } = formik;

  const handleSubmitTopicData = ( data ) => {
    let newMethodoly;
    const methodologyType = getMethodologyType( topicData.methodology );
    const newTopic = getTopicFormData( data, topicData, methodologyType, userId );

    if (methodologyType === 1) {
      newMethodoly = getDuaMethodologyData( data );      
    } else if (methodologyType === 2) {
      newMethodoly = getAbpMethodologyData( data );
    } else if (methodologyType === 3) {
      newMethodoly = getAcMethodologyData( data );
    }
    if (newMethodoly) {
      dispatch( startSaveTopic( newTopic, newMethodoly, toast ) );
      setIsTopicSaved(true);
      if (methodologyType === 1) {     
        clearAllDuaLocalStorageFiles();
      } else if (methodologyType === 2) {
        clearAllAbpLocalStorageFiles();
      } else if (methodologyType === 3) {
        clearAllAcLocalStorageFiles();
      }
    }
  }

  const handleSetFieldValue = useCallback(
    ( field, value ) => {
      setFieldValue( field, value );
    },
    [setFieldValue],
  );

  const handleSetIsTitleSaved = useCallback(
    ( value ) => {
      setIsTitleSaved(value);
    }, [],
  );

  const handleConfirmSaveTopic = ( data ) => {
    confirmDialog({
      message: 'Está seguro de guardar el siguiente Tópico??',
      header: 'Confirmación de Guardado',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSubmitTopicData( data ),
    });
  }

  useEffect(() => {
    getToastMsg(
      toast, 
      'warn', 
      'Todos los campos que visualice con (*) son obligatorios.', 
      6000
    );                
  }, [toast]);

  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <div className='card'>
          <TopicTeacherHeaderTabApp
            classroomName={topicData.classroom.name}
            asignatureName={topicData.asignature_detail.name}
            methodologyName={topicData.methodology.name}
          />
        </div>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-4'>
            <Button
              label='Guardar Tema de Estudio'
              icon='fas fa-save'
              iconPos='top'
              className="p-button-raised p-button-info"
              type='submit'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
      {
        Object.keys(errors).length > 0 && (
          <div className='col-12'>
            <Message severity="error" text={errors[`${Object.keys(errors)[0]}`]} />
          </div>
        )
      }
      <div className='col-12'>
        <TopicTeacherTabApp 
          topicData={topicData}
          values={values}
          errors={errors}
          isTitleSaved={isTitleSaved}
          toast={toast}
          setFieldValue={handleSetFieldValue}
          setIsTitleSaved={handleSetIsTitleSaved}
        />
      </div>
    </div>
  )
});
