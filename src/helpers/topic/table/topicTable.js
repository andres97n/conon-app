import { confirmDialog } from "primereact/confirmdialog";


export const getConfirmTopicMessage = ( 
  msg, panel, accept, reject, acceptButton, callback, arg 
) => {
  confirmDialog({
    message: (msg),
    header: panel,
    icon: 'fas fa-exclamation-triangle',
    acceptLabel: accept,
    rejectLabel: reject,
    acceptClassName: acceptButton,
    accept: () => callback(arg)
  });
}

export const getStepLabel = ( step ) => {
  switch (step) {
    case 1:
      return 'Paso 1';
    case 2:
      return 'Paso 2';
    case 3:
      return 'Paso 3';
    case 4:
      return 'Paso 4';
    case 5:
      return 'Paso 5';
    case 6:
      return 'Paso 6';
    case 7:
      return 'Paso 7';
    case 8:
      return 'Paso 8';
    case 9:
        return 'Metodología Finalizada';
    default:
      return 'Paso 1';
  }
}

export const getQualifySections = ( rubrics, evaluations ) => {
  let qualifySections = [];
  if (evaluations.length > 0) {
    rubrics.forEach( (rubric, index) => {
      evaluations.forEach( evaluation => {
        if (rubric.rubric_detail_abp.title === evaluation.title_evaluation_detail) {
          qualifySections = [ ...qualifySections, {
            rubric_detail_abp: rubric.rubric_detail_abp,
            evaluation_detail_abp: evaluation
          }];
        }
      });
      if (qualifySections.length !== index + 1) {
        qualifySections = [ ...qualifySections, {
          rubric_detail_abp: rubric.rubric_detail_abp,
          evaluation_detail_abp: {}
        }];
      }
    });
  } else {
    rubrics.forEach( rubric => {
      qualifySections = [ ...qualifySections, {
        rubric_detail_abp: rubric.rubric_detail_abp,
        evaluation_detail_abp: {}
      }];
    });
  }
  return qualifySections;
}

export const getIconRole = (role) => {
  if (role === 1) {
    return 'fas fa-user-cog mr-2';
  } else if (role === 2) {
    return 'fas fa-bullhorn mr-2';
  } else if (role === 3) {
    return 'fas fa-hand-pointer mr-2';
  } else if (role === 4) {
    return 'fas fa-address-book mr-2';
  } else {
    return 'fas fa-user-cog mr-2';
  }
}

export const getLabelRole = ( role ) => {
  if (role === 1) {
    return 'Coordinador';
  } else if (role === 2) {
    return 'Portavoz';
  } else if (role === 3) {
    return 'Organizador';
  } else if (role === 4) {
    return 'Secretario';
  } else {
    return 'Coordinador';
  }
}

export const getAcQualifySections = ( rubrics, evaluations ) => {
  let qualifySections = [];
  if (evaluations.length > 0) {
    rubrics.forEach( (rubric, index) => {
      evaluations.forEach( evaluation => {
        if (rubric.id === evaluation.rubric_detail_ac) {
          qualifySections = [ ...qualifySections, {
            rubric_detail_ac: rubric,
            evaluation_detail_ac: evaluation
          }];
        }
      });
      if (qualifySections.length !== index + 1) {
        qualifySections = [ ...qualifySections, {
          rubric_detail_ac: rubric,
          evaluation_detail_ac: {}
        }];
      }
    });
  } else {
    rubrics.forEach( rubric => {
      qualifySections = [ ...qualifySections, {
        rubric_detail_ac: rubric,
        evaluation_detail_ac: {}
      }];
    });
  }
  return qualifySections;
}

export const getTopicPath = ( schoolData, isTeacher ) => {
  let path = '';
  if (isTeacher) {
    path = `/CONON_DATA/${schoolData.schoolPeriod}/${schoolData.classroom}/${schoolData.asignature}/${schoolData.type}/${schoolData.title}/Docente`;
    
  } else {
    path = `/CONON_DATA/${schoolData.schoolPeriod}/${schoolData.classroom}/${schoolData.asignature}/${schoolData.type}/${schoolData.title}/Estudiante`;
  }
  return path
}