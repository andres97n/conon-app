import React from 'react';
import { Panel } from 'primereact/panel';
import { ScrollPanel } from 'primereact/scrollpanel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export const AbpHelperScreen = () => {
    return (
        <div className="p-grid">

            <div className='p-col-12'>
                <Panel header="Introducción" toggleable collapsed>
                    <ScrollPanel style={{width:'100%', height:'250px'}}>
                        <h5 className='text-center mt-3'>
                            Nacimiento del ABP 
                            <a
                                href='http://148.202.167.116:8080/xmlui/bitstream/handle/123456789/574/Aprendizaje%20basado%20en%20problemas.pdf?sequence=1&isAllowed=y'
                                target={'_blank'}
                                rel='noreferrer'
                            >
                                <i className="fas fa-external-link-alt ml-2"></i>
                            </a>
                        </h5>
                        <p style={{textAlign:'justify'}}>
                            En las décadas de los 60’s y 70’s un grupo de educadores médicos de la Universidad de 
                            McMaster (Canadá) reconoció la necesidad de replantear tanto los contenidos como la 
                            forma de enseñanza de la medicina, con la finalidad de conseguir una mejor preparación 
                            de sus estudiantes para satisfacer las demandas de la práctica profesional. 
                            La educación médica, que se caracterizaba por seguir un patrón intensivo de clases 
                            expositivas de ciencia básica, seguido de un programa exhaustivo de enseñanza clínica, 
                            fue convirtiéndose gradualmente en una forma inefectiva e inhumana de preparar estudiantes, 
                            en vista del crecimiento explosivo de la información médica y las nuevas tecnologías, 
                            además de las demandas rápidamente cambiantes de la práctica profesional. 
                            Era evidente, para estos educadores, que el perfil de sus egresados requería habilidades 
                            para la solución de problemas, lo cual incluía la habilidad para adquirir información, 
                            sintetizarla en posibles hipótesis y probar esas hipótesis a través de la adquisición 
                            de información adicional. Ellos denominaron a este proceso como de Razonamiento 
                            Hipotético Deductivo.
                        </p>
                        <h5 className='text-center mt-3'>
                            ¿Por qué cambiar?
                            <a
                                href='http://148.202.167.116:8080/xmlui/bitstream/handle/123456789/574/Aprendizaje%20basado%20en%20problemas.pdf?sequence=1&isAllowed=y' 
                                target={'_blank'}
                                rel='noreferrer'
                            >
                                <i className="fas fa-external-link-alt ml-2"></i>
                            </a>
                        </h5>
                        <p style={{textAlign: 'justify'}} >
                            En las últimas décadas hemos sido testigos de los grandes cambios producidos en casi 
                            todos los aspectos de nuestra vida: la manera como nos comunicamos, se dirigen los 
                            negocios, se accede a la información y se utiliza la tecnología, son ejemplos claros. 
                            Actualmente nuestros estudiantes deben prepararse para incorporarse a un entorno 
                            laboral muy diferente al que existía hace solo diez años atrás. Los problemas que 
                            estos futuros profesionales deberán enfrentar cruzan las fronteras de las disciplinas 
                            y demandan enfoques innovadores y habilidades para la resolución de problemas complejos.
                        </p>
                        <p style={{textAlign: 'justify'}} >
                            En junio de 1994 se llevó a cabo la Conferencia de Wingspread, en donde como conclusiones 
                            finales determinaron lo siguiente:
                        </p>
                        <ul style={{listStyleType: 'square'}}>
                            <li>
                                <p style={{textAlign:'justify'}}>
                                    Habilidades de alto nivel en comunicación, computación, manejo tecnológico y 
                                    búsqueda de información, que permitan al individuo obtener y aplicar los nuevos 
                                    conocimientos y habilidades cuando se requiera.
                                </p>
                            </li>
                            <li>
                                <p style={{textAlign:'justify'}}>
                                    Capacidad para llegar a juicios y conclusiones sustentadas, lo cual significa 
                                    definir efectivamente los problemas; recoger y evaluar la información relativa a 
                                    esos problemas y desarrollar soluciones.
                                </p>
                            </li>
                            <li>
                                <p style={{textAlign:'justify'}}>
                                    Capacidad de funcionar en una comunidad global a través de la posesión de actitudes y 
                                    disposiciones que incluyen la flexibilidad y adaptabilidad; la valoración de la diversidad; 
                                    la motivación y la persistencia; conducta ética y ciudadana; creatividad e ingenio y 
                                    la capacidad para trabajar con otros, especialmente en equipo.
                                </p>
                            </li>
                            <li>
                                <p style={{textAlign:'justify'}}>
                                    Competencia técnica en un campo determinado.
                                </p>
                            </li>
                            <li>
                                <p style={{textAlign:'justify'}}>
                                    Demostrada capacidad para desplegar todas las características anteriores para enfrentar 
                                    problemas específicos en situaciones reales y complejas, en los que se requiera 
                                    desarrollar soluciones viables.
                                </p>
                            </li>
                        </ul>
                        <p style={{textAlign:'justify'}}>
                            La enseñanza tradicional muy difícilmente contribuye a desarrollar estas habilidades, capacidades 
                            y competencias en los estudiantes. Es evidente entonces la necesidad de cambio en la concepción 
                            del proceso de enseñanza-aprendizaje, sin que esto signifique que la clase expositiva deje de 
                            ser eficiente. Se trata simplemente de complementar la adquisición de contenidos con el 
                            desarrollo de habilidades, capacidades y actitudes indispensables en el entorno profesional 
                            actual.
                        </p>
                    </ScrollPanel>
                </Panel>
            </div>

            <div className='p-col-12'>
                <Panel header="Definición" toggleable collapsed>
                    <ScrollPanel style={{width:'100%', height:'250px'}}>
                        <h5 className='text-center mt-3'>
                            ¿Qué es el ABP?
                            <a
                                href='http://148.202.167.116:8080/xmlui/bitstream/handle/123456789/574/Aprendizaje%20basado%20en%20problemas.pdf?sequence=1&isAllowed=y'
                                target={'_blank'}
                                rel='noreferrer'
                            >
                                <i className="fas fa-external-link-alt ml-2"></i>
                            </a>
                        </h5>
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
                        <i style={{textAlign:'justify'}}>
                            El aprendizaje se produce en grupos pequeños de estudiantes.
                        </i>
                        <p style={{textAlign:'justify'}}>
                            En la mayoría de las primeras escuelas de medicina que implementaron el ABP, los 
                            grupos de trabajo fueron conformados por 5 a 8 ó 9 estudiantes. Al finalizar 
                            cada unidad curricular los estudiantes cambiaban aleatoriamente de grupo y 
                            trabajaban con un nuevo tutor. Esto les permitía adquirir práctica en el trabajo 
                            intenso y efectivo, con una variedad de diferentes personas.
                        </p>
                        <i style={{textAlign:'justify'}}>
                            Los profesores son facilitadores o guías.
                        </i>
                        <p style={{textAlign:'justify'}}>
                            En McMaster el facilitador del grupo se denominaba tutor. El rol del tutor se 
                            puede entender mejor en términos de comunicación metacognitiva. El tutor 
                            plantea preguntas a los estudiantes que les ayude a cuestionarse y encontrar 
                            por ellos mismos la mejor ruta de entendimiento y manejo del problema. 
                            Eventualmente los estudiantes asumen este rol ellos mismos, exigiéndose así unos 
                            a otros. 
                        </p>
                        <i style={{textAlign:'justify'}}>
                            Los problemas forman el foco de organización y estímulo para el aprendizaje.
                        </i>
                        <p style={{textAlign:'justify'}}>
                            El problema representa el desafío que los estudiantes enfrentarán en la práctica 
                            y proporciona la relevancia y la motivación para el aprendizaje. Con el 
                            propósito de entender el problema, los estudiantes identifican lo que ellos 
                            tendrán que aprender del tema planteado. El problema así les da un foco para 
                            integrar información de muchas disciplinas.
                        </p>
                        <i style={{textAlign:'justify'}}>
                            La nueva información se adquiere a través del aprendizaje auto dirigido.
                        </i>
                        <p style={{textAlign:'justify'}}>
                            Como corolario a todas las características antes descritas (el currículo centrado 
                            en el estudiante y el profesor como facilitador del aprendizaje), se espera que 
                            los estudiantes aprendan a partir del conocimiento del mundo real y de la acumulación
                            de experiencia por virtud de su propio estudio e investigación. Durante este aprendizaje 
                            auto dirigido, los estudiantes trabajan juntos, discuten, comparan, revisan y debaten 
                            permanentemente lo que han aprendido.
                        </p>
                    </ScrollPanel>
                </Panel>
            </div>

            <div className='p-col-12'>
                <Panel header="Importancia" toggleable collapsed>
                    <ScrollPanel style={{width:'100%', height:'250px'}}>
                        <h5 className='text-center mt-3'>
                            Pero, ¿Cuál es la importancia de aplicar ABP?
                            <a
                                href='http://148.202.167.116:8080/xmlui/bitstream/handle/123456789/574/Aprendizaje%20basado%20en%20problemas.pdf?sequence=1&isAllowed=y'
                                target={'_blank'}
                                rel='noreferrer'
                            >
                                <i className="fas fa-external-link-alt ml-2"></i>
                            </a>
                        </h5>
                        <p style={{textAlign:'justify'}}>
                            El Aprendizaje Basado en Problemas (ABP) es una estrategia de enseñanza - aprendizaje 
                            que se inicia con un problema real o realístico, en la que un equipo de estudiantes 
                            se reúne para buscarle solución. El problema debe plantear un conflicto cognitivo, 
                            debe ser retador, interesante y motivador para que el alumno se interese por buscar 
                            la solución. Este problema debe ser lo suficientemente complejo, de manera tal que 
                            requiera de la cooperación de los participantes del grupo para abordarlo eficientemente. 
                            La complejidad de éste debe estar controlada por el profesor, para evitar que los 
                            estudiantes se dividan el trabajo y se limiten a desarrollar sólo una parte, como 
                            ocurre en ciertas actividades grupales.
                        </p>
                        <p style={{textAlign:'justify'}}>
                            El ABP se convierte en un desafío para el alumno, obligándolo a que se comprometa a 
                            fondo en la búsqueda del conocimiento. Por eso se dice que el ABP es una estrategia 
                            de aprendizaje que permite producir cambios significativos en los estudiantes.
                        </p>
                        <p style={{textAlign:'justify'}}>
                            El ABP está centrado en el estudiante, pero promueve el desarrollo de una cultura de 
                            trabajo colaborativo, involucra a todos los miembros del grupo en el proceso de 
                            aprendizaje, promueve habilidades interpersonales, propicia la participación de los 
                            alumnos, generando que desempeñen diferentes roles en las labores propias de las 
                            actividades diseñadas, que les permitirán ir adquiriendo los conocimientos necesarios 
                            para enfrentarse al problema retador.
                        </p>
                        <p style={{textAlign:'justify'}}>
                            El ABP insiste en la adquisición de conocimientos y no en la memorización de los mismos 
                            con propósitos inmediatistas, permite la integración del conocimiento posibilitando una mayor 
                            retención y la transferencia del mismo a otros contextos.  
                        </p>
                        <p style={{textAlign:'justify'}}>
                            El ABP alienta en todo momento a los estudiantes a una identificación positiva con los 
                            contenidos de la materia, relacionándolos de manera más congruente con la realidad.
                        </p>
                        <p style={{textAlign:'justify'}}>
                            Barrel (1999) señala algunas razones, basadas en investigaciones, que fundamentan 
                            la importancia del ABP:
                        </p>
                        <ul style={{listStyleType: 'square'}}>
                            <li>
                                <p style={{textAlign:'justify'}}>
                                    El procesamiento de la información en los niveles superiores, tal como se da en la resolución 
                                    de situaciones problemáticas, el pensamiento critico, las estrategias de indagación y la 
                                    reflexión sobre la práctica conducen a una compresión más profunda (Perkins et al., 1990); la autodirección (McCombs, 1991), y una retención y transferencia superiores de la información y los conceptos (Bransford et al., 1986; Mayer, 1983). 
                                </p>
                            </li>
                            <li>
                                <p style={{textAlign:'justify'}}>
                                    El aprendizaje es mayor cuando las personas usan la información de manera 
                                    significativa (Marzano, 1997). 
                                </p>
                            </li>
                            <li>
                                <p style={{textAlign:'justify'}}>
                                    Tres metas centrales de la educación son la retención; la compresión y el uso o la aplicación 
                                    de la información, los conceptos, las ideas, los principios y las habilidades (Perkins et al., 1990). 
                                </p>
                            </li>
                            <li>
                                <p style={{textAlign:'justify'}}>
                                    En experimentos controlados, los estudiantes que utilizan el ABP en clase mostraron un incremento significativo 
                                    en el uso de estrategias para la resolución de problemas y obteniendo tanta información, y 
                                    muchas veces más, que los estudiantes en clases tradicionales (Stepien, 1993).
                                </p>
                            </li>
                        </ul>
                    </ScrollPanel>
                </Panel>
            </div>

            <div className='p-col-12'>
                <Panel header="Aplicación" toggleable collapsed>
                    <ScrollPanel style={{width:'100%', height:'350px'}}>
                        <h5 className='text-center mt-3'>
                            ¿Cómo se debería aplicar el ABP?
                            <a
                                href='http://148.202.167.116:8080/xmlui/bitstream/handle/123456789/574/Aprendizaje%20basado%20en%20problemas.pdf?sequence=1&isAllowed=y'
                                target={'_blank'}
                                rel='noreferrer'
                            >
                                <i className="fas fa-external-link-alt ml-2"></i>
                            </a>
                        </h5>
                        <p style={{textAlign:'justify'}}>
                            La condición fundamental para la utilización del ABP se relaciona con la forma en que se 
                            construyen las experiencias problema. Su diseño debe garantizar el interés de los 
                            estudiantes; debe relacionarse con los objetivos del curso y con situaciones de la vida 
                            real. Deben conducir al estudiante a tomar decisiones o a hacer juicios basados en hechos, 
                            en información lógica y fundamentada.
                        </p>
                        <p style={{textAlign: 'justify'}} >
                            Lo primero que el profesor deberá tener en cuenta al enfrentar el diseño de sus clases siguiendo 
                            la metodología ABP, son los objetivos de aprendizaje que se pretenden alcanzar con la 
                            resolución del problema retador y complejo con el que se desafiará a los alumnos. 
                        </p>
                        <p style={{textAlign: 'justify'}} >
                            Es claro que no existe una receta única para el diseño del ABP, pero la mayoría de los 
                            autores coinciden en que hay que seguir una serie de pasos básicos que pueden sufrir 
                            algunas variaciones dependiendo de: el número de alumnos, el tiempo disponible, los 
                            objetivos que se quiere alcanzar, la bibliografía disponible, los recursos con que 
                            cada profesor y entidad educativa cuenta, etc. Una vez que el profesor tiene definidos 
                            los objetivos, el tiempo de duración de la experiencia, la forma de evaluar el problema 
                            y el proceso a seguir, podrá comenzar a construir el problema retador.
                        </p>
                        <p style={{textAlign: 'justify'}} >
                            Concluido el problema, él deberá diseñar las estrategias de aprendizaje que le permitirán 
                            al alumno adquirir los conocimientos necesarios para darle solución. La ruta que siguen 
                            los estudiantes durante el desarrollo del proceso ABP se pueden sintetizar en:
                        </p>
                        <DataTable 
                            value={[{
                                text: 'Se busca con esto que el alumno verifique su ' +
                                'comprensión del escenario mediante la discusión del mismo dentro de su equipo de trabajo.'
                            }]}
                            stripedRows
                        >
                            <Column 
                                field='text' 
                                header={
                                    <h5 className='text-center'>1. Leer y Analizar el escenario del problema</h5>
                                }
                            ></Column>
                        </DataTable>
                        <h5 className='text-center'><i className="fas fa-arrow-down fa-2x"></i></h5>
                        <DataTable 
                            value={[{
                                text: 'Los alumnos usualmente tienen teorías o hipótesis sobre las ' +
                                'causas del problema; o ideas de cómo resolverlo. Estas deben de enlistarse y serán ' +
                                'aceptadas o rechazadas, según se avance en la investigación.'
                            }]}
                            stripedRows
                        >
                            <Column 
                                field='text' 
                                header={
                                    <h5 className='text-center'>2. Realizar una lluvia de ideas</h5>
                                }
                            ></Column>
                        </DataTable>
                        <h5 className='text-center'><i className="fas fa-arrow-down fa-2x"></i></h5>
                        <DataTable 
                            value={[{
                                text: 'Se debe hacer una lista con todo aquello que el ' +
                                'equipo conoce acerca del problema o situación.' 
                            }]}
                            stripedRows
                        >
                            <Column 
                                field='text' 
                                header={
                                    <h5 className='text-center'>
                                        3. Hacer una lista de aquello que se conoce
                                    </h5>
                                }
                            ></Column>
                        </DataTable>
                        <h5 className='text-center'><i className="fas fa-arrow-down fa-2x"></i></h5>
                        <DataTable 
                            value={[{
                                text: 'Se debe hacer una lista con todo aquello que el ' +
                                'equipo cree se debe saber para resolver el problema. Existen diversos tipos de preguntas ' +
                                'que pueden ser adecuadas; algunas pueden relacionarse con conceptos o principios que deben ' +
                                'estudiarse para resolver la situación.' 
                            }]}
                            stripedRows
                        >
                            <Column 
                                field='text' 
                                header={
                                    <h5 className='text-center'>
                                        4. Hacer una lista de aquello que se desconoce
                                    </h5>
                                }
                            ></Column>
                        </DataTable>
                        <h5 className='text-center'><i className="fas fa-arrow-down fa-2x"></i></h5>
                        <DataTable 
                            value={[{
                                text: 'Planear las estrategias ' +
                                'de investigación. Es aconsejable que en grupo los alumnos elaboren una lista de las acciones ' +
                                'que deben realizarse. ' 
                            }]}
                            stripedRows
                        >
                            <Column 
                                field='text' 
                                header={
                                    <h5 className='text-center'>
                                        5. Hacer una lista de aquello que necesita hacerse para resolver el problema
                                    </h5>
                                }
                            ></Column>
                        </DataTable>
                        <h5 className='text-center'><i className="fas fa-arrow-down fa-2x"></i></h5>
                        <DataTable 
                            value={[{
                                text: 'La definición del problema consiste en un par de declaraciones que expliquen ' +
                                'claramente lo que el equipo desea resolver, producir, responder, probar o demostrar. '
                            }]}
                            stripedRows
                        >
                            <Column 
                                field='text' 
                                header={
                                    <h5 className='text-center'>
                                        6. Definir el problema
                                    </h5>
                                }
                            ></Column>
                        </DataTable>
                        <h5 className='text-center'><i className="fas fa-arrow-down fa-2x"></i></h5>
                        <DataTable 
                            value={[{
                                text: 'El equipo localizará, acopiará, organizará, analizará e interpretará la información ' +
                                'de diversas fuentes. '
                            }]}
                            stripedRows
                        >
                            <Column 
                                field='text' 
                                header={
                                    <h5 className='text-center'>
                                        7. Obtener información
                                    </h5>
                                }
                            ></Column>
                        </DataTable>
                        <h5 className='text-center'><i className="fas fa-arrow-down fa-2x"></i></h5>
                        <DataTable 
                            value={[{
                                text: 'El equipo presentará un reporte o hará una presentación en la cual se ' +
                                'muestren las recomendaciones, predicciones, inferencias o aquello que sea conveniente en relación ' +
                                'a la solución del problema. '
                            }]}
                            stripedRows
                        >
                            <Column 
                                field='text' 
                                header={
                                    <h5 className='text-center'>
                                        8. Presentar resultados
                                    </h5>
                                }
                            ></Column>
                        </DataTable>
                        <h5 className='text-center'>
                            ¿Cómo evaluar el proceso?
                            <a
                                href='http://148.202.167.116:8080/xmlui/bitstream/handle/123456789/574/Aprendizaje%20basado%20en%20problemas.pdf?sequence=1&isAllowed=y'
                                target={'_blank'}
                                rel='noreferrer'
                            >
                                <i className="fas fa-external-link-alt ml-2"></i>
                            </a>
                        </h5>
                        <p style={{textAlign:'justify'}}>
                            El llegar a la solución del problema, genera en el camino un sinnúmero de actividades que pueden 
                            ser evaluadas, entre ellas: el trabajo de cada individuo, la presentación del equipo, el reporte 
                            escrito del grupo, los conocimientos adquiridos, etc. 
                        </p>
                        <p style={{textAlign:'justify'}}>
                            En la aplicación del ABP el profesor, al mismo tiempo que proporciona el problema, debe 
                            indicar cuáles serán los criterios de evaluación, esto se puede llevar a cabo a través de 
                            una rúbrica o matriz de valoración. Es importante considerar, en el momento de planificar 
                            la evaluación, tanto el aporte individual como el trabajo grupal. Resulta valioso considerar 
                            también la evaluación del trabajo como grupo humano, siendo el profesor el encargado de la 
                            elección de unos u otros aspectos, así como de la ponderación de los mismos.
                        </p>
                        <p style={{textAlign:'justify'}}>
                            A continuación, se presentan algunas acciones susceptibles de evaluación:
                        </p>
                        <i style={{textAlign:'justify'}}>
                            Aporte individual
                        </i>
                        <p style={{textAlign:'justify'}}>
                            Es el trabajo –en forma de reporte, ensayo, etc.– que un alumno genera como producto de sus 
                            actividades para la solución del problema y como parte de un equipo. Puede ser el análisis 
                            o síntesis de cierta información, la obtención de datos experimentales o algún otro 
                            producto que demuestre su trabajo individual.
                        </p>
                        <i style={{textAlign:'justify'}}>
                            Aporte en equipo 
                        </i>
                        <p style={{textAlign:'justify'}}>
                            Es semejante al trabajo o aporte individual, pero ahora como resultado del trabajo conjunto del equipo. 
                        </p>
                        <i style={{textAlign:'justify'}}>
                            Evaluación del compañero (co-evaluación)  
                        </i>
                        <p style={{textAlign:'justify'}}>
                            Es la evaluación que hace un alumno a sus compañeros, en base a una tabla de características y nivel de desempeño. 
                        </p>
                        <i style={{textAlign:'justify'}}>
                            Autoevaluación  
                        </i>
                        <p style={{textAlign:'justify'}}>
                            Es la evaluación que hace el alumno sobre sí mismo con base en una reflexión de lo que ha 
                            aprendido y su contraste con los objetivos del problema o curso.
                        </p>
                    </ScrollPanel>
                </Panel>
            </div>

        </div>
    )
}
