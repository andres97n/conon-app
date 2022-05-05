import React from 'react';
import classNames from 'classnames';
import { addLocale } from 'primereact/api';

import { Calendar } from 'primereact/calendar';

import { getCalendarLocalLanguage } from '../../../../../helpers/profile';


export const TopicTeacherCalendarFormApp = React.memo(({
  values,
  errors,
  setFieldValue
}) => {

  addLocale('es', getCalendarLocalLanguage());

  return (
    <>
      <div className="field col-6">
        <span className="p-float-label">
          <Calendar 
            id="start_at" 
            name='start_at'
            value={values.start_at} 
            locale="es" 
            showIcon 
            showTime 
            touchUI
            icon='fas fa-calendar-alt'
            className={classNames({ 'p-invalid': errors['start_at'] })} 
            onChange={(e) => setFieldValue('start_at', e.value)} 
          />
          <label 
            htmlFor='start_at'
            className={classNames({ 'p-error': errors['start_at'] })}
          >Fecha de Inicio*</label>
        </span>
      </div>
      <div className="field col-6">
        <span className="p-float-label">
          <Calendar 
            id="end_at" 
            name='end_at'
            value={values.end_at} 
            locale="es" 
            showIcon 
            showTime 
            touchUI
            icon='fas fa-calendar-alt'
            className={classNames({ 'p-invalid': errors['end_at'] })} 
            onChange={(e) => setFieldValue('end_at', e.value)} 
          />
          <label 
            htmlFor='end_at'
            className={classNames({ 'p-error': errors['end_at'] })}
          >Fecha de Cierre*</label>
        </span>
      </div>
    </>
  )
});
