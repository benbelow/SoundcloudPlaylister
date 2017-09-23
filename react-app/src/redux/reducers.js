import { combineReducers } from 'redux';
import threads from '../components/ThreadFetcher/ThreadFetcherReducer';

export default combineReducers({
  threads,
});
