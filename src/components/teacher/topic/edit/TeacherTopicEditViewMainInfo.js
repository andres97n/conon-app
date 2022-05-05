import React from 'react';

import { Tag } from 'primereact/tag';

import { getMethodologyTypeLabel } from '../../../../helpers/topic/table/topicTableEdit';
import { changeObjectFullDate } from '../../../../helpers/topic/student/ac/acCoordinator';
import { changeObjectDate } from '../../../../helpers/abp-steps';


export const TeacherTopicEditViewMainInfo = React.memo(({
  topic
}) => {

  return (
    <div className='grid p-fluid' >
      <div className='col-12'>
        <div className='card'>
          <div className='grid p-fluid'>
            <div className='col-4'>
              <h5 className='text-center'>
                <i className="fas fa-chalkboard mr-2 icon-black" />
                {topic.classroom.name}
              </h5>
            </div>
            <div className='col-4'>
              <h5 className='text-center'>
                <i className="fas fa-book-open mr-2 icon-success" />
                {topic.asignature.name}
              </h5>
            </div>
            <div className='col-4'>
              <h5 className='text-center'>
                <i className="fas fa-chalkboard-teacher mr-2 icon-secondary" />
                {getMethodologyTypeLabel(topic.type)}
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          <h5 className='text-center'>
            <i className="fas fa-book-reader mr-2 icon-primary" />
            Descripción del Tema de Estudio
          </h5>
          <p className='align-justify'>
            {topic.description}
          </p>
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          <h5 className='text-center'>
            <i className="fas fa-bullseye mr-2 icon-primary" />
            Objetivo del Tema de Estudio
          </h5>
          <p className='align-justify'>
            {topic.objective}
          </p>
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          <h5 className='text-center'>
            <i className="fas fa-bookmark mr-2 icon-primary" />
            Observaciones
          </h5>
          <p className='align-justify'>
            {
              !topic.obsservations
                ? (
                  <small>No existe ninguna observación</small>
                )
                : (
                  topic.observations
                )
            }
          </p>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>
            <i className="fas fa-hourglass-start mr-2 icon-primary" />
            Fecha de Inicialización
          </h5>
          <h6 className='text-center'>{changeObjectFullDate(topic.start_at)}</h6>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <h5 className='text-center'>
            <i className="fas fa-hourglass-end mr-2 icon-warn" />
            Fecha de Finalización
          </h5>
          <h6 className='text-center'>{changeObjectFullDate(topic.end_at)}</h6>
        </div>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <Tag
            value={changeObjectDate(topic.created_at)} 
            icon="far fa-calendar-plus"
            className='mr-2'
          ></Tag>
        </div>
      </div>
    </div>
  )
});
