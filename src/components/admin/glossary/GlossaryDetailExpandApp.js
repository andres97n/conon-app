import React from 'react';

import { Badge } from 'primereact/badge';


export const GlossaryDetailExpandApp = React.memo(({
  term
}) => {
  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h3 className='text-center'>Detalle del Término</h3>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Título</h5>
          <p className='text-center'>{term.title}</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Nombre del Autor</h5>
          <p className='text-center'>{term.owner.name}</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Enlace Referencia</h5>
          <p className='text-center'>{
            term.url
              ? (
                <a 
                  href={term.url} 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className='text-center'
                >
                  <i className="fas fa-external-link-alt ml-2" />
                </a>
              )
              : ('No se ha guardado esta información.')
          }</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Estado del Registro</h5>
          <Badge 
            value={
              term.state === 1
                ? ('Abierto')
                : ('Bloqueado')
            }
            severity={
              term.state === 1 
                ? ('success')
                : ('danger')
            }
            className='ml-2' 
          ></Badge>
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          <h5 className='text-center'>Descripción del Término</h5>
          <p className='text-center'>{term.description}</p>
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          <h5 className='text-center'>Observaciones</h5>
          <p className='text-center'>{
            term.observation
              ? (term.observation)
              : ('No se ha guardado esta información.')
          }</p>
        </div>
      </div>
    </div>
  )
});
