import React, { useEffect, useRef } from 'react';

import { TopicUploadImageApp } from '../../../../student/upload/TopicUploadImageApp';


export const TopicTeacherImageTabApp = React.memo(({
  schoolData,
  values,
  errors,
  toast,
  setFieldValue
}) => {

  const isMounted = useRef(false);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  return (
    <div className='grid p-fluid'>
      <div className='col-6'>
        <TopicUploadImageApp 
          isMounted={isMounted}
          schoolData={schoolData}
          field={'first_image'}
          value={values?.first_image}
          errorField={'first_image'}
          errors={errors}
          toast={toast}
          setFieldValue={setFieldValue}
        />
      </div>
      <div className='col-6'>
        <TopicUploadImageApp 
          isMounted={isMounted}
          schoolData={schoolData}
          field={'second_image'}
          value={values?.second_image}
          errorField={'second_image'}
          errors={errors}
          toast={toast}
          setFieldValue={setFieldValue}
        />
      </div>
    </div>
  )
});
