import React from 'react';

import { Badge } from 'primereact/badge';

import { changeObjectDate } from '../../../helpers/abp-steps';


export const RowSchoolPeriodExpansionApp = React.memo(({ schoolPeriod }) => {
  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h3 className='text-center'>Detalle del Período Lectivo</h3>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Nombre</h5>
          <p className='text-center'>{schoolPeriod.name}</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Inicio de Período</h5>
          <p className='text-center'>{changeObjectDate(schoolPeriod.init_date)}</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Fin de Período</h5>
          <p className='text-center'>{changeObjectDate(schoolPeriod.end_date)}</p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>Finalización de Clases</h5>
          <p className='text-center'>{changeObjectDate(schoolPeriod.school_end_date)}</p>
        </div>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-4'>
            <div className='card'>
              <h5 className='text-center'>Observaciones</h5>
              <p className='text-center'>{schoolPeriod.observations}</p>
            </div>
          </div>
          <div className='col-3'>
            <div className='card'>
              <h5 className='text-center'>Estado del Período Lectivo</h5>
                <div className='center-inside'>
                  <Badge
                    value={
                      schoolPeriod.state === 1
                        ? 'Activo'
                        : 'Bloqueado'
                    }
                    className='ml-3' 
                    severity={
                      schoolPeriod.state === 1
                        ? ("success")
                        : ('danger')
                    }
                  ></Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <Badge
            value={changeObjectDate(schoolPeriod.created_at)}
            className='ml-3' 
            severity='info'
          ></Badge>
        </div>
      </div>
    </div>
  )
});
