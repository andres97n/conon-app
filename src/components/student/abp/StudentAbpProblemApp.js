import React from 'react';
import { Image } from 'primereact/image';
import { Panel } from 'primereact/panel';

import { TopicViewTextEditorApp } from '../editor/TopicViewTextEditorApp';


export const StudentAbpProblemApp = React.memo(({
    currentMethodology
}) => {

    // const createMarkup = () => {
    //     if (currentMethodology) {
    //         return { __html: currentMethodology.problem }
    //     } else {
    //         return { __html: '' }
    //     }
    // }

  return (
    <div className='card'>
        <div className='grid p-fluid'>
            <div className='col-12'>
                <h5>Este es el problema a resolver ...</h5>
            </div>
            <div className='col-12'>
                <TopicViewTextEditorApp 
                    height={'300px'}
                    value={currentMethodology.problem}
                />
                {/* <div dangerouslySetInnerHTML={createMarkup()} /> */}
            </div>
            <div className='col-6'>
                <div className='card'>
                    <div className='col-12'>
                        <h6 className='text-center'>
                            Imagen Descriptiva
                        </h6>
                    </div>
                    <div className='col-12'>
                        {
                            (currentMethodology && currentMethodology.descriptive_image)
                                ? (
                                    <Panel 
                                        header="Visualizar Imagen" 
                                        toggleable 
                                        collapsed={true}
                                    >
                                        <div className="outer">
                                            <div className="inner">
                                                <Image 
                                                    src={currentMethodology.descriptive_image?.path}
                                                    alt="Imagen descriptiva" 
                                                    preview
                                                    width={200}
                                                    className='image-center'
                                                />
                                            </div>
                                        </div>
                                    </Panel>
                                )
                                : (
                                    <small>
                                        No se subió ninguna imagen descriptiva para este tópico.
                                    </small>
                                )
                        }
                    </div>
                </div>
            </div>
            <div className='col-6'>
                <div className='card'>
                    <div className='col-12'>
                        <h6 className='text-center'>
                            Contenido relacionado al problema
                        </h6>
                    </div>
                    <div className='col-12'>
                        {
                            (currentMethodology && currentMethodology.reference_url)
                                ? (
                                    <a 
                                        href={currentMethodology.reference_url} 
                                        target="_blank" 
                                        rel="noreferrer noopener"
                                        className='text-center'
                                    >
                                        <h6>
                                            <i className="fas fa-external-link-alt mr-2"
                                            ></i>
                                            Contenido Externo
                                        </h6>
                                    </a>
                                )
                                : (
                                    <small>
                                        No se subió ningún contenido relacionado 
                                        para este tópico.
                                    </small>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
});
