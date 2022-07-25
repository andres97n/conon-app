import React from 'react';

import { Badge } from 'primereact/badge';


export const AdminStateTableApp = React.memo(({ data }) => {
  return (
    <Badge
      value={
        data.state === 1
          ? ('Activo')
          : ('Bloqueado')
      }
      className='ml-2' 
      severity={
        data.state === 1 
          ? ('success')
          : ('danger')
      }
    ></Badge>
  )
});
