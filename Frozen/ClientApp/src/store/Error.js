const addUnhandledErrorType = 'ADD_UNHANDLED_ERROR';
const cleanUnhandledErrorType = 'CLEAN_UNHANDLED_ERROR';

export const actionCreators = {
  addUnhandledError: (error) => (dispatch) => {
    dispatch({ type: addUnhandledErrorType, payload: error });
  },

  cleanUnhandledError: () => (dispatch) => {
    dispatch({ type: cleanUnhandledErrorType });
  }
}

const initialState={ lastError: null };

export const reducer = (state,action)  => {
  state = state || initialState;

  switch (action.type) {
    case addUnhandledErrorType:
      console.log('add unhandled error:', action);
      return {
        ...state,
        lastError: action.payload
      };
    case cleanUnhandledErrorType:
    console.log('clean unhandled error:', action);
      return {
        ...state, 
        lastError: null
      }
    default: return state;
  }
}