import moment from "moment";
import Swal from "sweetalert2";

export const getTopicErrorMessage = ( detail ) => {
    if ( detail.classroom ) {
        return detail.classroom[0]
    } else if ( detail.asignature ) {
        return detail.asignature[0]
    } else if ( detail.owner ) {
        return detail.owner[0]
    } else if ( detail.title ) {
        return detail.title[0]
    } else if ( detail.description ) {
        return detail.description[0]
    } else if ( detail.objective ) {
        return detail.objective[0]
    } else if ( detail.type ) {
        return detail.type[0]
    } else if ( detail.start_at ) {
        return detail.start_at[0]
    } else if ( detail.end_at ) {
        return detail.end_at[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const setMethodologyFieldsForm = ( type ) => {
    if (type === 1) {
        return {
            written_conceptualization: '',
            oral_conceptualization: [],
            example: '',
            first_image: '',
            second_image: '',
            video: '',
            extra_information: '',
            observations: '',
            errors: {}
        }
    } else if (type === 2){
        return {
            problem: '',
            oral_explication: '',
            descriptive_image: '',
            reference_url: '',
            errors: {}
        }
    } else if (type === 3){
        return {}
    } else {
        return {}
    }
}

export const existErrorOnFormikForm = (data) => {
    let isValid = true;

    if (!data.title) {
        isValid = false;
    }
    if (!data.description) {
        isValid = false
    }
    if (!data.objective) {
        isValid = false;
    }
    if (!data.start_at) {
        isValid = false;
    }
    if (!data.start_time) {
        isValid = false;
    }
    if (!data.end_at) {
        isValid = false;
    }
    if (!data.end_time) {
        isValid = false;
    }

    return isValid;
}

export const setErrorsMethodologyForm = ( data, errors, type ) => {
    if (type) {
        if ( type === 1 ) {
            // }
            if (!data.written_conceptualization) {
                errors.written_conceptualization = 
                'La conceptualización escrita es requerida.';
            }
            if (data.oral_conceptualization.length === 0) {
                errors.oral_conceptualization = 'La conceptualización oral es requerida.';
            }
            if (!data.example) {
                errors.example = 'El ejemplo descriptivo es requerido.';
            }
            if (!data.first_image) {
                errors.first_image = 'La primera imagen es obligatoria.';
            } 
            // else if (data.first_image && !isValidFirstImage){
            //     errors.first_image = 'La primera imagen descriptiva no es válida.';
            // } 
            if (!data.second_image) {
                errors.second_image = 'La segunda imagen es obligatoria.';
            } 
            // else if (data.second_image && !isValidSecondImage){
            //     errors.second_image = 'La segunda imagen descriptiva no es válida.';
            // } 
            if (data.video && !isYoutubeVideoValid(data.video)) {
                errors.video = 'El enlace del vídeo ingresado no es válido.';
            }
            if (data.extra_information && !isPageValid(data.extra_information)) {
                errors.extra_information = 'El enlace ingresado no es válido.'
            } 
        } else if (type === 2){
            if (!data.problem || data.problem === ''){
                errors.problem = 'El problema es requerido.'
            }
        }
    }
    return errors;
}

export const setMethodologyTabs = ( type ) => {
    switch (type) {
        case 1:
            return {
                setAudios: {
                    recordTab: true,
                    selectAudioTab: false,
                },
                setFirstImage: {
                    firstImageUrlTab: true,
                    firstLocalImageTab: false, 
                },
                setSecondImage: {
                    secondImageUrlTab: true,
                    secondLocalImageTab: false,
                }
            }
        case 2:
            return {
                setImage: {
                    imageUrlTab: true,
                    localImageTab: false, 
                },
            }

        case 3:
            return {}
    
        default:
            return {}
    }
}

export const getErrorMessageForTab = ( errors, type ) => {
    let message = '';
    if (type === 1) {
        if (errors.written_conceptualization) {
            message = "Se debe ingresar una explicación escrita, por favor diríjase hacia [Explicación Escrita]"
        } else if (errors.example) {
            message = "Es importante contar con un ejemplo para implementar con esta metodología, por favor diríjase hacia [Desarrollo de Ejemplo]"
        } else if (
            errors.oral_conceptualization || 
            errors.first_image ||
            errors.second_image ||
            errors.video ||
            errors.extra_information
        ) {
            message = "Existen alguno/s campos los cuales no han sido completados o son inválidos, por favor diríjase hacia [Finalización del DUA]";
        }
    } else if (type === 2){
        if (errors.problem) {
            message = "Existe un campo muy importante que no ha sido llenado, por favor diríjase hace [Planteamiento del Problema]";
        }
    }

    return message
}

export const setNewValueOnMethodologyFields = ( data, newData, type, field) => {
    let newState = null;
    // if ( type === 1 ) {
    //     newState = {
    //         ...data,
    //         [ field ] : newData,
    //     }
    // }
    newState = {
        ...data,
        [ field ] : newData,
    }

    return {
        ...newState,
        errors: setErrorsMethodologyForm( newState, {}, type ),
    }
}

export const isImageUrlValid = ( url ) => new Promise((resolve, reject) => {
    // check that is a valid url
    // then if valid url
    const image = new Image();
    image.src = url;
    image.onload = resolve;
    image.onerror = reject;
});

export const isImgLink = (url) => {
    if (typeof url !== 'string') {
      return false;
    }
    return (url.match(/^http[^]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) !== null);
}

export const getBase64Image = (url, callback) => {
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const imageUrl = canvas.toDataURL("image/png");
        callback( imageUrl );
    }
    img.src = url
}

export const startRecording = async ( setRecorderState ) => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        setRecorderState( prevState => {
            return {
                ...prevState,
                initRecording: true,
                mediaStream: stream,
            }
        });

    } catch (error) {
        Swal.fire(
            'Error', 
            'No se encontró el Dispositivo de Entrada', 
            'error'
        );
    }
} 

