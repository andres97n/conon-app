
export const existsQuestionInAnswers = ( answers, questionId ) => {
  let exist = false;
  if (answers.length > 0) {
    answers.forEach( 
      answer => answer.question_step_one_abp.id === questionId && (exist = true)
    );
  }
  return exist;
} 