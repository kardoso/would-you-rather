export const ADD_ANSWER = 'ADD_ANSWER'

function addAnswer(answer) {
  return {
    type: ADD_ANSWER,
    answer,
  }
}

export function handleAddAnswer({ questionId, answer }) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    return addAnswer({
      authedUser,
      qid: questionId,
      answer,
    }).then((answer) => dispatch(addAnswer(answer)))
  }
}
