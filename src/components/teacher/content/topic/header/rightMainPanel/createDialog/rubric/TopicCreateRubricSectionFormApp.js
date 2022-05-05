import React from 'react';
import classNames from 'classnames';

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Message } from 'primereact/message';

import { getHelpRubricInfoMessage, getRubricValueByPorcent } from '../../../../../../../../helpers/topic/headerRubric';


export const TopicCreateRubricSectionFormApp = React.memo(({
  values,
  field,
  errors,
  rubricObjects,
  defaultObjects,
  setFieldValue
}) => {

  const { title, description, porcent, value } = rubricObjects;
  const { defaultTitle, defaultPorcent } = defaultObjects;

  const handleSetValueDetail = () => {
    if ( getRubricValueByPorcent(
      values.finalValue, values[field][porcent] ) > 0
    ) {
      setFieldValue( 
        `${field}.${value}`, 
        getRubricValueByPorcent( values.finalValue, values[field][porcent] ) 
      );
    } else {
      setFieldValue( `${field}.${value}`, 0 );
    }
  }

  return (
    <div className='grid p-fluid'>
      <div className='field col-12'>
        <Message severity="info" text={getHelpRubricInfoMessage(field)}></Message>
      </div>
      <div className='field col-12 mt-2'>
        <span className="p-float-label">
          <InputText
            id={`${field}.${title}`}
            name={`${field}.${title}`}
            value={values[field][title]}
            className={classNames(
              { 'p-invalid': !!errors[title] }
            )}
            disabled={true}
            onChange={(e) => setFieldValue(`${field}.${title}`, e.target.value)}
          />
          <label 
            htmlFor={`${field}.${title}`}
            className={classNames(
              { 'p-error': !!errors[title] }
            )}
          > Título de Rúbrica*</label>
        </span> 
        {
          values[field][title] === defaultTitle && (
            <small 
              id={`${field}.${title}-help`}
              className="p-d-block"
            >El título ingresado es el recomendado por CONON.</small>
          )
        }
      </div>
      <div className='field col-12'>
        <span className="p-float-label">
          <InputTextarea
            id={`${field}.${description}`}
            name={`${field}.${description}`}
            required rows={3} cols={20} 
            value={values[field][description]}
            onChange={(e) => setFieldValue(`${field}.${description}`, e.target.value)}
          />
          <label htmlFor={`${field}.${description}`}>
            Descripción
          </label>
        </span>
        <small 
          id={`${field}.${description}-help`} 
          className="p-d-block"
        >Ingrese una descripción acerca de esta Rúbrica.</small>
      </div>
      <div className='field col-12'>
        <span className="p-float-label">
          <InputNumber
            id={`${field}.${porcent}`}
            name={`${field}.${porcent}`}
            value={values[field][porcent]} 
            prefix="%"
            step={0.50} min={0} 
            max={
              (field === 'methodology')
                ? (80)
                : (40)
            }
            showButtons buttonLayout="horizontal"
            decrementButtonClassName="p-button-secondary" 
            incrementButtonClassName="p-button-primary" 
            incrementButtonIcon="fas fa-plus" 
            decrementButtonIcon="fas fa-minus" 
            minFractionDigits={0}
            maxFractionDigits={2}
            className={classNames(
              { 'p-invalid': !!errors[porcent] })
            }
            onValueChange={(e) => setFieldValue( `${field}.${porcent}`, e.value )} 
            onBlur={handleSetValueDetail}
          />
          <label 
            htmlFor={`${field}.${porcent}`}
            className={classNames(
              { 'p-error': !!errors[porcent]}
            )}
            style={{ marginLeft: '2.2em' }}
          >Porcentaje de la Nota*</label>
        </span>
        {
          values[field][porcent] === defaultTitle && (
            <small 
              id={`${field}.${title}-help`}
              className="p-d-block"
            >El porcentaje recomendado es el {defaultPorcent}%.</small>
          )
        }
      </div>
      <div className='field col-12'>
        <span className="p-float-label">
          <InputNumber
            name={`${field}.${value}`}
            value={values[field][value]}
            disabled={true}
            className={classNames(
              { 'p-invalid': !!errors[value] })
            }
          />
          <label 
            htmlFor={`${field}.${value}`}
            className={classNames(
              { 'p-error': !!errors[value]}
            )}
            style={{ marginLeft: '2.2em' }}
          >Valor de la Rúbrica*</label>
        </span>
        <small 
          id={`${field}.${value}-help`} 
          className="p-d-block"
          style={{textAlign:'justify'}}
        >
          El valor ingresado se generará automáticamente entre el 
          valor Final y el presente porcentaje.
        </small>
      </div>
    </div>
  )
});
