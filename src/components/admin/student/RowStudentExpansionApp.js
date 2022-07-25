import React from 'react';

import { Chip } from 'primereact/chip';

import { changeObjectDate } from '../../../helpers/abp-steps';


export const RowStudentExpansionApp = React.memo(({ student }) => {
  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h3 className='text-center'>Detalle de Estudiante</h3>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Tipo de Identificación</h5>
          <p className='text-center'>{student.person.identification_type}</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Identificación</h5>
          <p className='text-center'>{student.person.identification}</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Nombres y Apellidos</h5>
          <p className='text-center'>{student.person.name} {student.person.last_name}</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Edad</h5>
          <p className='text-center'>{
            student.person.age
              ? (student.person.age)
              : ('No se ha agregado la edad')
          }</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Género</h5>
          <p className='text-center'>{
            student.person.gender
              ? (student.person.gender)
              : ('No se ha agregado el género')
          }</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Telefóno</h5>
          <p className='text-center'>{
            student.person.phone
              ? (student.person.phone)
              : ('No se ha agregado el télefono')
          }</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Nombre del Representante</h5>
          <p className='text-center'>{
            student.person.representative_name
              ? (student.person.representative_name)
              : ('No se ha agregado el nombre del representante')
          }</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Teléfono del Representante</h5>
          <p className='text-center'>{
            student.person.emergency_contact
              ? (student.person.emergency_contact)
              : ('No se ha agregado el télefono del contacto de emergencia')
          }</p>
        </div>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-3'>
            <div className='card'>
              <h5 className='text-center'>Correo Electrónico</h5>
              <p className='text-center'>{student.user.email}</p>
            </div>
          </div>
          <div className='col-3'>
            <div className='card'>
              <h5 className='text-center'>Nombre de Usuario</h5>
              <p className='text-center'>{student.user.username}</p>
            </div>
          </div>
          <div className='col-3'>
            <div className='card'>
              <h5 className='text-center'>Observaciones</h5>
              <p className='text-center'>{student.observations}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <Chip 
            label={changeObjectDate(student.created_at)}
            icon="fas fa-calendar-check" 
            className='chip-primary'
          />
        </div>
      </div>
    </div>
  )
});
