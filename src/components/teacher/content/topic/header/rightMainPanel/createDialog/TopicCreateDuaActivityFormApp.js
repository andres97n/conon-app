import React from 'react';
import classNames from 'classnames';

import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { TopicCreateDuaActivityQuestionApp } from './TopicCreateDuaActivityQuestionApp';


export const TopicCreateDuaActivityFormApp = React.memo(({
  values,
  errors,
  initialState,
  setFieldValue,
}) => {

  const handleAddActivityQuestion = () => {
    setFieldValue(
      'questions',
      [ ...values.questions, initialState ]
    );
  }

  return (
    <div className='grid p-fluid'>
      <div className='field col-12 mt-2'>
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
      <div className='col-12'>
        <span className="p-float-label">
          <InputTextarea
            id='objective'
            name='objective'
            required rows={3} cols={20} 
            value={values.objective}
            className={classNames({ 'p-invalid': errors['objective'] })}
            onChange={(e) => setFieldValue( 'objective', e.target.value )}
          />
          <label 
            htmlFor='objective'
            className={classNames({ 'p-invalid': errors['objective'] })}
          >
            Objetivo
          </label>
        </span>
      </div>
      <div className='col-12'>
        <TopicCreateDuaActivityQuestionApp
          values={values}
          errors={errors}
          setFieldValue={setFieldValue}
        />
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-6'>
            <Button 
              label='Añadir Pregunta'
              icon='fas fa-plus'
              type='submit'
              className="p-button-raised"
              onClick={handleAddActivityQuestion}
            />
          </div>
        </div>
      </div>
    </div>
  )
});
