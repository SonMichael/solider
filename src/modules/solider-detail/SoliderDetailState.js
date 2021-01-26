import { Platform } from 'react-native'
import orderBy from 'lodash/orderBy'
import isEmpty from 'lodash/isEmpty'
import { apiService } from '../../services'


const HOME_STATE_GET_LIST_SOLID_DATA_DETAIL_REQUEST = 'HOME_STATE_GET_LIST_SOLID_DATA_DETAIL_REQUEST'
const HOME_STATE_GET_LIST_SOLID_DATA_DETAIL_SUCCESS = 'HOME_STATE_GET_LIST_SOLID_DATA_DETAIL_SUCCESS'
const HOME_STATE_GET_LIST_SOLID_DATA_DETAIL_FAILURE = 'HOME_STATE_GET_LIST_SOLID_DATA_DETAIL_FAILURE'

const API_GET_LIST_SOLID_DATA_DETAIL = 'v1/guest/get-so-detail-data'

export function getSolidDataDetail(_id) {

  return (dispatch, getState) => new Promise((resolve, reject) => {
    dispatch({ type: HOME_STATE_GET_LIST_SOLID_DATA_DETAIL_REQUEST })
    apiService.get(API_GET_LIST_SOLID_DATA_DETAIL, {_id}, '').then(
      responseData => {
        if (!responseData.success) {
          reject(responseData.data)
          return dispatch({
            type: HOME_STATE_GET_LIST_SOLID_DATA_DETAIL_FAILURE,
            error: responseData.data,
          })
        }
        dispatch({ type: HOME_STATE_GET_LIST_SOLID_DATA_DETAIL_SUCCESS, data: responseData })
        return resolve(responseData)
      },
      error => {
        console.log(error.message)
        dispatch({ type: HOME_STATE_GET_LIST_SOLID_DATA_DETAIL_FAILURE, error })
      },
    )
  })
}

const defaultState = {
  solidDetail: [],
};

export default function CalendarStateReducer(state = defaultState, action) {
  switch (action.type) {
    case HOME_STATE_GET_LIST_SOLID_DATA_DETAIL_SUCCESS:
      return  {
        ...state,
          solidDetail: action.data,
      }
      break;
    default:
      return state;
  }
}
