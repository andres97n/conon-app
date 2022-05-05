import React, { useState } from 'react';

import { Checkbox } from 'primereact/checkbox';

import { 
  getAnswerOptions, 
  getFormikFieldsActivity, 
  getQuestionInitialState 
} from '../../../../helpers/dua';


export const StudentDuaActivityAnswerBodyApp = React.memo(({
  questions,
  answers,
  index,
  values,
  setFieldValue
}) => {

  const [activityDisabled, setActivityDisabled] = useState(
    getFormikFieldsActivity(questions));

  const handleControlCheckbox = ( questionIndex, field, option, clear ) => {
    const questionInitialState = getQuestionInitialState(
      questions[questionIndex]
    );   
    if (clear) {
      setActivityDisabled( oldState => ({
        ...oldState,
        [`${field}`]: getAnswerOptions( questionInitialState, option, clear )
      }));
    } else {
      setActivityDisabled( oldState => ({
        ...oldState,
        [`${field}`]: getAnswerOptions( questionInitialState, option )
      }));
    }
  }

  const handleCheckboxField = ( value, index, questionField, answerField ) => {
    setFieldValue( `${questionField}.${answerField}`, value );
    if (value) {
      handleControlCheckbox( 
        index, questionField, answerField  
      );
    } else {
      handleControlCheckbox( 
        index, questionField, answerField, true  
      );
    }
  }

  return (
    <>
      {
        answers.map( (answer, i) => (
          <div className='col-3' key={i}>
            <div className='card'>
              <div className='grid p-fluid'>
                <div className='col-12'>
                  <p className='text-justify'>
                    <b className='mr-2'>{answer.literal}.</b>{answer.detail}
                  </p>
                </div>
                <div className='col-12'>
                  <div className='center-inside'>
                    <Checkbox
                      name={`question${index + 1}.answer${i + 1}`}
                      checked={values[`question${index + 1}`][`answer${i + 1}`]}
                      disabled={
                        activityDisabled[`question${index + 1}`][`answer${i + 1}`]
                      }
                      tooltip={
                        activityDisabled[`question${index + 1}`][`answer${i + 1}`]
                          ? 'Opción Bloqueada'
                          : values[`question${index + 1}`][`answer${i + 1}`]
                            ? 'Deseleccionar Opción'
                            : 'Seleccionar Opción'
                      }
                      tooltipOptions={{position:'bottom'}}
                      onChange={ (e) => handleCheckboxField(
                        e.checked,
                        index,
                        `question${index + 1}`,
                        `answer${i + 1}` 
                      )}
                    ></Checkbox>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </>
  )
});
