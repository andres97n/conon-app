import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { AcHelperScreen } from '../helper/methodology/AcHelperScreen';

export const MethodologySuggestionsScreen = () => {
  return (
    <div className="grid p-fluid">
        <div className='col-12'>
            <h3 className='text-center'>Conozca sobre las Metodologías aplicadas en CONON</h3>
        </div>
        <div className="col-12">
            <Accordion>
                <AccordionTab 
                    header={
                        <React.Fragment>
                            <i className="far fa-file-alt mr-1"></i>
                            <span>Diseño Universal de Aprendizaje (DUA)</span>
                        </React.Fragment>
                    }
                >
                    <div className='col-12'>
                        <h5 className='text-center mt-3'>
                            ¿Qué es DUA?
                        </h5>
                    </div>
                    <div className='col-12'>
                        <p style={{textAlign: 'justify'}} >
                            Es un enfoque basado en la investigación para el diseño del currículo ―es 
                            decir, objetivos educativos, métodos, materiales y evaluación― que permite 
                            a todas las personas desarrollar conocimientos, habilidades y motivación e 
                            implicación con el aprendizaje; esta metodología ha sido desarrollado por el 
                            Centro de Tecnología Especial Aplicada, CAST.
                        </p>
                        <p 
                            style={{textAlign: 'justify'}} 
                            className='mt-2'
                        >
                            La propuesta del CAST pasa por dotar de mayor flexibilidad al currículo, a los
                            medios y a los materiales, de modo que todo el alumnado pueda acceder al
                            aprendizaje. Hacer esto es más posible ahora que hace unos años si se utilizan
                            las TIC (Tecnologías de la Información y la Comunicación) de forma activa en
                            el proceso de enseñanza-aprendizaje, debido a las características de
                            flexibilidad y versatilidad que poseen los medios digitales.
                            Apoyándose en las evidencias neurocientíficas que explican cómo funciona el
                            cerebro al aprender y en la oportunidad que ofrecen los medios digitales, el
                            DUA propone un marco práctico de aplicación en el aula que se organiza en
                            tres principios. En torno a ellos se configuran diferentes pautas de aplicación
                            que los docentes pueden usar en el aula y a la hora de diseñar sus clases.
                        </p>
                    </div>
                </AccordionTab>
                <AccordionTab 
                    header={
                        <React.Fragment>
                            <i className="far fa-file-alt mr-1"></i>
                            <span>Aprendizaje Basado en Problemas (ABP)</span>
                        </React.Fragment>
                    }
                >
                    <div className='col-12'>
                        <h5 className='text-center mt-3'>
                            ¿Qué es el ABP?
                        </h5>
                    </div>
                    <div className='col-12'>
                        <p style={{textAlign:'justify'}}>
                            Barrows (1986) define al ABP como “un método de aprendizaje basado en el principio de 
                            usar problemas como punto de partida para la adquisición e integración de los nuevos 
                            conocimientos”. Desde que fue propuesto en la Escuela de Medicina de la Universidad de 
                            McMaster, el ABP ha ido evolucionando y adaptándose a las necesidades de las diferentes 
                            áreas en las que fue adoptado, lo cual ha implicado que sufra muchas variaciones con 
                            respecto a la propuesta original. Sin embargo, sus características fundamentales, 
                            que provienen del modelo desarrollado en McMaster, son las siguientes (Barrows, 1996): 
                        </p>
                        <i style={{textAlign:'justify'}}>
                            El aprendizaje está centrado en el alumno.
                        </i>
                        <p style={{textAlign:'justify'}}>
                            Bajo la guía de un tutor, los estudiantes deben tomar la responsabilidad de su propio aprendizaje, 
                            identificando lo que necesitan conocer para tener un mejor entendimiento y manejo del problema 
                            en el cual están trabajando, y determinando dónde conseguir la información necesaria 
                            (libros, revistas, profesores, internet, etc.). Los profesores de la facultad se 
                            convierten en consultores de los estudiantes. De esta manera se permite que cada 
                            estudiante personalice su aprendizaje, concentrándose en las áreas de conocimiento 
                            o entendimiento limitado y persiguiendo sus áreas de interés.
                        </p>
                    </div>
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
  )
};
