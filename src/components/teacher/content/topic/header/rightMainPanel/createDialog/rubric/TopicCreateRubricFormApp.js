import React from 'react';
import classNames from 'classnames';

import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';

import { TopicCreateRubricDetailForm } from './TopicCreateRubricDetailForm';

import { getRubricValueByPorcent } from '../../../../../../../../helpers/topic/headerRubric';


export const TopicCreateRubricFormApp = React.memo(({
  values,
  errors,
  setFieldValue
}) => {

  const handleSetValueDetail = () => {
    if (
      values.finalValue > 0 &&
      values.methodology.methodology_porcent_detail > 0 &&
      values.individual.individual_porcent_detail > 0 &&
      values.team.team_porcent_detail > 0 &&
      values.autoevaluation.autoevaluation_porcent_detail > 0 &&
      values.coevaluation.coevaluation_porcent_detail > 0    
    ) {
      const finalValue = values.finalValue;
      setFieldValue( 
        'methodology.methodology_value_detail',  
        getRubricValueByPorcent( finalValue, values.methodology.methodology_porcent_detail )
      );
      setFieldValue( 
        'individual.individual_value_detail',  
        getRubricValueByPorcent( finalValue, values.individual.individual_porcent_detail )
      );
      setFieldValue( 
        'team.team_value_detail',  
        getRubricValueByPorcent( finalValue, values.team.team_porcent_detail )
      );
      setFieldValue( 
        'autoevaluation.autoevaluation_value_detail',  
        getRubricValueByPorcent( 
          finalValue, values.autoevaluation.autoevaluation_porcent_detail 
        )
      );
      setFieldValue( 
        'coevaluation.coevaluation_value_detail',  
        getRubricValueByPorcent( 
          finalValue, values.coevaluation.coevaluation_porcent_detail 
        )
      );
    } else {
      setFieldValue( 'methodology.methodology_value_detail', 0 );
      setFieldValue( 'individual.individual_value_detail', 0);
      setFieldValue( 'team.team_value_detail', 0 );
      setFieldValue( 'autoevaluation.autoevaluation_value_detail', 0);
      setFieldValue( 'coevaluation.coevaluation_value_detail', 0 );
    }
}

  return (
    <div className='grid p-fluid'>
      <div className='field col-12'>
        <span className="p-float-label">
          <InputTextarea 
            id='description'
            name='description'
            required rows={3} cols={20} 
            value={values.description}
            className={classNames({ 'p-invalid': errors['description'] })}
            onChange={(e) => setFieldValue( 'description', e.target.value )}
          />
          <label 
            htmlFor='description'
            className={classNames({ 'p-invalid': errors['description'] })}
          >
            Descripción*
          </label>
        </span>
      </div>
      <div className='field col-12'>
        <span className="p-float-label">
          <InputNumber
            id='finalValue'
            name= 'finalValue'
            value={values.finalValue} 
            min={0} max={100} step={0.25}
            showButtons buttonLayout="horizontal"
            decrementButtonClassName="p-button-secondary" 
            incrementButtonClassName="p-button-primary" 
            incrementButtonIcon="fas fa-plus" 
            decrementButtonIcon="fas fa-minus" 
            minFractionDigits={0}
            maxFractionDigits={2}
            className={classNames(
              { 'p-invalid': !!errors['finalValue'] })
            }
            onValueChange={(e) => setFieldValue('finalValue', e.value)}
            onBlur={handleSetValueDetail} 
          />
          <label 
            htmlFor='finalValue'
            className={classNames(
              { 'p-error': !!errors['finalValue']}
            )}
            style={{ marginLeft: '2.2em' }}
          >Nota Final del ABP*</label>
        </span>
      </div>
      <div className='field col-12'>
        <span className="p-float-label">
          <InputTextarea 
            id='observations'
            name='observations'
            required rows={3} cols={20} 
            value={values.observations}
            className={classNames({ 'p-invalid': errors['observations'] })}
            onChange={(e) => setFieldValue( 'observations', e.target.value )}
          />
          <label 
            htmlFor='observations'
            className={classNames({ 'p-invalid': errors['observations'] })}
          >
            Observaciones
          </label>
        </span>
        <small 
          id="username1-help" 
          className="p-d-block"
        >
          Las observaciones que ingrese solo las podrá ver usted.
        </small>
      </div>
      <div className='col-12'>
        <TopicCreateRubricDetailForm 
          values={values}
          errors={errors}
          setFieldValue={setFieldValue}
        />
      </div>
    </div>
  )
});
