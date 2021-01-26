import { StackActions, CommonActions } from '@react-navigation/native'
import { isEmpty } from 'lodash'
import {SCREEN_TREE} from '../modules/navigation/stackNavigationData'


let _navigator


function setTopLevelNavigator(navigatorRef) {
  if (navigatorRef) {
    _navigator = navigatorRef
  }
}

function navigate(name, params) {
  const screenParams = getScreenParams(name, params)
  _navigator.dispatch(
    CommonActions.navigate({
      name: screenParams.name,
      params: screenParams.params,
    }),
  )
}

function push(name, params) {
  _navigator.dispatch(StackActions.push(name, params))
}

function reset(resetAction) {
  _navigator.dispatch(resetAction)
}

function goBack() {
  _navigator.dispatch(CommonActions.goBack())
}

export function getParams(props) {
  return props.route.params || {}
}

export function resetActionTo(screen) {
  const resetAction = CommonActions.reset({
    index: 1,
    routes: [{ name: screen }],
  })
  _navigator.dispatch(resetAction)
}

export function replace(name, params) {
  _navigator.dispatch(
    StackActions.replace(name, params),
  )
}

// gets the current screen from navigation state
export function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null
  }
  const { index } = navigationState
  const route = navigationState.routes[index]
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route)
  }
  const child = route.state
  if (child) {
    const indexChild = child.index
    const routeChild = child.routes[indexChild]
    if (routeChild.routes) {
      return getActiveRouteName(route)
    }
    return routeChild
  }
  return route
}

export function isScreenMustLogin(screenName) {
  if (!screenName) {
    return false
  }
  return screensMustLogin.includes(screenName.trim())
}

// Get screen path array
export function getScreenPath(screenName, parentNote, screenPath = []) {
  if (parentNote[screenName]) {
    return [...screenPath, screenName]
  }
  let path = []
  Object.keys(parentNote).forEach(key => {
    if (!isEmpty(parentNote[key])) {
      const temp = getScreenPath(screenName, parentNote[key], [...screenPath, key])
      if (temp?.includes(screenName)) {
        path = temp
      }
    }
  })
  if (path?.includes(screenName)) {
    return path
  }
}

// parse path array to Object {screen, params}
const parsePathToObject = (path, initParams = {}) => {
  const objectRoute = path.reverse().reduce((res, key) => ({
    screen: key,
    params: res,
  }), initParams)
  return objectRoute
}

// get screen route
export function getScreenParams(name, params) {
  const routePath = getScreenPath(name, SCREEN_TREE) || [name]
  const objectRoute = parsePathToObject(routePath, params)
  return { name: objectRoute.screen, params: objectRoute.params }
}

function addListener({ ...params }) {
  _navigator.addListener({ ...params })
}

// add other navigation functions that you need and export them
const NavigationServices = {
  navigate,
  goBack,
  reset,
  setTopLevelNavigator,
  resetActionTo,
  replace,
  push,
  isScreenMustLogin,
  addListener
}


export default NavigationServices
