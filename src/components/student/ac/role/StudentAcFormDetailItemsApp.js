import React, { useState } from 'react';
import classNames from 'classnames';

import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Message } from 'primereact/message';


export const StudentAcFormDetailItemsApp = React.memo(({
  acContainer,
  errors,
  field,
  maxItems,
  placeholder,
  buttonLabelAdd,
  buttonLabelRemove,
  setFieldValue,
}) => {
  
  const [itemCount, setItemCount] = useState(1);

  const handleAddItem = () => {
    setFieldValue(field, [
      ...acContainer,
      { item: '' },
    ]);
    setItemCount(oldState => oldState + 1);
  }

  const handleRemoveItem = ( intervale ) => {
    const newAcContainer = acContainer.filter( 
      (question, index) => index !== intervale);
      setFieldValue(field, [ ...newAcContainer ]);
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
              text={getErrorMessage(errors[field])} 
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
                  <span className="p-float-label mt-3">
                    <InputTextarea
                      id={`${field}[${index}].item`}
                      name={`${field}[${index}].item`}
                      value={data.item}
                      required rows={3} cols={20}
                      placeholder={placeholder}
                      className={classNames({ 
                        'p-invalid': (errors[field] && 
                          errors[field][index]) &&
                          Object.keys(errors[field][index]).length > 0
                      })}
                      onChange={(e) => 
                        setFieldValue(`${field}[${index}].item`, e.target.value)
                      }
                    />
                  </span>
                </div>
              </div>
              <div className='col-1'>
                <div className='center-vertically'>
                  <Button
                    icon='fas fa-trash'
                    tooltip={buttonLabelRemove}
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
            label={buttonLabelAdd} 
            icon='fas fa-plus'
            disabled={itemCount >= maxItems}
            className="p-button-raised p-button-primary " 
            onClick={handleAddItem}
          />
        </div>
      </div>
    </>
  )
});
