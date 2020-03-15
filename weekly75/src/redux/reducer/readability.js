import * as type from '../actions/actionType';

const initialState = {
  useReadability: false,
};

export default function readability(state = initialState, action = {}) {
  switch (action.type) {
    case type.useReadability:
      return {
        ...state,
        useReadability: true,
      };
    case type.dontUseReadability:
      return {
        ...state,
        useReadability: false,
      };
    default:
      return state;
  }
}
