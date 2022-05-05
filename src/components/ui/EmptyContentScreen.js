import React from 'react';

import { Skeleton } from 'primereact/skeleton';


export const EmptyContentScreen = () => {
  return (
    <>
      <div className='col-9'>
        <Skeleton height="2rem" className="p-mb-2 mb-2"></Skeleton>
        <Skeleton height="2rem" className="p-mb-2"></Skeleton>
      </div>
      <div className='col-3'>
        <Skeleton height="2rem" className="p-mb-2 mb-2"></Skeleton>
        <Skeleton height="2rem" className="p-mb-2"></Skeleton>
      </div>
    </>
  )
}
