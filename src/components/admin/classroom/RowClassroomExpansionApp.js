import React from 'react';

import { Badge } from 'primereact/badge';

import { changeObjectDate } from '../../../helpers/abp-steps';


export const RowClassroomExpansionApp = React.memo(({ classroom }) => {
  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h3 className='text-center'>Detalle de Aula</h3>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Nombre</h5>
          <p className='text-center'>{classroom.name}</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Período Lectivo</h5>
          <p className='text-center'>{classroom.school_period.name}</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Nivel del Curso</h5>
          <Badge 
            value={
                classroom.curse_level === 1
                    ? 'Primero'
                    : classroom.curse_level === 2
                        ? 'Segundo'
                        : classroom.curse_level === 3 && ('Tercero')
            } 
            severity={
                classroom.curse_level === 1
                    ? 'primary'
                    : classroom.curse_level === 2
                        ? 'warning'
                        : classroom.curse_level === 3 && ('success')
            }
        ></Badge>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Capacidad del Aula</h5>
          <p className='text-center'>{classroom.capacity}</p>
        </div>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-3'>
            <div className='card'>
              <h5 className='text-center'>Estado del Aula</h5>
              <Badge 
                value={
                  classroom.state === 1
                    ? 'Abierto'
                    : 'Bloqueado'
                } 
                severity={
                  (classroom.state === 1)
                    ? ("success")
                    : ('danger')
                }
              ></Badge>
            </div>
          </div>
        </div>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <Badge
            value={changeObjectDate(classroom.created_at)}
            className='ml-3' 
            severity='info'
          ></Badge>
        </div>
      </div>
    </div>
  )
});
