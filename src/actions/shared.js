import {
  getInitialData,
  saveQuestion,
  saveQuestionAnswer as saveAnswer,
} from '../utils/api'
import { receiveUsers, addUserQuestion, saveUserAnswer } from './users'
import { receiveQuestions, addQuestion, saveQuestionAnswer } from './questions'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users))
      dispatch(receiveQuestions(questions))
      dispatch(hideLoading())
    })
  }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    const { authedUser } = getState()
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    }).then((question) => {
      dispatch(addQuestion(question))
      dispatch(addUserQuestion(authedUser, question.id))
      dispatch(hideLoading())
    })
  }
}

export function handleAnswer(qid, option) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    const { authedUser } = getState()
    const info = {
      authedUser,
      qid,
      answer: option,
    }
    saveAnswer(info).then(() => {
      dispatch(saveQuestionAnswer(authedUser, qid, option))
      dispatch(saveUserAnswer(authedUser, qid, option))
      dispatch(hideLoading())
    })
  }
}
