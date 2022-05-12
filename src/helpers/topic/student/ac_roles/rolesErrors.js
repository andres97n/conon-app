import { DateTime } from "luxon";

export const getAcObjectWithId = ( data, acObject ) => {
  if (typeof data === 'number') {
    return [{ 
      ...acObject, 
      id: data,
      created_at: DateTime.now().toISO()
    }];
  } else if (Array.isArray(data)) {
    return data;
  }
  return [];
}

export const getAcQuestiontWithId = ( data, acObject ) => {
  if (typeof data === 'number') {
    return [{
      question: {
        ...acObject, 
        id: data,
        created_at: DateTime.now().toISO()
      },
      answer: {}
    }];
  } else if (Array.isArray(data)) {
    return data.map( item => ({
      question: item,
      answer: {}
    }));
  }
  return [];
}

export const getCoordinatorStrategyAcErrorMessage = ( detail ) => {
  if ( detail.team_detail_ac ) {
    return detail.team_detail_ac[0]
  } else if ( detail.strategy ) {
    return detail.strategy[0]
  } else if ( detail.active ) {
    return detail.active[0]
  } else {
    return 'Error, consulte con el Administrador.';
  }
}

export const getMemberPerformanceCoordinatorAcErrorMessage = ( detail ) => {
  if ( detail.team_detail_ac ) {
    return detail.team_detail_ac[0]
  } else if ( detail.member_ac ) {
    return detail.member_ac[0]
  } else if ( detail.member_assessment ) {
    return detail.member_assessment[0]
  } else if ( detail.active ) {
    return detail.active[0]
  } else {
    return 'Error, consulte con el Administrador.';
  }
}

export const getProblemResolutionGroupAcErrorMessage = ( detail ) => {
  if ( detail.team_ac ) {
    return detail.team_ac[0]
  } else if ( detail.problem_resolution ) {
    return detail.problem_resolution[0]
  } else if ( detail.references_images ) {
    return detail.references_images[0]
  } else if ( detail.observations ) {
    return detail.observations[0]
  } else if ( detail.active ) {
    return detail.active[0]
  } else {
    return 'Error, consulte con el Administrador.';
  }
}

export const getOrganizerActionAcErrorMessage = ( detail ) => {
  if ( detail.team_detail_ac ) {
    return detail.team_detail_ac[0]
  } else if ( detail.action ) {
    return detail.action[0]
  } else if ( detail.active ) {
    return detail.active[0]
  } else {
    return 'Error, consulte con el Administrador.';
  }
}

export const getAssignActivityOrganizerAcErrorMessage = ( detail ) => {
  if ( detail.team_detail_ac ) {
    return detail.team_detail_ac[0]
  } else if ( detail.member_ac ) {
    return detail.member_ac[0]
  } else if ( detail.member_activity ) {
    return detail.member_activity[0]
  } else if ( detail.active ) {
    return detail.active[0]
  } else {
    return 'Error, consulte con el Administrador.';
  }
}

export const getDescribeUnderstadingOrganizerAcErrorMessage = ( detail ) => {
  if ( detail.team_detail_ac ) {
    return detail.team_detail_ac[0]
  } else if ( detail.member_ac ) {
    return detail.member_ac[0]
  } else if ( detail.member_assessment ) {
    return detail.member_assessment[0]
  } else if ( detail.understanding ) {
    return detail.understanding[0]
  } else if ( detail.active ) {
    return detail.active[0]
  } else {
    return 'Error, consulte con el Administrador.';
  }
}

export const getSpokesmanQuestionAcErrorMessage = ( detail ) => {
  if ( detail.team_detail_ac ) {
    return detail.team_detail_ac[0]
  } else if ( detail.spokesman_question ) {
    return detail.spokesman_question[0]
  } else if ( detail.active ) {
    return detail.active[0]
  } else {
    return 'Error, consulte con el Administrador.';
  }
}

export const getActivityDescriptionSpokesmanAcErrorMessage = ( detail ) => {
  if ( detail.team_detail_ac ) {
    return detail.team_detail_ac[0]
  } else if ( detail.member_ac ) {
    return detail.member_ac[0]
  } else if ( detail.activity_description ) {
    return detail.activity_description[0]
  } else if ( detail.active ) {
    return detail.active[0]
  } else {
    return 'Error, consulte con el Administrador.';
  }
}

export const getPerformanceDescriptionSpokesmanAcErrorMessage = ( detail ) => {
  if ( detail.team_detail_ac ) {
    return detail.team_detail_ac[0]
  } else if ( detail.performance_description ) {
    return detail.performance_description[0]
  } else if ( detail.oral_description ) {
    return detail.oral_description[0]
  } else if ( detail.active ) {
    return detail.active[0]
  } else {
    return 'Error, consulte con el Administrador.';
  }
}

export const getSecretaryInformationAcErrorMessage = ( detail ) => {
  if ( detail.team_detail_ac ) {
    return detail.team_detail_ac[0]
  } else if ( detail.external_path ) {
    return detail.external_path[0]
  } else if ( detail.active ) {
    return detail.active[0]
  } else {
    return 'Error, consulte con el Administrador.';
  }
}

export const getFeaturedInformationSecretaryAcErrorMessage = ( detail ) => {
  if ( detail.team_detail_ac ) {
    return detail.team_detail_ac[0]
  } else if ( detail.member_ac ) {
    return detail.member_ac[0]
  } else if ( detail.external_path ) {
    return detail.external_path[0]
  } else if ( detail.description_path ) {
    return detail.description_path[0]
  } else if ( detail.active ) {
    return detail.active[0]
  } else {
    return 'Error, consulte con el Administrador.';
  }
}

export const getTeacherAnswerAcErrorMessage = ( detail ) => {
  if ( detail.teacher ) {
    return detail.teacher[0]
  } else if ( detail.spokesman_question_ac ) {
    return detail.spokesman_question_ac[0]
  } else if ( detail.teacher_answer ) {
    return detail.teacher_answer[0]
  } else if ( detail.active ) {
    return detail.active[0]
  } else {
    return 'Error, consulte con el Administrador.';
  }
}

export const getTeacherAnswerDescriptionSecretaryAcErrorMessage = ( detail ) => {
  if ( detail.team_detail_ac ) {
    return detail.team_detail_ac[0]
  } else if ( detail.teacher_answer_ac ) {
    return detail.teacher_answer_ac[0]
  } else if ( detail.teacher_answer_description ) {
    return detail.teacher_answer_description[0]
  } else if ( detail.active ) {
    return detail.active[0]
  } else {
    return 'Error, consulte con el Administrador.';
  }
}
