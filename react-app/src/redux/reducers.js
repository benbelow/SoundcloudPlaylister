import { combineReducers } from 'redux';
import threads from '../components/ThreadFetcher/ThreadFetcherReducer';
import submissionThread from '../components/SubmissionThread/SubmissionThreadReducer';

export default combineReducers({
  threads,
  submissionThread
});
