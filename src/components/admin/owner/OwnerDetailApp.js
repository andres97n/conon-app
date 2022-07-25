import React from 'react';

import { Badge } from 'primereact/badge';

import { changeObjectDate } from '../../../helpers/abp-steps';


export const OwnerDetailApp = React.memo(({
  data
}) => {
  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h3 className='text-center'>Detalle de Administrador</h3>
      </div>
      <div className='col-4'>
        <div className='card'>
          <h5 className='text-center'>Nombres y Apellidos</h5>
          <p className='text-center'>{data.person.name}</p>
        </div>
      </div>
      <div className='col-4'>
        <div className='card'>
          <h5 className='text-center'>Nombre de Usuario</h5>
          <p className='text-center'>{data.username}</p>
        </div>
      </div>
      <div className='col-4'>
        <div className='card'>
          <h5 className='text-center'>Correo Electrónico</h5>
          <p className='text-center'>{data.email}</p>
        </div>
      </div>
      <div className='col-4'>
        <div className='card'>
          <h5 className='text-center'>Rol de Usuario</h5>
          <Badge 
            value={
              data.type === 0
                ? ('Administrador')
                : data.type === 1
                  ? ('Docente')
                  : data.type === 2 && (
                    'Estudiante'
                  )
            } 
            size="large" 
          ></Badge>
        </div>
      </div>
      <div className='col-4'>
        <div className='card'>
          <h5 className='text-center'>Es Superusuario</h5>
          <p className='text-center'>
            {
              data.is_superuser
                ? (
                  <i className="fa fa-check-circle fa-lg icon-success" />
                )
                : (
                  <i className="fa fa-times-circle fa-lg icon-danger" />
                )
            }
          </p>
        </div>
      </div>
      <div className='col-4'>
        <div className='card'>
          <h5 className='text-center'>Estado del Registro</h5>
            <div className='center-inside'>
              <Badge
                value={
                  data.is_active
                    ? 'Activo'
                    : 'Inactivo'
                }
                className='ml-3' 
                severity={
                  data.is_active
                    ? ("success")
                    : ('danger')
                }
              ></Badge>
          </div>
        </div>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <Badge
            value={changeObjectDate(data.created_at)}
            className='ml-3' 
            severity='info'
          ></Badge>
        </div>
      </div>
    </div>
  )
});
