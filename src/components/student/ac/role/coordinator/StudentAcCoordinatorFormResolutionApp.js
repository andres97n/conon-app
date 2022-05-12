import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { confirmDialog } from 'primereact/confirmdialog';

import { Message } from 'primereact/message';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';

import { EmptyContentScreen } from '../../../../ui/EmptyContentScreen';
import { TopicTextEditorApp } from '../../../editor/TopicTextEditorApp';
import { StudentAcCoordinatorFormImagesApp } from './StudentAcCoordinatorFormImagesApp';

import { loadSchoolData } from '../../../../../helpers/topic';
import { 
  startLoadProblemResolutionGroupAc, 
  startSaveProblemResolutionGroupAc, 
  startUpdateProblemResolutionGroupAc 
} from '../../../../../actions/student/ac_roles/coordinatorAc/problemResolutionGroupAc';


export const StudentAcCoordinatorFormResolutionApp = React.memo(({
  selectedTopic,
  teamAcId,
  toast
}) => {

  const dispatch = useDispatch();
  const { 
    problemResolutionGroup, 
    loadingProblemResolutionGroup 
  } = useSelector( state => state.dashboard.coordinatorAc );
  const schoolPeriodName = localStorage.getItem('currentPeriodName');
  const schoolData = loadSchoolData( schoolPeriodName, selectedTopic, true );
  const isMounted = useRef(false);
  const formik = useFormik({
    initialValues: {
      problem_resolution: '',
      imageReferences: {
        firstImageUrl: {},
        secondImageUrl: {}
      },
      observations: ''
    },
    validate: (data) => {
      let errors = {};
      if (!data.problem_resolution) {
        errors.problem_resolution = 'La resolución del problema es obligatorio.';
      }
      return errors;
    },
    onSubmit: (data) => {
      handleConfirmSaveProblemResolutionData( data );
    }
  });

  const { values, errors, setFieldValue, handleChange, handleSubmit } = formik;

  const handleSubmitProblemResolution = ( data ) => {
    const newProbleResolution = {
      team_ac: teamAcId,
      problem_resolution: data.problem_resolution,
      references_images: [ 
        data.imageReferences.firstImageUrl, 
        data.imageReferences.secondImageUrl 
      ],
      observations: data.observations,
      active: true
    };
    if (Object.keys(problemResolutionGroup).length === 0) {
      dispatch( startSaveProblemResolutionGroupAc( newProbleResolution, toast ) );
    } else {
      dispatch( startUpdateProblemResolutionGroupAc( 
        problemResolutionGroup.id, 
        newProbleResolution, 
        toast 
      ));
    }
  }

  const handleConfirmSaveProblemResolutionData = ( data ) => {
    confirmDialog({
      message: '¿Está seguro que desea guardar la siguiente información?',
      header: 'Confirmación de guardado',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSubmitProblemResolution( data ),
    });
  }

  const handleLoadGroupProblemResolution = useCallback(
    ( teamId ) => {
      dispatch( startLoadProblemResolutionGroupAc( teamId ));
    }, [dispatch],
  );

  const handleSetFieldValue = useCallback(
    ( field, value ) => {
      setFieldValue(field, value);
    }, [ setFieldValue ],
  );

  useEffect(() => {
    if (teamAcId) {
      handleLoadGroupProblemResolution( teamAcId );
    }
  }, [teamAcId, handleLoadGroupProblemResolution]);

  useEffect(() => {
    const handleSetFields = ( problemResolution ) => {
      handleSetFieldValue( 'problem_resolution', problemResolution.problem_resolution );
      if (Array.isArray( problemResolution.references_images )) {
        problemResolution.references_images.forEach( (image, index) => {
          if (Object.keys(image).length > 0) {
            if (index === 0) {
              handleSetFieldValue( 
                'imageReferences.firstImageUrl', 
                image 
              );
            } else {
              handleSetFieldValue( 
                'imageReferences.secondImageUrl', 
                image 
              );
            }
          }
        })
      }
      handleSetFieldValue( 'observations', problemResolution.observations );
    }
    if (Object.keys(problemResolutionGroup).length > 0) {
      handleSetFields( problemResolutionGroup );
    }
  }, [problemResolutionGroup, handleSetFieldValue]);

  if (loadingProblemResolutionGroup) {
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
          <i className="fas fa-bullseye mr-2 icon-primary" />
          Resolución del Problema
        </h5>
      </div>
      <div className='col-12'>
        <Message 
          severity="warn" 
          text="Recuerde que si recarga esta página se perderá su información actual, 
          aseguŕese de guardar las veces que sea necesario para que esto no pase." 
        />
      </div>
      <div className='col-12'>
        <div className='card'>
          <TopicTextEditorApp
            isMounted={isMounted}
            schoolData={schoolData}
            maxImages={2}
            value={values.problem_resolution}
            field={'problem_resolution'}
            errors={errors}
            toast={toast}
            setFieldValue={handleSetFieldValue}
          />
        </div>
      </div>
      <StudentAcCoordinatorFormImagesApp 
        schoolData={schoolData}
        imageReferences={values.imageReferences}
        errors={errors}
        toast={toast}
        handleSetFieldValue={handleSetFieldValue}
      />
      <div className='col-12'>
        <span className="p-float-label mt-3">
          <InputTextarea
            id='observations'
            name='observations'
            value={values.observations}
            required rows={3} cols={20}
            onChange={handleChange}
          />
          <label htmlFor='observations'> Escribir Observaciones</label>
        </span>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-4'>
            <Button 
              label='Guardar Cambios'
              icon='fas fa-save'
              type='submit'
              tooltip='Puede guardar las veces que sea necesario.'
              tooltipOptions={{position:'bottom'}}
              className='p-button-raised p-button-success'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  )
});
