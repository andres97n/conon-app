import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import { Message } from 'primereact/message';
import { confirmDialog } from 'primereact/confirmdialog';

import { TopicStudentEvaluationTableApp } from './TopicStudentEvaluationTableApp';
import { TopicStudentEvaluationFooterApp } from './TopicStudentEvaluationFooterApp';

import { coEvaluationQuestions } from '../../../data/student/coEvaluationQuestions';
import { 
  getCheckboxStateEvaluation, 
  getErrorMsgEvaluation,
  getValidEvaluationQuestions, 
  isEvaluationOptionEmpty, 
  setValuesEvaluation 
} from '../../../helpers/school';
import { 
  startSaveEvaluationAbp, 
  startUpdateEvaluationAbp 
} from '../../../actions/teacher/evaluationAbp';
import { 
  getEvaluationAbpObject, 
  getEvaluationDetailAbpObject 
} from '../../../helpers/evaluation';


export const TopicStudentCoEvaluationApp = React.memo(({
  abpId,
  teamDetailId,
  evaluation,
  currentRubric,
  evaluationDetails,
  isModerator,
  toast
}) => {

  const dispatch = useDispatch();
  const [coEvaluation, setCoEvaluation] = useState({});
  const isMounted = useRef(true);
  const evaluationQuestions = getValidEvaluationQuestions( 
    isModerator, coEvaluationQuestions 
  );
  const rubric = useMemo(() => {
    return currentRubric[0] || {};
  }, [currentRubric]);
  const columns = [
    { field: 'index', header: '#' },
    { field: 'question', header: 'Pregunta' },
    { header: 'No lo hice/hicimos' },
    { header: 'Lo hice/hicimos poco' },
    { header: 'Lo hice/hicimos normal' },
    { header: 'Lo hice/hicimos mucho' },
  ];

  const formik = useFormik({
    initialValues: {
      ...getCheckboxStateEvaluation,
      finalGrade: 0
    },
    validate: (data) => {
      let errors = {};

      if (!isEvaluationOptionEmpty(data.firstQuestion)) {
        errors.firstQuestion = getErrorMsgEvaluation(1);
      }
      if (!isEvaluationOptionEmpty(data.secondQuestion)) {
        errors.secondQuestion = getErrorMsgEvaluation(2);
      }
      if (!isEvaluationOptionEmpty(data.thirdQuestion)) {
        errors.thirdQuestion = getErrorMsgEvaluation(3);
      }
      if (!isEvaluationOptionEmpty(data.fourthQuestion)) {
        errors.fourthQuestion = getErrorMsgEvaluation(4);
      }
      if (!isEvaluationOptionEmpty(data.fifthQuestion)) {
        errors.fifthQuestion = getErrorMsgEvaluation(5);
      } 
      if (!isEvaluationOptionEmpty(data.sixthQuestion)) {
        errors.sixthQuestion = getErrorMsgEvaluation(6);
      }
      if (isModerator) {
        if (!isEvaluationOptionEmpty(data.seventhQuestion)) {
          errors.seventhQuestion = getErrorMsgEvaluation(7);
        }
        if (!isEvaluationOptionEmpty(data.eighthQuestion)) {
          errors.eighthQuestion = getErrorMsgEvaluation(8);
        }
      }
      if (data.finalGrade === 0) {
        errors.finalGrade = 'La nota final debe ser ingresada';
      }

      return errors;
    },
    onSubmit: (data) => {
      handleConfirmSaveAutoEvaluationData( data );
    }
  });

  const { values, errors, setFieldValue, handleSubmit } = formik;

  const handleSubmitEvaluation = ( data ) => {
    const evaluationSize = Object.keys(evaluation).length; 
    const evaluationGrade = parseFloat((
      data.finalGrade * (rubric.rubric_detail_abp.grade_percentage / 100)
    ).toFixed(2));
    const newEvaluation = getEvaluationAbpObject(
      abpId, teamDetailId, evaluationSize, evaluation, evaluationGrade
    );
    const newCoEvaluation = getEvaluationDetailAbpObject(
      rubric, data, isModerator, coEvaluationQuestions, 2, evaluationGrade
    ); 
    if (isMounted.current) {
      if (evaluation?.id) {
        dispatch( startUpdateEvaluationAbp( 
          newEvaluation, evaluation.id, newCoEvaluation, toast 
        ));
      } else {
        dispatch( startSaveEvaluationAbp( newEvaluation, newCoEvaluation, toast ) );
      }
    }
  }

  const handleConfirmSaveAutoEvaluationData = ( data ) => {
    confirmDialog({
      message: '¿Está seguro que desea guardar la siguiente Coevaluación?',
      header: 'Confirmación de guardado',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSubmitEvaluation( data ),
    });
  }

  const handleChangeFormikValue = useCallback(
    ( field, value ) => {
      setFieldValue(field, value);
    }, [setFieldValue],
  );

  const handleSetCoEvaluation = useCallback(
    ( data ) => {
      setCoEvaluation(data);
    }, [],
  );

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(evaluationDetails) && evaluationDetails.length > 0) {
      const currentEvaluation = evaluationDetails.filter( evaluation => 
        evaluation.title_evaluation_detail === 'Coevaluación' 
      ) || [];
      if (currentEvaluation.length > 0) {
        handleSetCoEvaluation( currentEvaluation[0] );
      }
    }
  }, [evaluationDetails, handleSetCoEvaluation]);

  return (
    <div className='grid p-fluid'>
      {
        Object.keys(coEvaluation).length === 0 &&
          <div className='col-12'>
            <Message
              severity="info" 
              text='Si seleccionó una opción y requiere cambiar la misma, puede hacerlo 
              desmarcando la opción seleccionada.'
            />
          </div>
      }
      <div className='col-12'>
        <div className='card'>
          <TopicStudentEvaluationTableApp 
            evaluationSaved={Object.keys(coEvaluation).length > 0}
            values={
              Object.keys(coEvaluation).length > 0
                ? setValuesEvaluation( 
                  values, 
                  'finalGrade', 
                  isModerator, 
                  coEvaluation.detail_body, 
                  coEvaluationQuestions,
                  2
                )
                : values
            }
            evaluationQuestions={evaluationQuestions}
            columns={columns}
            width={'150px'}
            setFieldValue={handleChangeFormikValue}
          />
        </div>
      </div>
      {
        Object.keys(coEvaluation).length === 0 &&
          <div className='col-12'>
            <TopicStudentEvaluationFooterApp 
              values={values}
              errors={errors}
              setFieldValue={handleChangeFormikValue}
              handleSubmit={handleSubmit}
            />
          </div>
      }
    </div>
  )
});
