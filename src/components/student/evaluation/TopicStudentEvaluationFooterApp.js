import React from 'react';

import { Slider } from 'primereact/slider';
import { Message } from 'primereact/message';
import { Button } from 'primereact/button';


export const TopicStudentEvaluationFooterApp = React.memo(({
  values,
  errors,
  setFieldValue,
  handleSubmit
}) => {

  return (
    <div className='card'>
      <div className='grid p-fluid'>
        <div className='col-12'>
          <h5 className='text-center'>
            <i className="fas fa-check mr-2 icon-primary" />
            Nota Final de la Autoevaluación: {values.finalGrade}
          </h5>
        </div>
        <div className='col-12'>
          <small className='text-center'>
            Calificación que considere tiene en esta Autoevaluación realizada
          </small>
        </div>
        <div className='col-12'>
          <div className='center-inside mt-3'>
            <div className='col-8'>
              <Slider 
                id='finalGrade'
                value={values.finalGrade} 
                step={1}
                min={0} 
                max={10}
                onChange={(e) => setFieldValue('finalGrade', e.value)} 
              />
            </div>
          </div>
        </div>
        <div className='col-12'>
          {
            Object.keys(errors).length > 0 &&
              (
                <div className='center-inside mt-3'>
                  <div className='col-8'>
                    <Message 
                      severity="error" 
                      text={errors[`${Object.keys(errors)[0]}`]} 
                    />
                  </div>
                </div>
              )
          }
        </div>
        <div className='col-12'>
          <div className='center-inside'>
            <div className='col-4'>
              <Button
                icon='fas fa-save'
                label='Guardar Autoevaluación'
                type='submit'
                className='p-button-raised'
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
});
