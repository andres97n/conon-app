import React from 'react';

import { Badge } from 'primereact/badge';

import { changeObjectDate } from '../../../helpers/abp-steps';


export const RowTeacherExpasionTemplate = ({ teacher }) => {
  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h3 className='text-center'>Detalle de Docente</h3>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Tipo de Identificación</h5>
          <p className='text-center'>{teacher.person.identification_type}</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Identificación</h5>
          <p className='text-center'>{teacher.person.identification}</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Nombres y Apellidos</h5>
          <p className='text-center'>{teacher.person.name} {teacher.person.last_name}</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Edad</h5>
          <p className='text-center'>{
            teacher.person.age
              ? (teacher.person.age)
              : ('Este valor no fue registrado')
          }</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Género</h5>
          <p className='text-center'>{
            teacher.person.gender
              ? (teacher.person.gender)
              : ('Este valor no fue registrado')
          }</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Telefóno</h5>
          <p className='text-center'>{
            teacher.person.phone
              ? (teacher.person.phone)
              : ('Este valor no fue registrado')
          }</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Título</h5>
          <p className='text-center'>{
            teacher.title
              ? (teacher.title)
              : ('Este valor no fue registrado')
          }</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Nombre de Usuario</h5>
          <p className='text-center'>{teacher.user.username}</p>
        </div>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-3'>
            <div className='card'>
              <h5 className='text-center'>Correo Electrónico</h5>
              <p className='text-center'>{teacher.user.email}</p>
            </div>
          </div>
          <div className='col-4'>
            <div className='card'>
              <h5 className='text-center'>Objetivo del Docente</h5>
              <p className='text-center'>{
                teacher.objective
                  ? (teacher.objective)
                  : ('Este valor no fue registrado')
              }</p>
            </div>
          </div>
        </div>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <Badge
            value={changeObjectDate(teacher.created_at)}
            className='ml-3' 
            severity='info'
          ></Badge>
        </div>
      </div>
    </div>
  )
}
