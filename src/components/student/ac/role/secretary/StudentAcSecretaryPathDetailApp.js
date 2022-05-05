import React, { useState } from 'react';
import classNames from 'classnames';

import { Message } from 'primereact/message';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';


export const StudentAcSecretaryPathDetailApp = React.memo(({
  acContainer,
  errors,
  setFieldValue,
}) => {
  
  const [itemCount, setItemCount] = useState(1);

  const handleAddItem = () => {
    setFieldValue('secretaryPaths', [
      ...acContainer,
      { item: '' },
    ]);
    setItemCount(oldState => oldState + 1);
  }

  const handleRemoveItem = ( intervale ) => {
    const newAcContainer = acContainer.filter( 
      (question, index) => index !== intervale);
      setFieldValue('secretaryPaths', [ ...newAcContainer ]);
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
              text={getErrorMessage(errors['secretaryPaths'])} 
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
                    <i className="fas fa-link" />
                    <InputText
                      id={`secretaryPaths[${index}].item`}
                      name={`secretaryPaths[${index}].item`}
                      value={data.item}
                      className={classNames({ 
                        'p-invalid': (errors['secretaryPaths'] && 
                          errors['secretaryPaths'][index]) &&
                          Object.keys(errors['secretaryPaths'][index]).length > 0
                      })} 
                      onChange={(e) => 
                        setFieldValue(`secretaryPaths[${index}].item`, e.target.value)
                      }/>
                  <label htmlFor={`secretaryPaths[${index}].item`}>
                    Ingrese un enlace*
                  </label>
                  </span>
                </div>
              </div>
              <div className='col-1'>
                <div className='center-vertically'>
                  <Button
                    icon='fas fa-trash'
                    tooltip='Eliminar Enlace'
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
            label='Agregar Enlace' 
            icon='fas fa-plus'
            disabled={itemCount >= 20}
            className="p-button-raised p-button-primary " 
            onClick={handleAddItem}
          />
        </div>
      </div>
    </>
  )
});
