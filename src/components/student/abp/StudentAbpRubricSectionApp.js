import React from 'react';

export const StudentAbpRubricSectionApp = React.memo(({
    currentRubric
}) => {
  return (
    <>
        <div className='col-12'>
            <h5 className='text-center'>
                <i className="fas fa-tasks mr-2"></i>
                Secciones de la Rúbrica
            </h5>
        </div>
        {
            currentRubric && currentRubric.map((section, index) => (
                <div className='col-6' key={index}>
                    <div className='col-12'>
                        <div className='card'>
                            <h6 className='text-center'>
                                <i className="fas fa-check mr-2"></i>
                                {section.rubric_detail_abp.title}
                            </h6>
                            <p className='align-justify'>
                                {section.rubric_detail_abp.description}
                            </p>
                            <div className='grid p-fluid'>
                                <div className='col-6'>
                                    <h5>
                                        <i className="fas fa-percentage mr-2"></i>
                                        {section.rubric_detail_abp.grade_percentage}
                                    </h5>
                                </div>
                                <div className='col-6'>
                                    <h5 className='text-end'>
                                        <i className="fas fa-clipboard-check mr-2"></i>
                                        {section.rubric_detail_abp.rating_value}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        }
    </>
  )
})
