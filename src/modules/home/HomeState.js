import { Platform } from 'react-native'
import orderBy from 'lodash/orderBy'
import isEmpty from 'lodash/isEmpty'
import { apiService } from '../../services'

const HOME_STATE_GET_LIST_SOLID_DATA_REQUEST = 'HOME_STATE_GET_LIST_SOLID_DATA_REQUEST'
const HOME_STATE_GET_LIST_SOLID_DATA_SUCCESS = 'HOME_STATE_GET_LIST_SOLID_DATA_SUCCESS'
const HOME_STATE_GET_LIST_SOLID_DATA_FAILURE = 'HOME_STATE_GET_LIST_SOLID_DATA_FAILURE'

const API_GET_LIST_SOLID_DATA = 'v1/guest/get-list-so-data'

export function getSolidData(solidName= '') {

  const getData = {
      page_size: 100,
      current_page: 0,
      name: solidName

  }
  return (dispatch, getState) => new Promise((resolve, reject) => {
    dispatch({ type: HOME_STATE_GET_LIST_SOLID_DATA_REQUEST })
    apiService.get(API_GET_LIST_SOLID_DATA, getData, '').then(
      responseData => {
        if (!responseData.success) {
          reject(responseData.data)
          return dispatch({
            type: HOME_STATE_GET_LIST_SOLID_DATA_FAILURE,
            error: responseData.data,
          })
        }
        dispatch({ type: HOME_STATE_GET_LIST_SOLID_DATA_SUCCESS, data: responseData.data.data })
        return resolve(responseData.data)
      },
      error => {
        console.log(error.message)
        dispatch({ type: HOME_STATE_GET_LIST_SOLID_DATA_FAILURE, error })
      },
    )
  })
}

const defaultState = {
  solidData: [],
};

export default function CalendarStateReducer(state = defaultState, action) {
  switch (action.type) {
    case HOME_STATE_GET_LIST_SOLID_DATA_SUCCESS:
      return  {
        ...state,
          solidData: action.data,
      }
      break;
    default:
      return state;
  }
}
