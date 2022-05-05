import React from 'react';
import { Panel } from 'primereact/panel';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Image } from 'primereact/image';

// TODO: Subir los PDF's citados a firebase y poner sus respectivos links en la etiqueta, 
//  así como investigar el cómo dirigirse a la página seleccionada dependieno el tema tratado.
// TODO: Aplicar estilos al preview de Image

export const DuaHelperScreen = () => {
    return (
        <div className="p-grid">

            <div className='p-col-12'>
                <Panel header="Introducción" toggleable collapsed>
                    <ScrollPanel style={{width:'100%', height:'250px'}}>
                        <h5 className='text-center mt-3'>
                            La Educación como un Derecho 
                            <a
                                href='https://reader.elsevier.com/reader/sd/pii/S0210277315000025?token=FEE462848A98FA53C33BCDC40D162F6768DD8F3CF25A7421007ECA2ABADC23177C7741A94B01A128147365442ED2DE26&originRegion=us-east-1&originCreation=20220118004026' 
                                target={'_blank'}
                                rel='noreferrer'
                            >
                                <i className="fas fa-external-link-alt ml-2"></i>
                            </a>
                        </h5>
                        <p style={{textAlign:'justify'}}>
                            En nuestra sociedad, los derechos fundamentales de todas las 
                            personas pasan por el acceso a una serie de servicios básicos que
                            garantizan la realización personal como seres humanos. Uno de
                            estos derechos es el acceso a una educación de calidad que garantice 
                            que todas las personas tienen las mismas oportunidades de
                            aprender y, por tanto, de formarse como ciudadanos. Por ello, la
                            educación debería considerar la atención a la diversidad en las aulas
                            como uno de sus pilares básicos; entendiendo como atención a la
                            diversidad, la puesta en marcha de acciones que tengan como objetivo 
                            que todas las personas, independientemente de cuáles sean
                            sus características, puedan acceder en igualdad de oportunidades
                            al proceso educativo.
                        </p>
                        <h5 className='text-center mt-3'>
                            De tal manera, ¿Cómo aporta la educación inclusiva?
                            <a 
                                href='https://d1wqtxts1xzle7.cloudfront.net/55488276/dua_pautas_intro_cv-with-cover-page-v2.pdf?Expires=1642470260&Signature=ZGB6aw6da0N1V1PadxRmC4cx-nzKh~xmBZBeDA~~meMG~o82CdH0vu1mE-Cwka~Jhl62-sEBTCon3q~jY7BlrjwVs-DeWz3dp456FrakFkTkz5-CDES-m6WII4rJmcDR0yh~WTzgS-o1oXl~HwkPMfY2~0eM0cNHgD1~s5Q4xw~6OLX~aIJPGZfCUTpfqaQpTj5GLgHTSZpys2SFI0Scgccfw72A2iNwi7~Rf~YJ9W46ojFTuxJ5x--485wuAhAQv6bXRcfNNDGBbxFlaKYm7zQOpm9Kpg7HmfFgJvEHBeEWNZ7Tnt8hSHmjM7N9ON6bhblHBKaBCvvRh2AxG01D1A__&Key-Pair-Id=APKAJLOHF5GGSLRBV4ZA'
                                target={'_blank'}
                                rel='noreferrer'
                            >
                                <i className="fas fa-external-link-alt ml-2"></i>
                            </a>
                        </h5>
                        <p style={{textAlign: 'justify'}} >
                            La educación inclusiva es considerada como un medio eficaz para educar a 
                            todos, independientemente de sus diferencias o barreras individuales o 
                            sociales (UNESCO, 2015). Sin embargo, esta, requiere de estrategias para 
                            llevar a cabo sus principios de igualdad de oportunidades, atención y 
                            respecto a la diversidad, accesibilidad, entre otras (Blanco, & Duck, 2011). 
                            El diseño universal del aprendizaje (DUA) aparece como una respuesta a 
                            la viabilidad de los principios de la educación inclusiva (Sánchez, Díez, & Martín, 2016), 
                            comprendiéndose así como una estrategia didáctica que aplica los 
                            principios universales del diseño universal al diseño del currículo, de 
                            tal modo que, el aprendizaje pueda llegar a todos los alumnos de una manera 
                            equitativa, en donde los materiales didácticos utilizados a través de 
                            los medios tecnológicos, renueven la utilización de los materiales tradicionales 
                            rígidos, carentes de creatividad, poco funcionales y creativos; y, con esto 
                            se preste atención a la diversidad del alumnado y las diferentes habilidades 
                            sensoriales, motrices, cognitivas, afectivas y lingüísticas (Díez, & Sánchez, 2015).
                        </p>
                    </ScrollPanel>
                </Panel>
            </div>

            <div className='p-col-12'>
                <Panel header="Definición" toggleable collapsed>
                    <ScrollPanel style={{width:'100%', height:'350px'}}>
                        <h5 className='text-center mt-3'>
                            Contextualización acerca de DUA
                            <a
                                href='https://d1wqtxts1xzle7.cloudfront.net/55488276/dua_pautas_intro_cv-with-cover-page-v2.pdf?Expires=1642470260&Signature=ZGB6aw6da0N1V1PadxRmC4cx-nzKh~xmBZBeDA~~meMG~o82CdH0vu1mE-Cwka~Jhl62-sEBTCon3q~jY7BlrjwVs-DeWz3dp456FrakFkTkz5-CDES-m6WII4rJmcDR0yh~WTzgS-o1oXl~HwkPMfY2~0eM0cNHgD1~s5Q4xw~6OLX~aIJPGZfCUTpfqaQpTj5GLgHTSZpys2SFI0Scgccfw72A2iNwi7~Rf~YJ9W46ojFTuxJ5x--485wuAhAQv6bXRcfNNDGBbxFlaKYm7zQOpm9Kpg7HmfFgJvEHBeEWNZ7Tnt8hSHmjM7N9ON6bhblHBKaBCvvRh2AxG01D1A__&Key-Pair-Id=APKAJLOHF5GGSLRBV4ZA' 
                                target={'_blank'}
                                rel='noreferrer'
                            >
                                <i className="fas fa-external-link-alt ml-2"></i>
                            </a>
                        </h5>
                        <p style={{textAlign:'justify'}}>
                            En nuestra sociedad, los derechos fundamentales de todas las 
                            personas pasan por el acceso a una serie de servicios básicos que
                            garantizan la realización personal como seres humanos. Uno de
                            estos derechos es el acceso a una educación de calidad que garantice 
                            que todas las personas tienen las mismas oportunidades de
                            aprender y, por tanto, de formarse como ciudadanos. Por ello, la
                            educación debería considerar la atención a la diversidad en las aulas
                            como uno de sus pilares básicos; entendiendo como atención a la
                            diversidad, la puesta en marcha de acciones que tengan como objetivo 
                            que todas las personas, independientemente de cuáles sean
                            sus características, puedan acceder en igualdad de oportunidades
                            al proceso educativo.
                        </p>
                        <h5 className='text-center mt-3'>
                            Entonces, ¿Qué es DUA?
                            <a 
                                href='https://d1wqtxts1xzle7.cloudfront.net/55488276/dua_pautas_intro_cv-with-cover-page-v2.pdf?Expires=1642470260&Signature=ZGB6aw6da0N1V1PadxRmC4cx-nzKh~xmBZBeDA~~meMG~o82CdH0vu1mE-Cwka~Jhl62-sEBTCon3q~jY7BlrjwVs-DeWz3dp456FrakFkTkz5-CDES-m6WII4rJmcDR0yh~WTzgS-o1oXl~HwkPMfY2~0eM0cNHgD1~s5Q4xw~6OLX~aIJPGZfCUTpfqaQpTj5GLgHTSZpys2SFI0Scgccfw72A2iNwi7~Rf~YJ9W46ojFTuxJ5x--485wuAhAQv6bXRcfNNDGBbxFlaKYm7zQOpm9Kpg7HmfFgJvEHBeEWNZ7Tnt8hSHmjM7N9ON6bhblHBKaBCvvRh2AxG01D1A__&Key-Pair-Id=APKAJLOHF5GGSLRBV4ZA'
                                target={'_blank'}
                                rel='noreferrer'
                            >
                                <i className="fas fa-external-link-alt ml-2"></i>
                            </a>
                        </h5>
                        <p style={{textAlign: 'justify'}} >
                            Es un enfoque basado en la investigación para el diseño del currículo ―es 
                            decir, objetivos educativos, métodos, materiales y evaluación― que permite 
                            a todas las personas desarrollar conocimientos, habilidades y motivación e 
                            implicación con el aprendizaje; esta metodología ha sido desarrollado por el 
                            Centro de Tecnología Especial Aplicada, CAST.
                        </p>
                        <Image 
                            src={"/assets/methodologies/dua/portada-dua.png"} 
                            alt="DUA" 
                            width="450" 
                            imageClassName='mt-1'
                            preview
                            className='center-image'
                        />
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
                    </ScrollPanel>
                </Panel>
            </div>

            <div className='p-col-12'>
                <Panel header="Importancia" toggleable collapsed>
                    <ScrollPanel style={{width:'100%', height:'350px'}}>
                        <h5 className='text-center mt-3'>
                            ¿Qué ocurre cuándo se diseña el currículo sin tener en cuenta a todo el alumnado?
                            <a
                                href='https://d1wqtxts1xzle7.cloudfront.net/55488276/dua_pautas_intro_cv-with-cover-page-v2.pdf?Expires=1642470260&Signature=ZGB6aw6da0N1V1PadxRmC4cx-nzKh~xmBZBeDA~~meMG~o82CdH0vu1mE-Cwka~Jhl62-sEBTCon3q~jY7BlrjwVs-DeWz3dp456FrakFkTkz5-CDES-m6WII4rJmcDR0yh~WTzgS-o1oXl~HwkPMfY2~0eM0cNHgD1~s5Q4xw~6OLX~aIJPGZfCUTpfqaQpTj5GLgHTSZpys2SFI0Scgccfw72A2iNwi7~Rf~YJ9W46ojFTuxJ5x--485wuAhAQv6bXRcfNNDGBbxFlaKYm7zQOpm9Kpg7HmfFgJvEHBeEWNZ7Tnt8hSHmjM7N9ON6bhblHBKaBCvvRh2AxG01D1A__&Key-Pair-Id=APKAJLOHF5GGSLRBV4ZA' 
                                target={'_blank'}
                                rel='noreferrer'
                            >
                                <i className="fas fa-external-link-alt ml-2"></i>
                            </a>
                        </h5>
                        <p style={{textAlign:'justify'}}>
                            Cuando el currículo se diseña sin pensar en las necesidades potenciales
                            de quienes deben acceder a él, al igual que sucede en el ámbito
                            arquitectónico, las adaptaciones necesarias a posterior (como las
                            adaptaciones curriculares) resultan poco funcionales y atractivas para el
                            alumnado, y costosas para los docentes:
                        </p>
                        <ul style={{listStyleType: 'square'}}>
                            <li>
                                <p style={{textAlign:'justify'}}>
                                    <span style={{fontWeight: 'bold'}}>Poco funcionales</span>, en el sentido 
                                    de que en ocasiones no sirven para alcanzar el objetivo que se pretendía 
                                    en un principio. A menudo, estas adaptaciones se limitan a poner meros 
                                    parches o a simplificar las tareas y los objetivos, en lugar de proporcionar 
                                    los apoyos (andamiaje) que el alumno necesita para acceder al mismo aprendizaje 
                                    que sus compañeros.
                                </p>
                            </li>
                            <li>
                                <p>
                                    <span style={{fontWeight: 'bold'}}>Poco atractivas</span>, ya que a veces el alumno 
                                    no trabaja en las mismas actividades que sus compañeros, lo que puede hacer que se 
                                    sienta desplazado y desmotivado.
                                </p>
                            </li>
                            <li>
                                <p>
                                    <span style={{fontWeight: 'bold'}}>Costosas</span> en relación con el esfuerzo y 
                                    el tiempo que el profesorado debe dedicar a diseñar las adaptaciones: una vez que 
                                    la planificación ya está diseñada, hay que empezar a hacer variantes individuales 
                                    para determinados alumnos (el que no sabe leer, la que no conoce el idioma, el que 
                                    no oye bien, la que tiene unas capacidades elevadas…).
                                </p>
                            </li>
                        </ul>
                        <h5 className='text-center mt-4'>
                            ¿Qué aporta el DUA a la educación inclusiva y a la atención de la diversidad en el aula?
                            <a 
                                href='https://d1wqtxts1xzle7.cloudfront.net/55488276/dua_pautas_intro_cv-with-cover-page-v2.pdf?Expires=1642470260&Signature=ZGB6aw6da0N1V1PadxRmC4cx-nzKh~xmBZBeDA~~meMG~o82CdH0vu1mE-Cwka~Jhl62-sEBTCon3q~jY7BlrjwVs-DeWz3dp456FrakFkTkz5-CDES-m6WII4rJmcDR0yh~WTzgS-o1oXl~HwkPMfY2~0eM0cNHgD1~s5Q4xw~6OLX~aIJPGZfCUTpfqaQpTj5GLgHTSZpys2SFI0Scgccfw72A2iNwi7~Rf~YJ9W46ojFTuxJ5x--485wuAhAQv6bXRcfNNDGBbxFlaKYm7zQOpm9Kpg7HmfFgJvEHBeEWNZ7Tnt8hSHmjM7N9ON6bhblHBKaBCvvRh2AxG01D1A__&Key-Pair-Id=APKAJLOHF5GGSLRBV4ZA'
                                target={'_blank'}
                                rel='noreferrer'
                            >
                                <i className="fas fa-external-link-alt ml-2"></i>
                            </a>
                        </h5>
                        <p style={{textAlign: 'justify'}} >
                            Principalmente, el DUA hace dos aportaciones:
                        </p>
                        <ol>
                            <li>
                                <p style={{textAlign:'justify'}}>
                                    Se rompe la dicotomía entre alumnado con discapacidad y sin
                                    discapacidad. La diversidad es un concepto que se aplica a todos
                                    los estudiantes, que tienen diferentes capacidades que se desarrollan
                                    en mayor o menor grado, por lo que cada cual aprende mejor de una
                                    forma única y diferente al resto. Por tanto, ofrecer distintas
                                    alternativas para acceder al aprendizaje no solo beneficia al
                                    estudiante con discapacidad, sino que también permite que cada
                                    alumno escoja aquella opción con la que va a aprender mejor.
                                </p>
                                <p style={{textAlign:'justify'}}>
                                    Por ejemplo, si se organiza un recital de poesía en el aula y la
                                    maestra o el maestro permite que el alumnado escoja entre leer una
                                    poesía o recitarla de memoria una vez que la haya escuchado varias
                                    veces en una grabación, estará asegurándose de que no solamente
                                    participará el alumnado con discapacidad visual, sino también el
                                    estudiante que no sepa leer o que lea muy despacio.
                                </p>
                            </li>
                            <li>
                                <p style={{textAlign:'justify'}} className='mt-3'>
                                    Encontramos nuevamente que el foco de la discapacidad se
                                    desplaza del alumno a los materiales y a los medios en particular,
                                    y al diseño curricular en general (Burgstahler, 2011). El currículo será
                                    discapacitante en la medida en que no permita que todo el alumnado
                                    pueda acceder a él.
                                </p>
                                <p style={{textAlign:'justify'}}>
                                    Imaginemos que se incorpora al aula un alumno que no conoce el
                                    idioma porque ha llegado a nuestro país recientemente. Si se explica
                                    un determinado tema relacionado con las ciencias naturales
                                    únicamente con el libro de texto y mediante la exposición oral del
                                    maestro o la maestra, se le estará impidiendo acceder al aprendizaje.
                                    Estará discapacitado para aprender. En cambio, si se usan
                                    otros recursos como infografías, vídeos subtitulados, textos digitales,
                                    en los que el alumno pueda acceder a una traducción simultánea;
                                    se estará ofreciendo al estudiante el soporte necesario para que
                                    acceda a la información, sin que el período que tarde en aprender el
                                    idioma de enseñanza sea un tiempo perdido.
                                </p>
                            </li>
                        </ol>
                    </ScrollPanel>
                </Panel>
            </div>

            <div className='p-col-12'>
                <Panel header="Aplicación" toggleable collapsed>
                    <ScrollPanel style={{width:'100%', height:'350px'}}>
                        <h5 className='text-center mt-3'>
                            ¿Cómo aplicarlo?
                            <a
                                href='https://d1wqtxts1xzle7.cloudfront.net/55488276/dua_pautas_intro_cv-with-cover-page-v2.pdf?Expires=1642470260&Signature=ZGB6aw6da0N1V1PadxRmC4cx-nzKh~xmBZBeDA~~meMG~o82CdH0vu1mE-Cwka~Jhl62-sEBTCon3q~jY7BlrjwVs-DeWz3dp456FrakFkTkz5-CDES-m6WII4rJmcDR0yh~WTzgS-o1oXl~HwkPMfY2~0eM0cNHgD1~s5Q4xw~6OLX~aIJPGZfCUTpfqaQpTj5GLgHTSZpys2SFI0Scgccfw72A2iNwi7~Rf~YJ9W46ojFTuxJ5x--485wuAhAQv6bXRcfNNDGBbxFlaKYm7zQOpm9Kpg7HmfFgJvEHBeEWNZ7Tnt8hSHmjM7N9ON6bhblHBKaBCvvRh2AxG01D1A__&Key-Pair-Id=APKAJLOHF5GGSLRBV4ZA' 
                                target={'_blank'}
                                rel='noreferrer'
                            >
                                <i className="fas fa-external-link-alt ml-2"></i>
                            </a>
                        </h5>
                        <p style={{textAlign:'justify'}}>
                            Los resultados de las investigaciones del CAST revelaron dos evidencias
                            fundamentales para el diseño del marco de aplicación del enfoque DUA. Por un
                            lado, la diversidad que presentan los estudiantes en cuanto a estructura y
                            configuración cerebral se traduce en una gran variabilidad respecto a la
                            manera que tienen de acceder y procesar la información, al modo en que
                            planifican, ejecutan y monitorizan diferentes tareas, y a la forma en que se
                            motivan e implican en su propio aprendizaje. Esto es, las diferencias existentes
                            entre las redes cerebrales de reconocimiento, estratégicas y afectivas de los
                            alumnos, se manifiestan en diversas maneras de aprender. Por tanto, el currículo
                            debe estar diseñado universalmente, para que contemple la singularidad de
                            cada alumno y haga posible el éxito educativo a todos. Sin embargo, la
                            flexibilidad inherente a los medios digitales posibilita llevar a la práctica esta
                            personalización del currículo. Las nuevas tecnologías son esenciales para la
                            aplicación del DUA.
                        </p>
                        <p style={{textAlign:'justify'}}>
                            A partir de esta investigación, el CAST desarrolló el marco de implementación
                            del Diseño Universal para el Aprendizaje en el aula. Como se ha señalado ya,
                            dicho marco está estructurado en tres principios básicos, cada uno de los
                            cuales se desarrolla a través de tres pautas de aplicación y de varias claves o
                            puntos de verificación.
                        </p>
                        <h5 className='text-center mt-4'>
                            ¿Cuáles estos principios?
                            <a 
                                href='https://d1wqtxts1xzle7.cloudfront.net/55488276/dua_pautas_intro_cv-with-cover-page-v2.pdf?Expires=1642470260&Signature=ZGB6aw6da0N1V1PadxRmC4cx-nzKh~xmBZBeDA~~meMG~o82CdH0vu1mE-Cwka~Jhl62-sEBTCon3q~jY7BlrjwVs-DeWz3dp456FrakFkTkz5-CDES-m6WII4rJmcDR0yh~WTzgS-o1oXl~HwkPMfY2~0eM0cNHgD1~s5Q4xw~6OLX~aIJPGZfCUTpfqaQpTj5GLgHTSZpys2SFI0Scgccfw72A2iNwi7~Rf~YJ9W46ojFTuxJ5x--485wuAhAQv6bXRcfNNDGBbxFlaKYm7zQOpm9Kpg7HmfFgJvEHBeEWNZ7Tnt8hSHmjM7N9ON6bhblHBKaBCvvRh2AxG01D1A__&Key-Pair-Id=APKAJLOHF5GGSLRBV4ZA'
                                target={'_blank'}
                                rel='noreferrer'
                            >
                                <i className="fas fa-external-link-alt ml-2"></i>
                            </a>
                        </h5>
                        <p style={{textAlign: 'justify'}} >
                            Los tres principios del DUA sientan las bases del enfoque y en torno a ellos
                            se construye el marco práctico para llevarlo a las aulas. Estos principios se
                            han convertido en un referente obligado que aparece en la mayoría de la
                            bibliografía científica sobre el tema.
                        </p>
                        <Image 
                            src={"/assets/methodologies/dua/dua-principios.png"} 
                            alt="DUA" 
                            width="500" 
                            imageClassName='mt-1'
                            preview
                            className='center-image'
                        />
                        <ol style={{listStyleType: 'upper-roman'}} className='mt-4'>
                            <li>
                                <p style={{textAlign:'justify'}}>
                                    Proporcionar múltiples formas de representación de
                                    la información y los contenidos (el qué del aprendizaje), ya que los
                                    alumnos son distintos en la forma en que perciben y comprenden la
                                    información.
                                </p>
                            </li>
                            <li>
                                <p style={{textAlign:'justify'}}>
                                    Proporcionar múltiples maneras de expresión del
                                    aprendizaje (el cómo del aprendizaje), puesto que cada persona tiene
                                    sus propias habilidades estratégicas y organizativas para expresar lo
                                    que sabe.
                                </p>
                            </li>
                            <li>
                                <p style={{textAlign:'justify'}}>
                                    Proporcionar múltiples formas de implicación (el
                                    porqué del aprendizaje), de forma que todos los alumnos puedan
                                    sentirse comprometidos y motivados en el proceso de aprendizaje.
                                </p>
                            </li>
                        </ol>
                        <p>
                            Los tres principios del DUA indican que es necesario que los docentes
                            ofrezcan al alumnado un amplio rango de opciones para acceder al
                            aprendizaje. Aquí se plantea un interrogante: ¿cómo podemos llevar a la
                            práctica cotidiana del aula estos principios?, ¿cómo los aplicamos al
                            currículo para lograr que la enseñanza sea realmente para todos los
                            estudiantes de la clase, para que todos participen en los procesos y
                            actividades y, finalmente, para que aprendan?
                        </p>
                    </ScrollPanel>
                </Panel>
            </div>

        </div>
    )
}
