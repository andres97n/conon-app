import React from 'react';

import { Badge } from 'primereact/badge';

import { changeObjectDate } from '../../../helpers/abp-steps';


export const RowAsignatureExpansionApp = React.memo(({ asignature }) => {
  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h3 className='text-center'>Detalle de Asignatura</h3>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Nombre</h5>
          <p className='text-center'>{asignature.name}</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Área de Conocimiento</h5>
          <p className='text-center'>{asignature.knowledge_area.name}</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Coordinador</h5>
          <p className='text-center'>{asignature.knowledge_area.coordinator}</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Estado de la Asignatura</h5>
          <Badge 
            value={
              asignature.state === 1
                ? ('Abierto')
                : ('Bloqueado')
            }
            severity={
              asignature.state === 1 
                ? ('success')
                : ('danger')
            }
            className='ml-2' 
          ></Badge>
        </div>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-4'>
            <div className='card'>
              <h5 className='text-center'>Objetivo</h5>
              <p className='text-center'>{asignature.objective}</p>
            </div>
          </div>
          <div className='col-4'>
            <div className='card'>
              <h5 className='text-center'>Observaciones</h5>
              <p className='text-center'>{
                asignature.observations
                  ? (asignature.observations)
                  : ('No existe observaciones')
              }</p>
            </div>
          </div>
        </div>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <Badge
            value={changeObjectDate(asignature.created_at)}
            className='ml-3' 
            severity='info'
          ></Badge>
        </div>
      </div>
    </div>
  )
});
