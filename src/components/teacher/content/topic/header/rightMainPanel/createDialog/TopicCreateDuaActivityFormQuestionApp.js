import React from 'react';
import classNames from 'classnames';

import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';


export const TopicCreateDuaActivityFormQuestionApp = React.memo(({
  question,
  index,
  errors,
  setFieldValue
}) => {

  return (
    <>
      <div className='col-12'>
        <span className="p-float-label p-input-icon-left">
          <i className="fas fa-question-circle"></i>
          <InputText
            id={`questions[${index}].title`}
            name={`questions[${index}].title`}
            value={question.title}
            className={classNames({ 
              'p-invalid': (errors['questions'] && errors['questions'][index]) &&
              errors['questions'][index]['title'] 
            })}
            onChange={(e) => 
              setFieldValue( `questions[${index}].title`, e.target.value )
            }
          />
          <label 
            htmlFor={`questions[${index}].title`}
            className={classNames({ 
              'p-invalid': (errors['questions'] && errors['questions'][index]) && 
              errors['questions'][index]['title'] 
            })}
          > Pregunta {index + 1}*</label>
        </span>
      </div>
      <div className='col-12 mt-3'>
        <span className="p-float-label">
          <InputNumber
            id={`questions[${index}].questionValue`}
            name= {`questions[${index}].questionValue`}
            value={question.questionValue}
            min={0} max={100}
            step={0.25}
            showButtons buttonLayout="horizontal"
            decrementButtonClassName="p-button-danger" 
            incrementButtonClassName="p-button-primary" 
            incrementButtonIcon="fas fa-plus" 
            decrementButtonIcon="fas fa-minus" 
            className={classNames({ 
              'p-invalid': (errors['questions'] && errors['questions'][index]) && 
              errors['questions'][index]['questionValue'] 
            })}
            onValueChange={(e) => 
              setFieldValue( `questions[${index}].questionValue`, e.value )
            }
          />
          <label 
            htmlFor={`questions[${index}].questionValue`}
            className={classNames({ 
              'p-invalid': (errors['questions'] && errors['questions'][index]) &&
              errors['questions'][index]['questionValue']
            })}
            style={{ marginLeft: '2.2em' }}
          >Valor de Pregunta*</label>
        </span>
      </div>
    </>
  )
});
