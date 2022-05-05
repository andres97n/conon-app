import React from 'react';

import { Accordion, AccordionTab } from 'primereact/accordion';


export const TeacherTopicEditHeaderRubricAcDetailApp = React.memo(({
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
                  header={section.detail_title}
                >
                  <div className='grid p-fluid'>
                    <div className='col-12'>
                      <h5 className='text-center'>
                        {section.detail_title}
                      </h5>
                    </div>
                    <div className='col-12'>
                      <h5 className='text-center'>Descripción</h5>
                      {
                        !section.detail_description
                          ? (
                            <small>No existe ninguna descripción sobre esta sección.</small>
                          )
                          : (
                            <p className='align-justify'>{section.detail_description}</p>
                          )
                      }
                    </div>
                    <div className='col-6'>
                      <h5 className='text-center'>Porcentaje de la Nota</h5>
                      <h4 className='text-center'>{section.percentage_grade}</h4>
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
