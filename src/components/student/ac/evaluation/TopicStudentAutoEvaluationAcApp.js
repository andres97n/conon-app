import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { 
  TopicStudentAutoEvaluationAcFormApp 
} from './TopicStudentAutoEvaluationAcFormApp';

import { 
  getAutoevaluationAc, 
  getCurrentSectionRubric 
} from '../../../../helpers/topic/student/ac/evaluationAc';
import { 
  startLoadCurrentRubricAc, 
  startRemoveRubricDetailAcList 
} from '../../../../actions/teacher/rubricAc';
import { 
  startSaveStudentEvaluationAc, 
  startUpdateEvaluationAc 
} from '../../../../actions/teacher/evaluationAc';


export const TopicStudentAutoEvaluationAcApp = React.memo(({
  currentMethodology,
  userAc,
  evaluation,
  details,
  toast
}) => {
  
  const dispatch = useDispatch();
  const { 
    currentRubric
  } = useSelector( state => state.dashboard.rubricAc );
  const [currentEvaluation, setCurrentEvaluation] = useState({});
  const isMounted = useRef(true);

  const formik = useFormik({
    initialValues: {
      finalGrade: 0
    },
    validate: (data) => {
      let errors = {};

      if (data.finalGrade === 0) {
        errors.finalGrade = 'La nota final debe ser ingresada';
      }

      return errors;
    },
    onSubmit: (data) => {
      handleConfirmSaveAutoEvaluationData( data );
    }
  });

  const { values, setFieldValue, handleReset, handleSubmit } = formik;

  const handleLoadCurrentRubric = useCallback(
    ( acId ) => {
      dispatch( startLoadCurrentRubricAc( acId ));
    }, [dispatch],
  );

  const handleRemoveCurrentRubric = useCallback(
    () => {
      dispatch( startRemoveRubricDetailAcList() );
    }, [dispatch],
  );

  const handleSubmitEvaluationAc = ( data ) => {
    if (isMounted.current) {
      const rubricAc = currentRubric[0].rubric_ac;
      const rubricDetailAc = getCurrentSectionRubric( 
        currentRubric[0].rubric_detail_ac, 
        'Autoevaluación' 
      );
      const evaluationValue = (rubricDetailAc.rating_value * data.finalGrade)/10; 
      const newEvaluationDetail = {
        rubric_detail_ac: rubricDetailAc.id,
        evaluation_type: 1,
        detail_value: evaluationValue,
        detail_body: {}
      };
      
      if (evaluation.id) {
        const newEvaluation = {
          rubric_ac: rubricAc.id,
          team_detail_ac: userAc.id,
          description: '',
          final_value: evaluation.final_value + evaluationValue,
          observations: '',
          state: 1
        };
        dispatch( startUpdateEvaluationAc( 
          newEvaluation, 
          evaluation.id,
          newEvaluationDetail,
          toast
        ));
      } else {
        const newEvaluation = {
          rubric_ac: rubricAc.id,
          team_detail_ac: userAc.id,
          description: '',
          final_value: evaluationValue,
          observations: '',
          state: 1
        };
        dispatch( startSaveStudentEvaluationAc( 
          newEvaluation, 
          newEvaluationDetail, 
          toast 
        ));
      }
      handleReset();
    }
  }

  const handleConfirmSaveAutoEvaluationData = ( data ) => {
    confirmDialog({
      message: '¿Está seguro que desea guardar la siguiente Autoevaluación?',
      header: 'Confirmación de guardado',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSubmitEvaluationAc( data ),
    });
  }

  const handleSetFieldValue = useCallback(
    ( field, value ) => {
      setFieldValue( field, value );
    }, [setFieldValue],
  );

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
    if (details.length > 0) {
      const evaluation = getAutoevaluationAc( details, 1 );
      setCurrentEvaluation( evaluation );
    }
  }, [details]);

  useEffect(() => {
    if (currentMethodology) {
      handleLoadCurrentRubric( currentMethodology.id || 0);
    }
  
    return () => {
      if (currentMethodology) {
        handleRemoveCurrentRubric();
      }
    }
  }, [currentMethodology, handleLoadCurrentRubric, handleRemoveCurrentRubric]);

  if (currentRubric.length === 0) {
    return (
      <div className='col-12'>
        <small className='text-center'>No se pudo encontrar ninguna rúbrica.</small>
      </div>
    );
  }

  if (!currentRubric[0].rubric_ac || !currentRubric[0].rubric_detail_ac) {
    return (
      <div className='col-12'>
        <small className='text-center'>No se pudo encontrar ninguna rúbrica.</small>
      </div>
    );
  }

  return (
    <>
      {
        Object.keys(currentEvaluation).length > 0
          ? (
            <h5 className='text-center'>
              <i className="fas fa-check mr-2 icon-primary" />
              Nota Final de la Autoevaluación: {currentEvaluation.detail_value}
            </h5>
          )
          : (
            <TopicStudentAutoEvaluationAcFormApp 
              rubricDetailAc={currentRubric[0].rubric_detail_ac}
              values={values}
              setFieldValue={handleSetFieldValue}
              handleSubmit={handleSubmit}
            />
          )
      }
    </>
  )
});
