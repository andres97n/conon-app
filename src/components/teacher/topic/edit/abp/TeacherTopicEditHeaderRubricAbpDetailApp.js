import React from 'react';

import { Accordion, AccordionTab } from 'primereact/accordion';


export const TeacherTopicEditHeaderRubricAbpDetailApp = React.memo(({
  sections
}) => {
  return (
    <>
      <div className='col-12'>
        <h5 className='text-center'>Secciones Agregadas</h5>
      </div>
      <div className='col-12'>
        <div className='card'>
          <Accordion>
            {
              sections.map( section => (
                <AccordionTab
                  key={section.id}
                  header={section.title_detail}
                >
                  <div className='grid p-fluid'>
                    <div className='col-12'>
                      <h5 className='text-center'>
                        {section.title_detail}
                      </h5>
                    </div>
                    <div className='col-12'>
                      <h5 className='text-center'>Descripción</h5>
                      {
                        !section.description_detail
                          ? (
                            <small>No existe ninguna descripción sobre esta sección.</small>
                          )
                          : (
                            <p className='align-justify'>{section.description_detail}</p>
                          )
                      }
                    </div>
                    <div className='col-6'>
                      <h5 className='text-center'>Porcentaje de la Nota</h5>
                      <h4 className='text-center'>{section.grade_percentage}</h4>
                    </div>
                    <div className='col-6'>
                      <h5 className='text-center'>Nota de la Sección</h5>
                      <h4 className='text-center'>{section.rating_value}</h4>
                    </div>
                  </div>
                </AccordionTab>
              ))
            }
          </Accordion>
        </div>
      </div>
    </>
  )
});
