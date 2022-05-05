import React from 'react';
import classNames from 'classnames';

import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

import { getLetterOfAlphabet } from '../../../../../../../helpers/topic';


export const TopiCreateDuaActivityAnswerApp = React.memo(({
  question,
  index,
  errors,
  setFieldValue,
  handleRemoveActivityAnswer
}) => {

  const handleGetAnswerError = ( intervale, field ) => {
    if (errors['questions'] && errors['questions'][index]) {
      if (
        errors['questions'][index]['answers'] && 
        errors['questions'][index]['answers'][intervale]
      ) {
        if (errors['questions'][index]['answers'][intervale][`${field}`]) {
          return true; 
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  return (
    <>
      {
        question.answers.map( (answer, intervale) => (
          <div className='col-12' key={intervale}>
            <div className='card'>
              <div className='grid p-fluid'>
                <div className='col-12'>
                  <h6 className='text-center'> 
                    Pregunta {index + 1} - 
                    Literal { getLetterOfAlphabet(intervale).toUpperCase() }
                  </h6>
                </div>
                <div className='col-12'>
                  <span className="p-float-label">
                    <InputTextarea
                      id={`questions[${index}].answers[${intervale}].detail`}
                      name={`questions[${index}].answers[${intervale}].detail`}
                      value={answer.detail}
                      className={classNames({ 
                        'p-invalid': handleGetAnswerError( intervale, 'detail' ) 
                      })}
                      onChange={(e) => setFieldValue(
                        `questions[${index}].answers[${intervale}].detail`, e.target.value 
                      )}
                    />
                    <label 
                      htmlFor={`questions[${index}].answers[${intervale}].detail`}
                      className={classNames({ 
                        'p-invalid': handleGetAnswerError( intervale, 'detail' )  })}
                    >Respuesta*</label>
                  </span>
                </div>
                <div className='col-12 mt-2'>
                  <span className="p-float-label">
                    <InputNumber
                      id={`questions[${index}].answers[${intervale}].value`}
                      name= {`questions[${index}].answers[${intervale}].value`}
                      value={answer.value}
                      min={0} max={question.questionValue}
                      step={0.25}
                      showButtons buttonLayout="horizontal"
                      decrementButtonClassName="p-button-danger" 
                      incrementButtonClassName="p-button-primary" 
                      incrementButtonIcon="fas fa-plus" 
                      decrementButtonIcon="fas fa-minus"
                      disabled={question.questionValue === 0}
                      className={classNames({ 
                        'p-invalid': handleGetAnswerError( intervale, 'value' ) })}
                      onValueChange={(e) => setFieldValue(
                        `questions[${index}].answers[${intervale}].value`, e.value 
                      )} 
                    />
                    <label 
                      htmlFor={`questions[${index}].answers[${intervale}].value`}
                      className={classNames({ 
                        'p-invalid': handleGetAnswerError( intervale, 'value' )})}
                      style={{ marginLeft: '2.2em' }}
                    >Valor de Respuesta*</label>
                  </span>
                </div>
                <div className='col-12'>
                  <div className='center-inside'>
                    <Button
                      icon='fas fa-ban'
                      type='submit'
                      tooltip='Eliminar Respuesta'
                      tooltipOptions={{position: 'bottom'}}
                      disabled={question.answers.length < 2}
                      className="p-button-rounded p-button-danger"
                      onClick={() => handleRemoveActivityAnswer( index, intervale )}
                    />
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
