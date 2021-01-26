import Moment from 'moment'
import _ from 'lodash'

export default {
  convertToDate,
  getCurrentDate,
  getCountDownRemainingTime
}


function convertToDate(timeStamp, format = 'H[h]mm, DD.MM.YYYY', locale) {
  if (!timeStamp) {
    return
  }
  if (locale) {
    Moment.locale(locale)
  }
  const dateTime = Moment(timeStamp * 1000)
  return dateTime.format(format)
}

function getCurrentDate() {
  const today = new Date()
  const date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
  return date
}

function getCountDownRemainingTime (timeStamp) {
  if(_.isEmpty(timeStamp)) {
    return ''
  }
  const dateFuture = new Date(timeStamp * 1000)
  const dateNow = new Date()
  const seconds = Math.floor((dateFuture - dateNow) / 1000)
  return seconds
}


