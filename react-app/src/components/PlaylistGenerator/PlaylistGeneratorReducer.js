import { CREATE_PLAYLIST } from './PlaylistGeneratorActions';

const initialState = { };

const PlaylistGeneratorReducer = (state = initialState, action) => {
  switch (action.type) {
  case CREATE_PLAYLIST :
  default:
    return state;
  }
};

export default PlaylistGeneratorReducer;
