import React from 'react';

import { Panel } from 'primereact/panel';
import { ScrollPanel } from 'primereact/scrollpanel';


export const AcHelperScreen = () => {
  return (
    <div className='p-grid'>
      <div className='p-col-12'>
        <Panel header="Introducción" toggleable collapsed>
          <ScrollPanel style={{width:'100%', height:'250px'}} className='custombar1'>
              <h5 className='text-center mt-3'>
                Contexto acerca del AC 
                <a
                  href='https://www3.gobiernodecanarias.org/medusa/ecoescuela/pedagotic/aprendizaje-cooperativo/'
                  target={'_blank'}
                  rel='noreferrer'
                >
                  <i className="fas fa-external-link-alt ml-2"></i>
                </a>
              </h5>
              <p style={{textAlign:'justify'}}>
                Nuestro sistema escolar debe adaptarse a las necesidades y exigencias de la 
                sociedad del siglo XXI para formar a los futuros ciudadanos capaces de 
                incorporarse a la sociedad y alimentar así el desarrollo de la competencia 
                digital y las habilidades de búsqueda y selección crítica; así como la 
                creación, el almacenamiento, la recuperación y la transmisión de esa 
                información. Con ello buscamos la existencia de usuarios y/o consumidores 
                críticos de las tecnologías y a su vez productores y gestores de la misma. <br />
                Como docentes nuestro principal objetivo ha de ser que el alumnado alcance 
                el mayor grado de desarrollo posible. Partiendo de esta base, y para atender 
                a la gran diversidad de estos discentes, es obligado hablar de Aprendizaje 
                Cooperativo.
              </p>
              <h5 className='text-center mt-3'>
                ¿Por qué cambiar?
                <a
                  href='http://www.scielo.org.mx/scielo.php?script=sci_arttext&pid=S0185-26982018000300181'
                  target={'_blank'}
                  rel='noreferrer'
                >
                  <i className="fas fa-external-link-alt ml-2"></i>
                </a>
              </h5>
              <p style={{textAlign: 'justify'}} >
                Vivimos en un mundo globalizado en el que la adquisición de habilidades para 
                la cooperación resulta imprescindible. La convivencia de una gran diversidad 
                de personas en las sociedades actuales ha puesto de manifiesto la necesidad 
                de que todas ellas sean capaces de cooperar entre sí. Esta diversidad ha 
                hecho que el profesorado con frecuencia se sienta rebasado por la 
                heterogeneidad existente en las clases y por la exigencia de proporcionar 
                una adecuada atención a todas las necesidades de sus alumnos. En dicha 
                situación, el AC -en tanto herramienta útil para responder a la diferencia- 
                ha provocado altas expectativas en lo que a la resolución de problemas 
                educativos se refiere.
              </p>
          </ScrollPanel>
        </Panel>
      </div>
      <div className='p-col-12'>
        <Panel header="Definición" toggleable collapsed>
          <ScrollPanel style={{width:'100%', height:'250px'}} className='custombar1'>
              <h5 className='text-center mt-3'>
                ¿QUÉ ES EL APRENDIZAJE COOPERATIVO? 
                <a
                  href='https://www.ucm.es/data/cont/docs/1626-2019-03-15-JOHNSON%20El%20aprendizaje%20cooperativo%20en%20el%20aula.pdf'
                  target={'_blank'}
                  rel='noreferrer'
                >
                  <i className="fas fa-external-link-alt ml-2"></i>
                </a>
              </h5>
              <p style={{textAlign:'justify'}}>
                La cooperación consiste en trabajar juntos para alcanzar objetivos comunes. 
                En una situación cooperativa, los individuos procuran obtener resultados 
                que sean beneficiosos para ellos mismos y para todos los demás miembros del 
                grupo. El aprendizaje cooperativo es el empleo didáctico de grupos reducidos 
                en los que los alumnos trabajan juntos para maximizar su propio aprendizaje 
                y el de los demás.
              </p>
              <h5 className='text-center mt-3'>
                ¿Como se implementa?
              </h5>
              <p style={{textAlign: 'justify'}} >
                Cuando se emplean grupos formales de aprendizaje cooperativo, el docente debe:
              </p>
              <ul style={{listStyleType: 'square'}}>
                <li>
                  <p style={{textAlign:'justify'}}>
                    Especificar los objetivos de la clase.
                  </p>
                </li>
                <li>
                  <p style={{textAlign:'justify'}}>
                    Tomar una serie de decisiones previas a la enseñanza.
                  </p>
                </li>
                <li>
                  <p style={{textAlign:'justify'}}>
                    Explicar la tarea y la interdependencia positiva a los alumnos.
                  </p>
                </li>
                <li>
                  <p style={{textAlign:'justify'}}>
                    Supervisar el aprendizaje de los alumnos e intervenir en los 5 grupos 
                    para brindar apoyo en la tarea o para mejorar el desempeño interpersonal 
                    y grupal de los alumnos.
                  </p>
                </li>
                <li>
                  <p style={{textAlign:'justify'}}>
                    Evaluar el aprendizaje de los estudiantes y ayudarlos a determinar el 
                    nivel de eficacia con que funcionó su grupo.
                  </p>
                </li>
              </ul>
            <h5 className='text-center mt-3'>
              ¿CÓMO SE LOGRA LA COOPERACIÓN?
            </h5>
            <p className='text-justify'>
              Para organizar sus clases de modo de que los alumnos realmente trabajen en 
              forma cooperativa, el docente debe saber cuáles son los elementos básicos 
              que hacen posible la cooperación. 
            </p>
            <ul style={{listStyleType: 'square'}}>
              <li>
                <p style={{textAlign:'justify'}}>
                  El primer y principal elemento del aprendizaje cooperativo es la 
                  interdependencia positiva. El docente debe proponer una tarea clara y un 
                  objetivo grupal para que los alumnos sepan que habrán de hundirse o salir 
                  a flote juntos. Los miembros de un grupo deben tener en claro que los 
                  esfuerzos de cada integrante no sólo lo benefician a él mismo sino 
                  también a los demás miembros. 
                </p>
              </li>
              <li>
                <p style={{textAlign:'justify'}}>
                  El segundo elemento esencial del aprendizaje cooperativo es la 
                  responsabilidad individual y grupal. El grupo debe asumir la 
                  responsabilidad de alcanzar sus objetivos, y cada miembro será 
                  responsable de cumplir con la parte del trabajo que le corresponda. 
                </p>
              </li>
              <li>
                <p style={{textAlign:'justify'}}>
                  El tercer elemento esencial del aprendizaje cooperativo es la interacción 
                  estimuladora, preferentemente cara a cara. Los alumnos deben realizar 
                  juntos una labor en la que cada uno promueva el éxito de los demás, 
                  compartiendo los recursos existentes y ayudándose, respaldándose, 
                  alentándose y felicitándose unos a otros por su empeño en aprender. 
                </p>
              </li>
              <li>
                <p style={{textAlign:'justify'}}>
                  El cuarto componente del aprendizaje cooperativo consiste en enseñarles 
                  a los alumnos algunas prácticas interpersonales y grupales imprescindibles. 
                  El aprendizaje cooperativo es intrínsecamente más complejo que el 
                  competitivo o el individualista, porque requiere que los alumnos aprendan 
                  tanto las materias escolares (ejecución de tareas) como las prácticas 
                  interpersonales y grupales necesarias para funcionar como parte de un 
                  grupo (trabajo de equipo).
                </p>
              </li>
              <li>
                <p style={{textAlign:'justify'}}>
                  El quinto elemento fundamental del aprendizaje cooperativo es la evaluación 
                  grupal. Esta evaluación tiene lugar cuando los miembros del grupo analizan 
                  en qué medida están alcanzando sus metas y, manteniendo relaciones de 
                  trabajo eficaces. Los grupos deben determinar qué acciones de sus miembros 
                  son positivas o negativas, y tomar decisiones acerca de cuáles conductas 
                  conservar o modificar.
                </p>
              </li>
            </ul>
          </ScrollPanel>
        </Panel>
      </div>
      <div className='p-col-12'>
        <Panel header="Importancia" toggleable collapsed>
          <ScrollPanel style={{width:'100%', height:'250px'}} className='custombar1'>
            <h5 className='text-center mt-3'>
              ¿PORQUÉ ES IMPORTANTE IMPLEMENTAR AC? 
              <a
                href='https://www.ucm.es/data/cont/docs/1626-2019-03-15-JOHNSON%20El%20aprendizaje%20cooperativo%20en%20el%20aula.pdf'
                target={'_blank'}
                rel='noreferrer'
              >
                <i className="fas fa-external-link-alt ml-2"></i>
              </a>
            </h5>
            <p style={{textAlign:'justify'}}>
              Para convencerse de la conveniencia de emplear el aprendizaje cooperativo, 
              basta con conocer las investigaciones realizadas al respecto. La primera 
              investigación se hizo en 1898, y desde entonces se han efectuado unos 600 
              estudios experimentales y más de 100 estudios correlativos sobre los métodos 
              de aprendizaje cooperativo, competitivo e individualista. Los resultados 
              obtenidos pueden clasificarse en tres categorías principales: esfuerzos por 
              lograr un buen desempeño, relaciones positivas y salud mental. <br/> A partir de 
              las investigaciones existentes, sabemos que la cooperación, comparada con 
              los métodos competitivo e individualista, da lugar a los siguientes resultados. 
            </p>
            <h5 className='text-center mt-3'>
              ¿Qué resultados se obtiene?
            </h5>
            <ol style={{listStyleType: 'square'}}>
              <li>
                <p style={{textAlign:'justify'}}>
                  Mayores esfuerzos por lograr un buen desempeño: esto incluye un rendimiento 
                  más elevado y una mayor productividad por parte de todos los alumnos 
                  (ya sean de alto, medio o bajo rendimiento), mayor posibilidad de retención 
                  a largo plazo, motivación intrínseca, motivación para lograr un alto 
                  rendimiento, más tiempo dedicado a las tareas, un nivel superior de 
                  razonamiento y pensamiento crítico.
                </p>
              </li>
              <li>
                <p style={{textAlign:'justify'}}>
                  Relaciones más positivas entre los alumnos: esto incluye un incremento del 
                  espíritu de equipo, relaciones solidarias y comprometidas, respaldo 
                  personal y escolar, valoración de la diversidad y cohesión.
                </p>
              </li>
              <li>
                <p style={{textAlign:'justify'}}>
                  Mayor salud mental: esto incluye un ajuste psicológico general, 
                  fortalecimiento del yo, desarrollo social, integración, autoestima, 
                  sentido de la propia identidad y capacidad de enfrentar la adversidad y 
                  las tensiones.
                </p>
              </li>
            </ol>
          </ScrollPanel>
        </Panel>
      </div>
      <div className='p-col-12'>
        <Panel header="Aplicación" toggleable collapsed>
          <ScrollPanel style={{width:'100%', height:'250px'}} className='custombar1'>
            <h5 className='text-center mt-3'>
              ¿CÓMO SE CONFORMAN LOS GRUPOS EN AC? 
              <a
                href='https://www.ucm.es/data/cont/docs/1626-2019-03-15-JOHNSON%20El%20aprendizaje%20cooperativo%20en%20el%20aula.pdf'
                target={'_blank'}
                rel='noreferrer'
              >
                <i className="fas fa-external-link-alt ml-2"></i>
              </a>
            </h5>
            <p style={{textAlign:'justify'}}>
              No existe ninguna dimensión ideal para los grupos de aprendizaje cooperativo. 
              La cantidad conveniente de miembros dependerá de los objetivos de la clase, 
              de las edades de los alumnos y su experiencia en el trabajo en equipo, de 
              los materiales y equipos á utilizar y del tiempo disponible para la clase. <br/> 
              Los grupos de aprendizaje cooperativo suelen tener de dos a cuatro miembros. 
              La regla empírica a aplicar es: “cuanto más pequeño sea el grupo, tanto mejor”. 
              En caso de duda, al docente le conviene formar pares o tríos de alumnos. Cada 
              vez que tenga que determinar las dimensiones de los grupos, deberá tener en 
              cuenta varios factores:  
            </p>
            <ul style={{listStyleType: 'square'}}>
              <li>
                <p style={{textAlign:'justify'}}>
                  Al aumentar la cantidad de miembros de un grupo de aprendizaje, también se 
                  ampliará la gama de destrezas y capacidades presentes; el número de mentes 
                  dispuestas a adquirir y procesar la información, y la diversidad de puntos 
                  de vista. Con la incorporación de cada miembro, se incrementan los recursos 
                  que contribuyen al éxito del trabajo del grupo.
                </p>
              </li>
              <li>
                <p style={{textAlign:'justify'}}>
                  Cuanto menor es el tiempo disponible, más reducido deberá ser el grupo de 
                  aprendizaje. Si sólo se dispone de poco tiempo para una lección determinada, 
                  el trabajo de a pares será más eficaz porque lleva menos tiempo para 
                  organizarse, opera con mayor rapidez y posibilita una intervención más 
                  prolongada por parte de cada miembro.
                </p>
              </li>
              <li>
                <p style={{textAlign:'justify'}}>
                  Cuanto más pequeño es el grupo, más difícil será que algunos alumnos se dejen estar y 
                  no hagan su aporte al trabajo colectivo. En los grupos reducidos, el desempeño de cada 
                  miembro es más visible y los alumnos son más responsables de sus actos, lo que 
                  garantiza la participación activa de todos.
                </p>
              </li>
            </ul>
            <h5 className='text-center mt-3'>
              LA ASIGNACIÓN DE ROLES
            </h5>
            <p style={{textAlign:'justify'}}>
              Al planificar una clase, el docente tiene que considerar qué acciones deberán realizarse 
              para maximizar el aprendizaje de los estudiantes. Los roles indican qué puede esperar 
              cada miembro del grupo que hagan los demás y, por lo tanto, qué está obligado a hacer 
              cada uno de ellos. A veces, los alumnos se niegan a participar en un grupo cooperativo 
              o no saben cómo contribuir al buen desarrollo del trabajo en grupo. El docente puede 
              ayudar a resolver y prevenir ese problema otorgándole a cada miembro un rol concreto 
              que deberá desempeñar dentro del grupo.  
            </p>
            <p className='text-justify'>
              Asignar roles a los alumnos es una de las maneras más eficaces de asegurarse de 
              que los miembros del grupo trabajen juntos sin tropiezos y en forma productiva. 
              Los roles se clasifican según su función:
            </p>
            <ul style={{listStyleType: 'square'}}>
              <li>
                <p style={{textAlign:'justify'}}>
                  Roles que ayudan a la conformación del grupo.
                </p>
              </li>
              <li>
                <p style={{textAlign:'justify'}}>
                  Roles que ayudan al grupo a funcionar (es decir, que ayudan al grupo a alcanzar sus 
                  objetivos y a mantener relaciones de trabajo eficaces).
                </p>
              </li>
              <li>
                <p style={{textAlign:'justify'}}>
                  Roles que ayudan a los alumnos a formular lo que saben e integrarlo con lo 
                  que están aprendiendo.
                </p>
              </li>
              <li>
                <p style={{textAlign:'justify'}}>
                  Roles que ayudan a incentivar el pensamiento de los alumnos y mejorar su razonamiento.
                </p>
              </li>
            </ul>
            <h5 className='text-center mt-3'>
              EL DIAGNÓSTICO DEL APRENDIZAJE DE LOS ALUMNOS 
            </h5>
            <p style={{textAlign:'justify'}}>
              El diagnóstico y la evaluación están tan entrelazados que resulta difícil 
              separarlos. Pero normalmente, diagnosticar significa recoger datos para 
              emitir un juicio, y evaluar es juzgar el valor de algo sobre la base de los 
              datos recogidos. El diagnóstico no implica asignar calificaciones. El docente 
              puede diagnosticar sin hacer una evaluación, pero no puede evaluar sin haber 
              diagnosticado.   
            </p>
            <h5 className='text-center mt-3'>
              REGLAS DEL DIAGNÓSTICO
            </h5>
            <p style={{textAlign:'justify'}}>
              Hay cinco reglas relativas al diagnóstico y la evaluación:   
            </p>
            <ol style={{listStyleType: 'square'}}>
              <li>
                <p style={{textAlign:'justify'}}>
                  <b>Primera regla.</b> Efectuar todos los controles y evaluaciones en el contexto de los 
                  equipos de aprendizaje. El docente debe diagnosticar y evaluar el rendimiento de 
                  cada alumno, pero el diagnóstico es mucho más eficaz cuando se practica en el 
                  contexto del grupo. 
                </p>
              </li>
              <li>
                <p style={{textAlign:'justify'}}>
                  <b>Segunda regla.</b> ¡Diagnostique una y otra vez! Los grupos de aprendizaje 
                  necesitan recibir una retroalimentación continua acerca del nivel de 
                  aprendizaje de cada miembro. El docente debe tomar pruebas y formular 
                  preguntas con frecuencia, y exigir muchos trabajos escritos y presentaciones 
                  orales. 
                </p>
              </li>
              <li>
                <p style={{textAlign:'justify'}}>
                  <b>Tercera regla.</b> Hacer que los alumnos determinen mutuamente sus niveles de aprendizaje. 
                  Inmediatamente después de un control, los miembros del grupo deben tomar las medidas 
                  necesarias para optimizar el aprendizaje de todos. 
                </p>
              </li>
              <li>
                <p style={{textAlign:'justify'}}>
                  <b>Cuarta regla.</b> Emplear un sistema basado en criterios para todos los 
                  diagnósticos y evaluaciones. Evitar cualquier comparación entre los 
                  niveles de rendimiento de los alumnos. La comparación es una “fuerza 
                  destructiva” que puede reducir la motivación y el aprendizaje de los 
                  estudiantes. 
                </p>
              </li>
              <li>
                <b>Quinta regla.</b> Utilizar una amplia variedad de fórmulas de diagnóstico. 
                El aprendizaje cooperativo es un campo en el que pueden aplicarse el 
                aprendizaje de calidad total, el diagnóstico basado en el desempeño y el 
                diagnóstico auténtico. 
              </li>
            </ol>
          </ScrollPanel>
        </Panel>
      </div>
    </div>
  )
}
