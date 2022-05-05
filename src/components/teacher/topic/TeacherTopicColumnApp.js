import React from 'react';

import { Badge } from 'primereact/badge';

import { changeObjectDate } from '../../../helpers/abp-steps';


export const TeacherTopicColumnApp = React.memo(({
  topic,
  field
}) => {
  return (
    <>
      {
        field === 'active'
          ? (
            <Badge 
              value={
                topic.active
                  ? 'Activo'
                  : 'Inactivo'
              }
              className='ml-3' 
              severity={
                topic.active
                  ? ("success")
                  : ('danger')
              }
            ></Badge>
          )
          : field === 'type'
            ? (
              <Badge
                value={
                  topic.type === 1
                    ? 'DUA'
                    : topic.type === 2
                        ? 'ABP'
                        : topic.type === 3 &&
                            'AC'
                }
                className='ml-3' 
                severity='primary'
                size='large'
              ></Badge>
            )
            : (
              <Badge
                value={changeObjectDate(topic.created_at)}
                className='ml-3' 
                severity='info'
              ></Badge>
            )
      }
    </>
  )
});
