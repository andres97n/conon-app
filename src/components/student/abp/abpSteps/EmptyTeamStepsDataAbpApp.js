import React from 'react';

import { Skeleton } from 'primereact/skeleton';


export const EmptyTeamStepsDataAbpApp = () => {
  return (
    <>
      <div className='col-8'>
        <Skeleton className="mb-2" height="2rem"></Skeleton>
        <Skeleton height="2rem"className="p-mb-2"></Skeleton>
      </div>
      <div className='col-4'>
        <Skeleton className="mb-2" height="2rem"></Skeleton>
        <Skeleton height="2rem"className="p-mb-2"></Skeleton>
      </div>
    </>
  )
}
