import {
  getInitialData,
  saveQuestion,
  saveQuestionAnswer as saveAnswer,
} from '../utils/api'
import { receiveUsers, addUserQuestion, saveUserAnswer } from './users'
import { receiveQuestions, addQuestion, saveQuestionAnswer } from './questions'

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users))
      dispatch(receiveQuestions(questions))
    })
  }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    }).then((question) => {
      dispatch(addQuestion(question))
      dispatch(addUserQuestion(authedUser, question.id))
    })
  }
}

export function handleAnswer(qid, option) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    const info = {
      authedUser,
      qid,
      answer: option,
    }
    saveAnswer(info).then(() => {
      dispatch(saveQuestionAnswer(authedUser, qid, option))
      dispatch(saveUserAnswer(authedUser, qid, option))
    })
  }
}
