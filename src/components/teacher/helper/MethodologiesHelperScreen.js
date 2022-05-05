import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { DuaHelperScreen } from './methodology/DuaHelperScreen';
import { AbpHelperScreen } from './methodology/AbpHelperScreen';
import { AcHelperScreen } from './methodology/AcHelperScreen';

export const MethodologiesHelperScreen = () => {
    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className='card'>
                
                <div className='field col-12 text-center'>
                    <i className="fas fa-info-circle fa-3x icon-primary" />
                    <h2>
                        Conozca más sobre las Metodologías Aplicadas en CONON
                    </h2>
                </div>

                <div className='field col-12'>
                    <Accordion activeIndex={0}>
                        {/* <AccordionTab header="Diseño Universal de Aprendizaje (DUA)"> */}
                        <AccordionTab 
                            header={
                                <React.Fragment>
                                    <i className="far fa-file-alt mr-1"></i>
                                    <span>Diseño Universal de Aprendizaje (DUA)</span>
                                </React.Fragment>
                            }
                        >
                            <DuaHelperScreen />
                        </AccordionTab>
                        {/* <AccordionTab header="Aprendizaje Basado en Problemas (ABP)"> */}
                        <AccordionTab 
                            header={
                                <React.Fragment>
                                    <i className="far fa-file-alt mr-1"></i>
                                    <span>Aprendizaje Basado en Problemas (ABP)</span>
                                </React.Fragment>
                            }
                        >
                            <AbpHelperScreen />
                        </AccordionTab>
                        {/* <AccordionTab header="Aprendizaje Cooperativo (AC)"> */}
                        <AccordionTab 
                            header={
                                <React.Fragment>
                                    <i className="far fa-file-alt mr-1"></i>
                                    <span>Aprendizaje Cooperativo (AC)</span>
                                </React.Fragment>   
                            }
                        >
                            <AcHelperScreen />
                        </AccordionTab>
                    </Accordion>
                </div>

                </div>
            </div>
        </div>
    )
}
