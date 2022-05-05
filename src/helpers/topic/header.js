
// ---- LEFT MAIN HEADER ----

export const setClassroomTopicDropdown = ( values ) => {
  return values.map( value => ({
    name: value.name,
    value: value.id  
  }));
}

export const getSelectedClassroomData = ( classrooms, classroomId ) => {
  let classroom = {};
  classrooms.forEach( data => {
    if (data.id === classroomId) {
      classroom = data
    }
  });
  return classroom;
} 

export const setAsignatureTopicDropdown = ( values ) => {
  return values.map( asignature_detail => ({
    name: asignature_detail.asignature.name,
    value: asignature_detail.asignature.id
  }));
}

export const getTopicMethodologyTypeList = (asignaturesDetail, asignatureId) => {
  let field;
  asignaturesDetail.forEach( asignatureDetail => {
    if (asignatureDetail.asignature.id === asignatureId) {
      field = asignatureDetail.asignature.type;
    }
  });

  if ( field ) {
    switch (field) {
      case 'Matematicas':
        return [
            {name: 'Diseño Universal de Aprendizaje', value: 1},
            {name: 'Aprendizaje Basado en Problemas', value: 2},
        ];
      case 'Ciencias':
        return [
            {name: 'Diseño Universal de Aprendizaje', value: 1},
            {name: 'Aprendizaje Cooperativo', value: 3},
        ];
      case 'Interdisciplinar':
        return [
            {name: 'Diseño Universal de Aprendizaje', value: 1},
            {name: 'Aprendizaje Basado en Problemas', value: 2},
        ];
      case 'Otro':
        return [
          {name: 'Diseño Universal de Aprendizaje', value: 1}
        ];
      default:
        return [
          {name: 'Diseño Universal de Aprendizaje', value: 1}
        ];
    }
  } else {
      return [];
  }
}

export const getLocalImages = ( field, tab ) => {
  let pathImages = {
    firstImageEditor: null,
    secondImageEditor: null,
    thirdImageEditor: null
  };
  if (tab) {
    pathImages.firstImageEditor = localStorage.getItem(`${field}Path`);
    localStorage.removeItem(`${field}Path`);
  } else {
    pathImages.firstImageEditor = localStorage.getItem(`${field}1`);
    pathImages.secondImageEditor = localStorage.getItem(`${field}2`);
    pathImages.thirdImageEditor = localStorage.getItem(`${field}3`);
    localStorage.removeItem(`${field}1`);
    localStorage.removeItem(`${field}2`);
    localStorage.removeItem(`${field}3`);
  }
  return pathImages;
}

export const getLocalAudio = ( field, num ) => {
  let localAudio = localStorage.getItem(`${field}${num}`);
  localStorage.removeItem(`${field}${num}`);
  return localAudio;
}

export const clearLocalStorageEditorImage = ( field ) => {
  localStorage.removeItem(`${field}1`);
  localStorage.removeItem(`${field}2`);
  localStorage.removeItem(`${field}3`);
}

export const clearLocalStorageTabImage = ( field ) => {
  localStorage.removeItem(`${field}Path`);
}

export const getClearLocalStorageAudio = ( field ) => {
  localStorage.removeItem(`${field}1`);
  localStorage.removeItem(`${field}2`);
  localStorage.removeItem(`${field}3`);
  localStorage.removeItem(`${field}4`);
}

// ---- END ----

// ---- RIGHT ----

export const getMethodologyTypeObject = ( methodology ) => {
  let methodologySelected = {};
    if (methodology === 1) {
      methodologySelected = {
        name: 'Diseño Universal de Aprendizaje',
        abbrev: 'DUA'
      };
    } else if (methodology === 2) {
      methodologySelected = {
        name: 'Aprendizaje Basado en Problemas',
        abbrev: 'ABP'
      };
    } else if (methodology === 3) {
      methodologySelected = {
        name: 'Aprendizaje Cooperativo',
        abbrev: 'AC'
      };
    }
  return methodologySelected;
}

export const getTopicObject = ( 
  classrooms, 
  asignatures_detail, 
  methodologyChoice,
  classroom_id,
  asignature_detail_id 
) => {
  let classroom = {};
  let asignature_detail = {};
  let methodology = {};
  classrooms.forEach( data => {
    if ( data.id === classroom_id ) {
      classroom = data;
    }
  });
  asignatures_detail.forEach( data => {
    if ( data.asignature.id === asignature_detail_id ) {
      asignature_detail = data.asignature;
    }
  });
  methodology = getMethodologyTypeObject(methodologyChoice);
  return { classroom, asignature_detail, methodology }

}

export const headerDialog = ( selectedMethodology, isCreate ) => (
  <div className="p-grid p-justify-end">
    <h5 className='p-col-6'>
      {
        isCreate
          ? selectedMethodology === 1
            ? ('Asignar Estudiantes al Tópico')
            : ('Crear Grupos de Trabajo')
          : selectedMethodology === 1
            ? ('Crear Nueva Actividad')
            : ('Crear Rúbrica de Calificación')
      }
    </h5>
  </div>
);

// ---- END ----
