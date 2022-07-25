import React from 'react';

import { Badge } from 'primereact/badge';

import { changeObjectDate } from '../../helpers/abp-steps';


export const AdminDateTableApp = React.memo(({ data }) => {
  return (
    <Badge 
      value={ changeObjectDate(data.created_at) }
      severity='info'
    ></Badge>
  )
});
