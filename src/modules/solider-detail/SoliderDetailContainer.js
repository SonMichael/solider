import { connect } from 'react-redux';
import { compose } from 'recompose';

import SoliderDetailView from './SoliderDetailView';
import {getSolidDataDetail} from './SoliderDetailState'

export default compose(
  connect(
    state => ({
    }),
    {
      getSolidDataDetail
    },
  ),
)(SoliderDetailView);