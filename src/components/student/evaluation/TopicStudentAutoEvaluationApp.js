import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import { Message } from 'primereact/message';
import { confirmDialog } from 'primereact/confirmdialog';

import { TopicStudentEvaluationTableApp } from './TopicStudentEvaluationTableApp';
import { TopicStudentEvaluationFooterApp } from './TopicStudentEvaluationFooterApp';

import { 
  startSaveEvaluationAbp, 
  startUpdateEvaluationAbp 
} from '../../../actions/teacher/evaluationAbp';
import { 
  getCheckboxStateEvaluation, 
  getErrorMsgEvaluation,
  getValidEvaluationQuestions, 
  isEvaluationOptionEmpty, 
  setValuesEvaluation
} from '../../../helpers/school';
import { autoEvaluationQuestions } from '../../../data/student/autoEvaluationQuestions';
import { 
  getEvaluationAbpObject, 
  getEvaluationDetailAbpObject 
} from '../../../helpers/evaluation';


export const TopicStudentAutoEvaluationApp = React.memo(({
  abpId,
  teamDetailId,
  evaluation,
  currentRubric,
  evaluationDetails,
  isModerator,
  toast
}) => {

  const dispatch = useDispatch();
  const [autoEvaluation, setAutoEvaluation] = useState({});
  const isMounted = useRef(true);
  const rubric = useMemo(() => {
    return currentRubric[0] || {};
  }, [currentRubric]);
  const evaluationQuestions = getValidEvaluationQuestions( 
    isModerator, autoEvaluationQuestions 
  );
  const columns = [
    { field: 'index', header: '#' },
    { field: 'question', header: 'Pregunta' },
    { header: 'No lo hice' },
    { header: 'Lo hice poco' },
    { header: 'Lo hice normal' },
    { header: 'Lo hice mucho' },
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
      if (isModerator) {
        if (!isEvaluationOptionEmpty(data.fourthQuestion)) {
          errors.fourthQuestion = getErrorMsgEvaluation(4);
        }
        if (!isEvaluationOptionEmpty(data.fifthQuestion)) {
          errors.fifthQuestion = getErrorMsgEvaluation(5);
        }
      }
      if (!isEvaluationOptionEmpty(data.sixthQuestion)) {
        errors.sixthQuestion = getErrorMsgEvaluation(6);
      }
      if (!isEvaluationOptionEmpty(data.seventhQuestion)) {
        errors.seventhQuestion = getErrorMsgEvaluation(7);
      }
      if (!isEvaluationOptionEmpty(data.eighthQuestion)) {
        errors.eighthQuestion = getErrorMsgEvaluation(8);
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
    const newAutoEvaluation = getEvaluationDetailAbpObject(
      rubric, data, isModerator, autoEvaluationQuestions, 1, evaluationGrade
    ); 
    if (isMounted.current) {
      if (evaluation?.id) {
        dispatch( startUpdateEvaluationAbp( 
          newEvaluation, evaluation.id, newAutoEvaluation, toast 
        ));
      } else {
        dispatch( startSaveEvaluationAbp( newEvaluation, newAutoEvaluation, toast ) );
      }
    }
  }

  const handleConfirmSaveAutoEvaluationData = ( data ) => {
    confirmDialog({
      message: '¿Está seguro que desea guardar la siguiente Autoevaluación?',
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

  const handleSetAutoEvaluation = useCallback(
    ( data ) => {
      setAutoEvaluation(data);
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
        evaluation.title_evaluation_detail === 'Autoevaluación' 
      ) || [];
      if (currentEvaluation.length > 0) {
        handleSetAutoEvaluation( currentEvaluation[0] );
      }
    }
  }, [evaluationDetails, handleSetAutoEvaluation]);

  return (
    <div className='grid p-fluid'>
      {
        Object.keys(autoEvaluation).length === 0 &&
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
            evaluationSaved={Object.keys(autoEvaluation).length > 0}
            values={
              Object.keys(autoEvaluation).length > 0
                ? setValuesEvaluation( 
                  values, 
                  'finalGrade', 
                  isModerator, 
                  autoEvaluation.detail_body, 
                  autoEvaluationQuestions,
                  1
                )
                : values
            }
            evaluationQuestions={evaluationQuestions}
            columns={columns}
            width={'120px'}
            setFieldValue={handleChangeFormikValue}
          />
        </div>
      </div>
      {
        Object.keys(autoEvaluation).length === 0 &&
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
