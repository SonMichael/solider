import { connect } from 'react-redux';
import { compose } from 'recompose';

import HomeScreen from './HomeView';
import {getSolidData} from './HomeState'

export default compose(
  connect(
    state => ({
      countries: state.home?.countries,
    }),
    {
      getSolidData
    },
  ),
)(HomeScreen);