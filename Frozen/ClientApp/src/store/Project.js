import { actionTypeCreator } from '../helpers';


export const actions = {
  list: 'LIST_PROJECT',
  detail: 'DETAIL_PROJECT',
  create: 'CREATE_PROJECT'
}

export const actionCreators = {
  requestProjectList: () => async (dispatch, getState) => {    
    dispatch({ type: actionTypeCreator.request(actions.list) });

    const url = `api/Project/List`;
    const response = await fetch(url);
    const list = await response.json();

    dispatch({ type: actionTypeCreator.success(actions.list), payload: list });
  },

  requestProjectDetail: id => async (dispatch, getState) => {
    dispatch({ type: actionTypeCreator.request(actions.detail) });

    const url = `api/Project/Detail/${id}`;
    const response = await fetch(url);
    if(response.status === 200) {
      const project=await response.json();
      dispatch({ type: actionTypeCreator.success(actions.detail),payload: project });
    }
    else {
      throw new Error(response.status);
    }
  },

  createProject: data => async (dispatch, getState) => {
    dispatch({ type: actionTypeCreator.request(actions.create), payload: data });
    const url=`api/Project/Create`;
    
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    const response = await fetch(url, options)
    const project = await response.json();
    
    dispatch({ type: actionTypeCreator.success(actions.create), payload: project});
  }
};

const initialState = { list: [], current: null };

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === actionTypeCreator.success(actions.list)) {
    return {
      ...state,
      list: action.payload
    };
  }

  if (action.type === actionTypeCreator.success(actions.detail)) {
    return {
      ...state,
      current: action.payload
    }
  }

  if (action.type === actionTypeCreator.success(actions.create)) {
    if(action.project && action.project.id > 0) {
      return {
        ...state,
        list: [...state.list, action.payload]
      }
    }
  }

  return state;
};