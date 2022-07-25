import React, { useEffect, useState } from 'react';

import { Button } from 'primereact/button';
import { Slider } from 'primereact/slider';

import { 
  getCurrentSectionRubric 
} from '../../../../helpers/topic/student/ac/evaluationAc';


export const TopicStudentAutoEvaluationAcFormApp = React.memo(({
  rubricDetailAc,
  values,
  setFieldValue,
  handleSubmit
}) => {

  const [currentSectionRubric, setCurrentSectionRubric] = useState({});

  useEffect(() => {
    if (rubricDetailAc.length > 0) {
      const rubric = getCurrentSectionRubric( rubricDetailAc, 'Autoevaluación' );
      setCurrentSectionRubric( rubric );
    }
  }, [rubricDetailAc]);

  return (
    <>
      <div className='col-12'>
        <h5 className='text-center'>
          <i className="fas fa-check mr-2 icon-primary" />
          Nota Final de la Autoevaluación: {values.finalGrade}
        </h5>
      </div>
      <div className='col-12'>
        <h6 className='text-center'>
          Calificación que considere tiene en esta Autoevaluación realizada
        </h6>
      </div>
      {
        Object.keys(currentSectionRubric).length > 0
          ? (
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
          )
          : (
            <div className='col-12'>
              <small className='text-center'>
                No se pudo encontrar el valor de esta evaluación en la rúbrica ingresada.
              </small>
            </div>
          )
      }
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-4'>
            <Button
              icon='fas fa-save'
              label='Guardar Autoevaluación'
              type='submit'
              disabled={values.finalGrade === 0}
              className='p-button-raised'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  )
});
