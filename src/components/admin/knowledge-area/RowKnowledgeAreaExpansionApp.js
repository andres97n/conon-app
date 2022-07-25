import React from 'react';

import { Badge } from 'primereact/badge';

import { changeObjectDate } from '../../../helpers/abp-steps';


export const RowKnowledgeAreaExpansionApp = React.memo(({ knowledgeArea }) => {
  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h3 className='text-center'>Detalle del Área de Conocimiento</h3>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Nombre</h5>
          <p className='text-center'>{knowledgeArea.name}</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Coordinador</h5>
          <p className='text-center'>{knowledgeArea.coordinator.name}</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Subcoordinador</h5>
          <p className='text-center'>{knowledgeArea.sub_coordinator.name}</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Rol de Usuario</h5>
          <Badge 
            value={
              knowledgeArea.type === 1
                ? ('Ciencias Naturales')
                : knowledgeArea.type === 2
                  ? ('Matemáticas')
                  : knowledgeArea.type === 3
                    ? ('Interdisciplinar')
                    : knowledgeArea.type === 4 && ('Otro')
            } 
            size="large" 
          ></Badge>
        </div>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-4'>
            <div className='card'>
              <h5 className='text-center'>Objetivo</h5>
              <p className='text-center'>{knowledgeArea.objective}</p>
            </div>
          </div>
          <div className='col-4'>
            <div className='card'>
              <h5 className='text-center'>Observaciones</h5>
              <p className='text-center'>{
                knowledgeArea.observations
                  ? (knowledgeArea.observations)
                  : ('No existe observaciones')
              }</p>
            </div>
          </div>
          
        </div>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <Badge
            value={changeObjectDate(knowledgeArea.created_at)}
            className='ml-3' 
            severity='info'
          ></Badge>
        </div>
      </div>
    </div>
  )
});
