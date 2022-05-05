
export const getAcErrorMessage = ( detail ) => {
  if ( detail.topic ) {
    return detail.topic[0]
  } else if ( detail.real_problem ) {
    return detail.real_problem[0]
  } else if ( detail.context_video ) {
    return detail.context_video[0]
  } else if ( detail.path_reference ) {
    return detail.path_reference[0]
  } else if ( detail.context_audio ) {
    return detail.context_audio[0]
  } else if (detail.state) {
    return detail.state[0]
  } else {
    return 'Error, consulte con el Administrador.';
  }
}

export const getTeamAcErrorMessage = ( detail ) => {
  if ( detail.ac ) {
    return detail.ac[0]
  } else if ( detail.active ) {
    return detail.active[0]
  } else {
    return 'Error, consulte con el Administrador.';
  }
}

export const getTeamDetailAcErrorMessage = ( detail ) => {
  if ( detail.team_ac ) {
    return detail.team_ac[0]
  } else if ( detail.owner ) {
    return detail.owner[0]
  } else if ( detail.role_type ) {
    return detail.role_type[0]
  }else if (detail.active) {
    return detail.active[0]
  } else {
    return 'Error, consulte con el Administrador.';
  }
}

export const getRubricAcErrorMessage = ( detail ) => {
  if ( detail.ac ) {
    return detail.ac[0]
  } else if ( detail.description_rubric ) {
    return detail.description_rubric[0]
  } else if ( detail.ac_final_value ) {
    return detail.ac_final_value[0]
  } else if ( detail.observations ) {
    return detail.observations[0]
  } else if (detail.state) {
    return detail.state[0]
  } else {
    return 'Error, consulte con el Administrador.';
  }
}

export const getRubricDetailAcErrorMessage = ( detail ) => {
  if ( detail.rubric_ac ) {
    return detail.rubric_ac[0]
  } else if ( detail.detail_title ) {
    return detail.detail_title[0]
  } else if ( detail.detail_description ) {
    return detail.detail_description[0]
  } else if ( detail.percentage_grade ) {
    return detail.percentage_grade[0]
  } else if (detail.rating_value) {
    return detail.rating_value[0]
  } else {
    return 'Error, consulte con el Administrador.';
  }
}

export const getEvaluationAcErrorMessage = ( detail ) => {
  if ( detail.rubric_ac ) {
    return detail.rubric_ac[0]
  } else if ( detail.team_detail_ac ) {
    return detail.team_detail_ac[0]
  } else if ( detail.detail_description ) {
    return detail.detail_description[0]
  } else if ( detail.evaluation_type ) {
    return detail.evaluation_type[0]
  } else if (detail.final_value) {
    return detail.final_value[0]
  } else if (detail.state) {
    return detail.state[0]
  } else if (detail.observations) {
    return detail.observations[0]
  } else {
    return 'Error, consulte con el Administrador.';
  }
}

export const getEvaluationDetailAcErrorMessage = ( detail ) => {
  if ( detail.rubric_detail_ac ) {
    return detail.rubric_detail_ac[0]
  } else if ( detail.student_evaluation_ac ) {
    return detail.student_evaluation_ac[0]
  } else if ( detail.detail_value ) {
    return detail.detail_value[0]
  } else if ( detail.active ) {
    return detail.active[0]
  } else {
    return 'Error, consulte con el Administrador.';
  }
}

export const getTeamDetailsAcWithTeamAcId = ( teamDetailsAc, teamAcId ) => {
  return teamDetailsAc.map( teamDetail => ({
    team_ac: teamAcId,
    ...teamDetail
  }));
}

export const getRubricDetailsAcWithTeamAcId = ( rubricDetailsAc, rubricAcId ) => {
  return rubricDetailsAc.map( rubricDetailAc => ({
    rubric_ac: rubricAcId,
    ...rubricDetailAc
  }));
}

export const getEvaluationDetailsAcWithEvaluationAcId = ( 
  evaluationDetailsAc, evaluationAcId 
) => {
  return evaluationDetailsAc.map( evaluationDetail => ({
    student_evaluation_ac: evaluationAcId,
    ...evaluationDetail
  }));
}