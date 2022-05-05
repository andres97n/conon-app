import React, { useState } from 'react';
import classNames from 'classnames';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';


export const StudentAcQuestionFormDetailApp = React.memo(({
  acContainer,
  errors,
  setFieldValue,
}) => {
  
  const [itemCount, setItemCount] = useState(1);

  const handleAddItem = () => {
    setFieldValue('questions', [
      ...acContainer,
      { item: '' },
    ]);
    setItemCount(oldState => oldState + 1);
  }

  const handleRemoveItem = ( intervale ) => {
    const newAcContainer = acContainer.filter( 
      (question, index) => index !== intervale);
      setFieldValue('questions', [ ...newAcContainer ]);
      setItemCount(oldState => oldState - 1);
  };

  const getErrorMessage = ( errors ) => {
    let error = '';
    errors.forEach( data => {
      if (Object.keys(data).length > 0) {
        error = data.item;
      }
    });
    return error;
  };

  return (
    <>
      {
        Object.keys(errors).length > 0 && (
          <div className='col-12'>
            <Message
              severity="error" 
              text={getErrorMessage(errors['questions'])} 
            />
          </div>
        )
      }
      {
        acContainer.map( (data, index) => (
          <div className='col-12' key={index}>
            <div className='grid p-fluid'>
              <div className='col-11'>
                <div className='card'>
                  <span className="p-float-label p-input-icon-left mt-3">
                    <i className="far fa-question-circle" />
                    <InputText 
                      id={`questions[${index}].item`}
                      name={`questions[${index}].item`}
                      value={data.item}
                      className={classNames({ 
                        'p-invalid': (errors['questions'] && 
                          errors['questions'][index]) &&
                          Object.keys(errors['questions'][index]).length > 0
                      })} 
                      onChange={(e) => 
                        setFieldValue(`questions[${index}].item`, e.target.value)
                      }/>
                  <label htmlFor={`questions[${index}].item`}>
                    Ingrese una pregunta*
                  </label>
                  </span>
                </div>
              </div>
              <div className='col-1'>
                <div className='center-vertically'>
                  <Button
                    icon='fas fa-trash'
                    tooltip='Eliminar Pregunta'
                    tooltipOptions={{position: 'bottom'}}
                    disabled={acContainer.length === 1}
                    className="p-button-raised p-button-danger" 
                    onClick={() => handleRemoveItem(index)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      }
      <div className='col-12'>
        <div className='center-inside'>
          <Button
            label='Agregar Pregunta' 
            icon='fas fa-plus'
            disabled={itemCount >= 4}
            className="p-button-raised p-button-primary " 
            onClick={handleAddItem}
          />
        </div>
      </div>
    </>
  )
});
