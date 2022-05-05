import React, { useCallback, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import { Messages } from 'primereact/messages';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Message } from 'primereact/message';
import { confirmDialog } from 'primereact/confirmdialog';

import { TopicTextEditorApp } from '../../../editor/TopicTextEditorApp';
import { TopicUploadImageApp } from '../../../upload/TopicUploadImageApp';
import { TopicYoutubeUrlApp } from '../../../videoUrl/TopicYoutubeUrlApp';

import { loadSchoolData } from '../../../../../helpers/topic';
import { getInfoMsg } from '../../../../../helpers/abp';
import { 
  startSaveProblemResolutionStepEightAbp, 
  startUpdateProblemResolutionStepEightAbp 
} from '../../../../../actions/student/abp_steps/problemResolutionStepEightAbp';
import { clearStoragePathsStepEight } from '../../../../../helpers/abp-steps';


export const ProblemResolutionFormStepEightAbpApp = React.memo(({
  teamId,
  selectedTopic,
  currentProblemResolutionAbp,
  toast
}) => {

  const dispatch = useDispatch();
  const schoolPeriodName = localStorage.getItem('currentPeriodName');
  const schoolData = loadSchoolData( schoolPeriodName, selectedTopic, true );
  const isMounted = useRef(false);
  const infoMsg = useRef(null);
  const formik = useFormik({
    initialValues: {
      problem_resolution: '',
      image_references: {
        firstImageUrl: {},
        secondImageUrl: {}
      },
      video_url: '',
      observations: ''
    },
    validate: (data) => {
      let errors = {};

      if (!data.problem_resolution) {
        errors.problem_resolution = 'La resolución del problema es obligatorio.';
      }
      if ( Object.keys(data.image_references.firstImageUrl).length === 0 ) {
        errors.firstImageUrl = 'La primera imagen no ha sido subida.';
      }
      if ( Object.keys(data.image_references.secondImageUrl).length === 0 ) {
        errors.secondImageUrl = 'La segunda imagen no ha sido subida.';
      }

      return errors;
    },
    onSubmit: (data) => {
      handleConfirmSaveProblemResolutionData( data );
    }
  });

  const { 
    values, dirty, errors, setValues, setFieldValue, handleChange, handleSubmit 
  } = formik;

  const handleSubmitProblemResolution = ( data ) => {
    const firstImageSize = Object.keys(data.image_references.firstImageUrl).length;
    const secondImageSize = Object.keys(data.image_references.secondImageUrl).length;
    const getImageReference = ( field ) => ({
      name: data.image_references[`${field}`].name,
      size: data.image_references[`${field}`].size,
      path: data.image_references[`${field}`].path
    });
    const newProblemResolution = {
      team_abp: teamId,
      problem_resolution: data.problem_resolution,
      image_references: (
        (firstImageSize === 0 && secondImageSize === 0)
          ? []
          : (firstImageSize >= 0 && secondImageSize === 0)
            ? [ getImageReference('firstImageUrl') ]
            : (secondImageSize >= 0 && firstImageSize.length === 0)
              ? [ getImageReference('secondImageUrl') ]
              : [
                getImageReference('firstImageUrl'),
                getImageReference('secondImageUrl')
              ]
      ),
      video_url: data.video_url,
      observations: data.observations,
      active: true
    };

    if (currentProblemResolutionAbp.length > 0) {
      dispatch( startUpdateProblemResolutionStepEightAbp( 
        newProblemResolution, currentProblemResolutionAbp[0].id, toast 
      ));
    } else {
      dispatch( startSaveProblemResolutionStepEightAbp( newProblemResolution, toast ));
    }
    clearStoragePathsStepEight();
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

  const setStepEightField = useCallback(
    ( field, value ) => {
      setFieldValue(field, value);
    }, [ setFieldValue ],
  );

  const handleSetValuesForm = useCallback(
    ( data ) => {
      setValues({
        problem_resolution: data.problem_resolution,
        image_references: {
          firstImageUrl: data.image_references[0] || {},
          secondImageUrl: data.image_references[1] || {}
        },
        video_url: data.video_url,
        observations: data.observations
      });
    }, [setValues],
  );

  useEffect(() => {
    isMounted.current = true;
  
    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
    if ( infoMsg.current?.state.messages?.length === 0 ) {
      getInfoMsg( 
        infoMsg, 
        'info',
        'Puede ingresar imágenes que describan o expliquen mucho más la solución que el ' + 
        'equipo plantea.',
        true
      );
    }
  }, []);

  useEffect(() => {
    if (currentProblemResolutionAbp.length > 0 && !dirty) {
      handleSetValuesForm( currentProblemResolutionAbp[0] );
    }
  }, [ currentProblemResolutionAbp, dirty, handleSetValuesForm ]);

  return (
    <>
      <div className='col-12'>
        <Message 
          severity="warn" 
          text="Recuerde que si recarga esta página se perderá su información actual, 
          aseguŕese de guardar las veces que sea necesario para que esto no pase." 
        />
      </div>
      <div className='col-12'>
        <TopicTextEditorApp
          isMounted={isMounted}
          schoolData={schoolData}
          maxImages={2}
          value={values.problem_resolution}
          field={'problem_resolution'}
          errors={errors}
          toast={toast}
          setFieldValue={setStepEightField}
        />
      </div>
      <div className='col-12'>
        <h5 className='text-center icon-black'>
          <i className="fas fa-images mr-2" />
          Imágenes Descriptivas
        </h5>
      </div>
      <div className='col-12'>
        <Messages
          ref={infoMsg}
          className='align-justify'
        />
      </div>
      <div className='col-6'>
        <TopicUploadImageApp 
          isMounted={isMounted}
          schoolData={schoolData}
          field={'image_references.firstImageUrl'}
          value={values.image_references.firstImageUrl}
          errorField={'firstImageUrl'}
          errors={errors}
          toast={toast}
          setFieldValue={setStepEightField}
          // setIsTabBlocked={handleSetIsFirstImageBlocked}
        />
      </div>
      <div className='col-6'>
        <TopicUploadImageApp 
          isMounted={isMounted}
          schoolData={schoolData}
          field={'image_references.secondImageUrl'}
          value={values.image_references.secondImageUrl}
          errorField={'secondImageUrl'}
          errors={errors}
          toast={toast}
          setFieldValue={setStepEightField}
          // setIsTabBlocked={handleSetIsSecondImageBlocked}
        />
      </div>
      <div className='col-6'>
        <h5 className='text-center'>
          <i className="fab fa-youtube mr-2 icon-danger" />
          Vídeo de YouTube
        </h5>
        <TopicYoutubeUrlApp 
          field={'video_url'}
          value={values.video_url}
          toast={toast}
          setVideoValue={setStepEightField}
        />
      </div>
      <div className='col-6'>
        <h5 className='text-center'>
          <i className="fas fa-comment mr-2" />
          Comentarios
        </h5>
        <div className='col-12'>
          <span className="p-float-label mt-3">
            <InputTextarea
              id='observations'
              name='observations'
              required rows={3} cols={20} 
              value={values.observations}
              onChange={handleChange}
            />
            <label htmlFor='observations'>
              Puede ingresar observaciones si así lo desea...
            </label>
          </span>
        </div>
      </div>
      {
        Object.keys(errors).length > 0 &&
          (
            <div className='col-12'>
              <div className='center-inside'>
                <Message 
                  severity="error" 
                  text={errors[`${Object.keys(errors)[0]}`]} 
                />
              </div>
            </div>
          )
      }
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-6'>
            <Button
              icon='fas fa-save'
              label='Guardar Resolución del Problema'
              tooltip='Puede guardar los cambios realizados y que el grupo 
              lo visualice.'
              tooltipOptions={{position:'bottom'}}
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