export const saveRecording = ( recorder ) => {
    if (recorder.state !== 'inactive') recorder.stop(); 
}

// Don't use
export const formatSeconds = ( seconds ) => {
    if (seconds < 10) {
        return seconds = `0${seconds}`;
    } else if (seconds > 59) {
        return seconds = 0
    } else return seconds;
}

export const generateKey = () => {
    let text = '';
    let strs = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
        text += strs.charAt(Math.floor(Math.random() * strs.length));       
    }

    return text;
}

export const deleteAudio = (audioKey, setRecordings) => {
    setRecordings( prevState => prevState.filter( record => record.key !== audioKey ));
}

const getAlphabetArray = [
    "a","b","c","d","e","f","g","h","i","j","k","l","m",
    "n","o","p","q","r","s","u","v","w","x","y","z"
];

export const getLetterOfAlphabet = (index) => {
    if (index > 24) {
        return '';
    } else {
        return getAlphabetArray[index];
    }
} 

export const getActivityFinalValue = (questions) => {
    let finalValue = 0;
    questions.forEach( question => {
        if (question.value > 0) {
            finalValue = finalValue + question.value;
        }
    });
    return finalValue;
}

export const isDateValid = (start_at, end_at, type) => {
    if (type === 1) {
        if (end_at) {
            if ((start_at > end_at) || (start_at === end_at)) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    } else if (type === 2){
        if (start_at) {
            if ((end_at < start_at) || (start_at === end_at)) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }
}

export const getValidAudios = (files) => {
    let valid = true;
    let validAudios = [];
    let invalidAudios = [];
    files.forEach( file => {
        if (
            (file.type === 'audio/mpeg') || 
            (file.type === 'audio/ogg') || 
            (file.type === 'audio/wav')
        ) {
            validAudios.push(file);
        } else {
            valid = false;
            invalidAudios.push(file.name);
        }
    });

    return {valid, validAudios, invalidAudios};
}

export const isImageValid = (file) => {
    if (
        (file.type === 'image/gif') ||
        (file.type === 'image/jpeg') ||
        (file.type === 'image/png') ||
        (file.type === 'image/svg+xml') ||
        (file.type === 'image/webp')
    ) {
        return true;
    } else {
        return false;
    }
}

// export const getSelectAudiosList = (files) => {
//     let audios = [];
//     for (let index = 0; index < files.length; index++) {
//         audios = [...audios, files[index]]
//     }
//     return audios;
// }

export const setFileToUrlObject = (audios) => {
    let audiosUrl = []
    audios.forEach( audio => 
        audiosUrl.push({
            name: audio.name,
            size: audio.size,
            url: URL.createObjectURL(audio)
        })
    );
    return audiosUrl;
}

export const setNewAudiosToCurrentList = (currentAudios, newList) => {
    let newAudios = [];
    newList.forEach( file => {
        let testAudio = currentAudios.find( audio => audio.name === file.name);
        if (!testAudio) {
            newAudios.push(file);
        }
    });
    newAudios.forEach(audio => {
        currentAudios.push({
            name: audio.name,
            size: audio.size,
            url: URL.createObjectURL(audio)
        });
    });

    return currentAudios;
}

export const isYoutubeVideoValid = ( url ) => {
    const reg = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
    return !!url?.match(reg);
}

export const getYotubeVideoId = ( url ) => {
    if (url) {
        return url.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/);
    } 
    return;
}

export const isPageValid = (url) => {
   const reg = new RegExp('^(https?:\\/\\/)?'+ // protocol
   '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
   '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
   '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
   '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
   '(\\#[-a-z\\d_]*)?$','i');
   return !!url?.match(reg);
}

export const existsModeratorInGroup = (moderators) => {
    let exists = false;
    moderators.forEach(moderator => {
        if (moderator.studentSwitch) {
            exists = true;
        }
    });
    return exists;
}

export const initialStateSaveTopic = () => ({
    isMethodologySave: false,
    isStudentsSave: false,
    isCalificationSave: false
});

// Rubric Validate Methods
export const getValueByPorcent = ( finalValue, porcent ) => {
    if (
        (finalValue && porcent) ||
        finalValue > 0 ||
        porcent > 0    
    ) {
        // console.log((finalValue * porcent)/100, 'result');
        return parseFloat(((finalValue * porcent)/100).toFixed(2));
    } else {
        return 0;
    }
}

export const arePorcentsValid = (values) => {
    const {
        methodology,
        individual,
        team,
        autoevaluation,
        coevaluation,
    } = values;

    const result = (
        methodology.methodology_porcent_detail + 
        individual.individual_porcent_detail +
        team.team_porcent_detail +
        autoevaluation.autoevaluation_porcent_detail +
        coevaluation.coevaluation_porcent_detail    
    );
    if (result === 100) {
        return true;
    } else {
        return false;
    }

}

export const getErrorsFromRubricForm = (errors) => {
    let errorMessage = '';

    if (errors.abp_final_value) {
        errorMessage = 'El campo de ingreso de la nota final tiene un error.';
    } else if (
        errors.abp_title_detail ||
        errors.abp_porcent_detail ||
        errors.abp_value_detail
    ) {
        errorMessage = 'La Rúbrica [Resolución de Problemas] contiene error/es.';
    } else if (
        errors.individual_title_detail ||
        errors.individual_porcent_detail ||
        errors.individual_value_detail
    ) {
        errorMessage = 'La Rúbrica [Desempeño Individual] contiene error/es.';
    } else if (
        errors.team_title_detail ||
        errors.team_porcent_detail ||
        errors.team_value_detail
    ) {
        errorMessage = 'La Rúbrica [Desempeño Grupal] contiene error/es.';
    } else if (
        errors.autoevaluation_title_detail ||
        errors.autoevaluation_porcent_detail ||
        errors.autoevaluation_value_detail
    ) {
        errorMessage = 'La Rúbrica [Autoevaluación] contiene error/es.';
    } else if (
        errors.coevaluation_title_detail ||
        errors.coevaluation_porcent_detail ||
        errors.coevaluation_value_detail
    ) {
        errorMessage = 'La Rúbrica [Coevaluación] contiene error/es.';
    }

    return errorMessage;
}

export const getHelpRubricMessage = (type) => {
    if (type) {
        if (type === 'abp') {
            return 'Es importante considerar los puntos más relevantes que engloben la ' + 
            'resolución del problema planteado, de tal manera esto conlleve en una mejor ' + 
            'orientación al estudiante y a una evaluación objetiva.'
        } else if (type === 'individual') {
            return 'Es el trabajo que un estudiante genera como producto de sus ' + 
            'actividades para la solución del problema y como parte de un equipo.'
        } else if (type === 'team') {
            return 'Es semejante al trabajo o aporte individual, pero ahora como resultado ' + 
            'del trabajo conjunto del equipo.'
        } else if (type === 'autoevaluation') {
            return 'Es la evaluación que hace el estudiante sobre sí mismo con base en una ' +
            'reflexión de lo que ha aprendido y su contraste con los objetivos del problema o ' + 
            'curso.'
        } else if (type === 'coevaluation') {
            return 'Es la evaluación que hace un estudiante a sus compañeros, en base a una ' + 
            'tabla de características y nivel de desempeño.'
        }
    } else {
        return '';
    }
} 

// END Rubric Validate Methods

export const changeTopicsDates = ( topics ) => {
    for (let index = 0; index < topics.length; index++) {
        if (topics[index].start_at) {
            topics[index].init_hour = moment(topics[index].start_at).format('HH:mm');
            topics[index].start_at = moment(topics[index].start_at).format('DD-MM-YYYY');
        }

        if (topics[index].end_at) {
            topics[index].end_hour = moment(topics[index].end_at).format('HH:mm');
            topics[index].end_at = moment(topics[index].end_at).format('DD-MM-YYYY');
        }
    }
    return topics;
} 

export const getMethodologyNameType = ( type ) => {
    if (type) {
        if (type === 1) {
            return 'Diseño Universal de Aprendizaje (DUA)'
        } else if (type === 2) {
            return 'Aprendizaje Basado en Problemas (ABP)'
        } else if (type === 3) {
            return 'Aprendizaje Cooperativo (AC)'
        }
    } else {
        return ''
    }
}

export const getMethodologyAbrevNameType = ( type ) => {
    if (type) {
        if (type === 1) {
            return 'DUA'
        } else if (type === 2) {
            return 'ABP'
        } else if (type === 3) {
            return 'AC'
        }
    } else {
        return ''
    }
}

// Student Topics

export const setActiveTopicsForStudents = ( topics ) => {
    return topics.filter( topic => topic.active !== 'Bloqueado');
}

export const emptyHeaderRender = (
    <div id="toolbar">
    </div>
)

export const emptySecondHeaderRender = () => (
    <div className="ql-formats">
    </div>
);

export const renderEditorHeaderWithoutImage = (
    <div id="toolbar">
      <span className="ql-formats">
        <select className="ql-font" defaultValue={'sans-serif'}>
            <option value="sans-serif" ></option>
            <option value="serif"></option>
            <option value="monospace"></option>
        </select>
        <select className="ql-header" defaultValue={'normal'}>
            <option value="1" ></option>
            <option value="2"></option>
            <option value="3"></option>
            <option value="4"></option>
            <option value="5"></option>
            <option value="6"></option>
            <option value="normal"></option>
        </select>
        <select className="ql-size" defaultValue={'normal'}>
            <option value="small" ></option>
            <option value="normal"></option>
            <option value="large"></option>
            <option value="huge"></option>
        </select>
      </span>
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Blod"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>   
        <button className="ql-strike" aria-label="Strike"></button>   
      </span>
      <span className="ql-formats"> 
          <button className="ql-script" value={'sub'} aria-label="Script Sub"></button>   
          <button className="ql-script" value={'super'} aria-label="Script Super"></button> 
      </span>
      <span className="ql-formats">
        <select className="ql-align" defaultValue={'normal'}></select>
      </span>
      <br/>
      <span className="ql-formats"> 
          <button className="ql-indent" value={'+1'} aria-label="Indent Plus"></button>   
          <button className="ql-indent" value={'-1'} aria-label="Indent Minus"></button> 
      </span>
      <span className="ql-formats"> 
        
        <button className="ql-list" value={'ordered'}></button>   
        <button className="ql-list" value={'bullet'}></button> 
      </span>
      <span className="ql-formats">  
        <button className="ql-color" aria-label="Color"></button>   
        <button className="ql-background" aria-label="Background"></button>   
      </span>
      <span className="ql-formats">
        <button className="ql-blockquote" aria-label="Blockquote"></button> 
      </span>
      <span className="ql-formats">  
        <button className="ql-clean" aria-label="Clean"></button>    
      </span>
      {/* <button className="ql-code" aria-label="Code"></button>    */}
        {/* <button className="ql-link" aria-label="Link"></button>    */}
        {/* <button className="ql-script" aria-label="Script"></button>    */}
        {/* <button className="ql-code-block" aria-label="Code Block"></button>    */}
    </div>
  ); 

  export const renderEditorHeaderWithImage = (
    <div id="toolbar">
      <span className="ql-formats">
        <select className="ql-font" defaultValue={'sans-serif'}>
            <option value="sans-serif" ></option>
            <option value="serif"></option>
            <option value="monospace"></option>
        </select>
        <select className="ql-header" defaultValue={'normal'}>
            <option value="1" ></option>
            <option value="2"></option>
            <option value="3"></option>
            <option value="4"></option>
            <option value="5"></option>
            <option value="6"></option>
            <option value="normal"></option>
        </select>
        <select className="ql-size" defaultValue={'normal'}>
            <option value="small" ></option>
            <option value="normal"></option>
            <option value="large"></option>
            <option value="huge"></option>
        </select>
      </span>
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Blod"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>   
        <button className="ql-strike" aria-label="Strike"></button>   
      </span>
      <span className="ql-formats"> 
          <button className="ql-script" value={'sub'} aria-label="Script Sub"></button>   
          <button className="ql-script" value={'super'} aria-label="Script Super"></button> 
      </span>
      <span className="ql-formats">
        <select className="ql-align" defaultValue={'normal'}></select>
      </span>
      <br/>
      <span className="ql-formats"> 
          <button className="ql-indent" value={'+1'} aria-label="Indent Plus"></button>   
          <button className="ql-indent" value={'-1'} aria-label="Indent Minus"></button> 
      </span>
      <span className="ql-formats"> 
        <button className="ql-list" value={'ordered'}></button>   
        <button className="ql-list" value={'bullet'}></button> 
      </span>
      <span className="ql-formats">  
        <button className="ql-color" aria-label="Color"></button>   
        <button className="ql-background" aria-label="Background"></button>   
      </span>
      <span className="ql-formats">
        <button className="ql-blockquote" aria-label="Blockquote"></button> 
      </span>
      <span className="ql-formats">  
        <button className="ql-link" aria-label="Link"></button>    
        <button className="ql-image" aria-label="Image"></button>    
      </span>
      <span className="ql-formats">  
        <button className="ql-clean" aria-label="Clean"></button>    
      </span>
    </div>
  ); 

  export const toolbarOptionsWithoutImage = [
    [
        {'font': []}, 
        { 'header': [1, 2, 3, 4, 5, 6, false] },
        { 'size': ['small', false, 'large', 'huge'] }
    ],
    
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript

    [{ 'align': [] }],
    
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    ['blockquote'],

    ['link'],
  
    ['clean']                                          // remove formatting button
  ];

  export const toolbarOptions = [
    [
        {'font': []}, 
        { 'header': [1, 2, 3, 4, 5, 6, false] },
        { 'size': ['small', false, 'large', 'huge'] }
    ],
    
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript

    [{ 'align': [] }],
    
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    ['blockquote'],

    ['link', 'image'],
  
    ['clean']                                         // remove formatting button
  ];

  export const modules = {
    toolbar: toolbarOptionsWithoutImage
  }

  export const getImgUrls = (delta) => delta.ops.filter(
    i => i.insert && i.insert.image
  ).map(i => i.insert.image);

  export const loadSchoolData = ( schoolPeriodName, topic, isStudent ) => ({
    schoolPeriod: schoolPeriodName,
    classroom: topic.classroom.name,
    asignature: topic.asignature.name,
    type: getMethodologyAbrevNameType(topic.type),
    title: topic.title,
    isStudent
  });

  // ----- TOPIC -----------
  export const showMessageComponent = ( msgRef, severity, detail, sticky ) => {
    msgRef.current.show({
        severity,
        detail,
        sticky
      });
  }