
export const getAutoevaluationAc = ( evaluations, type ) => {
  let autoevaluation = {};
  evaluations.forEach( evaluation => {
    if (evaluation.evaluation_type === type) {
      autoevaluation = evaluation;
    }
  });
  return autoevaluation;
}

export const getCurrentSectionRubric = ( rubrics, title ) => {
  let currentRubric = {};
  rubrics.forEach( rubric => {
    if (rubric.detail_title === title) {
      currentRubric = rubric;
    }
  });
  return currentRubric;
}