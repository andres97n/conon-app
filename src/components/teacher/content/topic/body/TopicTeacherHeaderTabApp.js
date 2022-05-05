import React from 'react';
import { useSelector } from 'react-redux';


export const TopicTeacherHeaderTabApp = React.memo(({
  classroomName,
  asignatureName,
  methodologyName,
}) => {

  const { name } = useSelector(state => state.auth);

  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h4 className='text-center'>
          <i className="fas fa-chalkboard-teacher mr-2 icon-primary" />
          { name }
        </h4>
      </div>
      <div className='col-4'>
        <h5 className='text-center'>
          <i className="fas fa-chalkboard mr-2 icon-primary" />
          { classroomName }
        </h5>
      </div>
      <div className='col-4'>
        <h5 className='text-center'>
          <i className="fas fa-book mr-2 icon-primary" />
          { asignatureName }
        </h5>
      </div>
      <div className='col-4'>
        <h5 className='text-center'>
          <i className="fas fa-book-reader mr-2 icon-primary" />
          { methodologyName }
        </h5>
      </div>
    </div>
  )
});
