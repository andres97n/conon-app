import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import classNames from 'classnames';
import { confirmDialog } from 'primereact/confirmdialog';

import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';

import { 
  startSaveEvaluationAbp, 
  startUpdateEvaluationAbp 
} from '../../../../actions/teacher/evaluationAbp';


export const TeacherTopicAbpQualifyFormApp = React.memo(({
  evaluationAbp,
  section,
  methodologyId,
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
      handleConfirmSubmitAbpQualification(data);
    }
  });

  const { values, errors, handleChange, handleSubmit } = formik;

  const handleSubmitAbpQualification = ( data ) => {
    if (Object.keys(evaluationAbp).length === 0) {
      const newAbpEvaluation = {
        abp: methodologyId,
        team_detail_abp: teamDetailId,
        description: '',
        final_grade: data.sectionValue,
        observations: '',
        state: 1,
      };
      const newAbpEvaluationDetail = {
        title_evaluation_detail: section.rubric_detail_abp.title,
        evaluation_description: section.rubric_detail_abp.description,
        grade_percentage: section.rubric_detail_abp.grade_percentage,
        detail_body: {},
        rating_value: data.sectionValue,
        active: true,
      };
      dispatch( startSaveEvaluationAbp( newAbpEvaluation, newAbpEvaluationDetail, toast ) );
    } else {
      const newAbpEvaluation = {
        id: evaluationAbp.id,
        abp: methodologyId,
        team_detail_abp: teamDetailId,
        description: '',
        final_grade: evaluationAbp.final_grade + data.sectionValue,
        observations: '',
        state: 1, 
      }
      const newAbpEvaluationDetail = {
        title_evaluation_detail: section.rubric_detail_abp.title,
        evaluation_description: section.rubric_detail_abp.description,
        grade_percentage: section.rubric_detail_abp.grade_percentage,
        detail_body: {},
        rating_value: data.sectionValue,
        active: true,
      };
      dispatch( startUpdateEvaluationAbp( 
        newAbpEvaluation, newAbpEvaluation.id, newAbpEvaluationDetail, toast 
      ));
    }
  }

  const handleConfirmSubmitAbpQualification = ( data ) => {
    confirmDialog({
      message: '¿Está seguro de guardar la siguiente calificación?',
      header: 'Panel de Confirmación',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSubmitAbpQualification( data )
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
            min={0} max={section.rubric_detail_abp.rating_value} 
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
          / {section.rubric_detail_abp.rating_value}
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
