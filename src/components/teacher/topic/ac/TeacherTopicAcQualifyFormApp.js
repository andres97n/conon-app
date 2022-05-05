import React from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { startSaveStudentEvaluationAc, startUpdateEvaluationAc } from '../../../../actions/teacher/evaluationAc';


export const TeacherTopicAcQualifyFormApp = React.memo(({
  evaluationAc,
  section,
  rubricId,
  teamDetailId,
  toast
}) => {
  
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      sectionValue: 0,
    },
    validate: (data) => {
      let errors = {};
      if (data.sectionValue === 0) {
        errors.sectionValue = 'La calificación es requerida.';
      }
      return errors;
    },
    onSubmit: (data) => {
      handleConfirmSubmitAcQualification(data);
    }
  });

  const { values, errors, handleChange, handleSubmit } = formik;

  const handleSubmitAcQualification = ( data ) => {
    if (Object.keys(evaluationAc).length === 0) {
      const newAcEvaluation = {
        rubric_ac: rubricId,
        team_detail_ac: teamDetailId,
        description: '',
        final_value: data.sectionValue,
        observations: '',
        state: 1,
      };
      const newAcEvaluationDetail = {
        rubric_detail_ac: section.rubric_detail_ac.id,
        evaluation_type: 3,
        detail_body: {},
        detail_value: data.sectionValue,
        active: true,
      };
      console.log(newAcEvaluation);
      console.log(newAcEvaluationDetail);
      dispatch( startSaveStudentEvaluationAc( 
        newAcEvaluation, newAcEvaluationDetail, toast 
      ));
    } else {
      const newAcEvaluation = {
        id: evaluationAc.id,
        rubric_ac: rubricId,
        team_detail_ac: teamDetailId,
        description: '',
        final_value: evaluationAc.final_value + data.sectionValue,
        observations: '',
        state: 1, 
      }
      const newAcEvaluationDetail = {
        rubric_detail_ac: section.rubric_detail_ac.id,
        evaluation_type: 3,
        detail_body: {},
        detail_value: data.sectionValue,
        active: true,
      };
      console.log(newAcEvaluation);
      console.log(newAcEvaluationDetail);
      dispatch( startUpdateEvaluationAc( 
        newAcEvaluation, newAcEvaluation.id, newAcEvaluationDetail, toast 
      ));
    }
  }

  const handleConfirmSubmitAcQualification = ( data ) => {
    confirmDialog({
      message: '¿Está seguro de guardar la siguiente calificación?',
      header: 'Panel de Confirmación',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSubmitAcQualification( data )
    });
  }

  return (
    <div className='grid p-fluid'>
      <div className='col-8'>
        <span className="p-float-label">
          <InputNumber
            name='sectionValue'
            value={values.sectionValue} 
            showButtons
            min={0} max={section.rubric_detail_ac.rating_value} 
            step={0.25}
            decrementButtonClassName="p-button-secondary" 
            incrementButtonClassName="p-button-primary" 
            incrementButtonIcon="fas fa-plus" 
            decrementButtonIcon="fas fa-minus" 
            minFractionDigits={0}
            maxFractionDigits={2}
            className={classNames({ 'p-invalid': errors['sectionValue'] })}
            onValueChange={handleChange} 
          />
          <label 
            htmlFor="qualify"
            className={classNames({ 'p-invalid': errors['sectionValue'] })}
          >Calificación</label>
        </span>
      </div>
      <div className='col-4'>
        <h5 className='text-center'>
          / {section.rubric_detail_ac.rating_value}
        </h5>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-8'>
            <Button
              label='Guardar Calificación'
              icon='fas fa-save'
              type='submit'
              className=''
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  )
});
