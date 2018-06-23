import _ from 'lodash';
import { actionStatus, errorTypes } from '../helpers';


export const actions = {
  list: 'LIST_PROJECT',
  detail: 'DETAIL_PROJECT',
  create: 'CREATE_PROJECT'
}

export const actionCreators = {
  requestProjectList: (forceRefresh) => async (dispatch, getState) => {    

    if (!forceRefresh) {
      const currentList = getState().project.list;
      if (currentList && !currentList.isLoading && !currentList.error && _.isDate(currentList.lastLoaded)) {
        const now = new Date().getTime();
        const then = currentList.lastLoaded.getTime();
        const span = (now - then) / 1000;
        if (span < 30) return;
      }
    }

    console.log('reload project list...');

    dispatch({ type: actions.list, status: actionStatus.request });

    const url = `api/Project/List`;
    const response = await fetch(url);
    if (response.status === 200) {
      const list = await response.json();
      dispatch({ type: actions.list, status: actionStatus.success, data: list });
    }
    else {
      const error = {
        type: errorTypes.http,
        code: response.status,
        message: response.statusText
      };

      dispatch({ type: actions.list, status: actionStatus.failure, data: error})
    }
  },

  requestProjectDetail: id => async (dispatch, getState) => {
    dispatch({ type: actions.detail, status: actionStatus.request });

    const url = `api/Project/Detail/${id}`;
    const response = await fetch(url);
    if(response.status === 200) {
      const project=await response.json();
      dispatch({ type: actions.detail, status: actionStatus.success, data: project });
    }
    else {
      const error = {
        type: errorTypes.http,
        code: response.status,
        message: response.statusText
      };
      dispatch({ type: actions.detail, status: actionStatus.failure, data: error})
    }
  },

  createProject: data => async (dispatch, getState) => {
    dispatch({ type: actions.create, status: actionStatus.request, data: data });

    const url=`api/Project/Create`;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    const response = await fetch(url, options)
    const project = await response.json();
    
    dispatch({ type: actions.create, status: actionStatus.success, data: project});
  }
};

const initialState = {
  list: {
    isLoading: false,
    lastLoaded: null,
    error: null,
    data: []
  }, 
  current: {
    isLoading: false,
    lastLoaded: null,
    error: null,
    data: null
  } 
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === actions.list) {
    let list = _.clone(initialState.list);

    switch (action.status) {
      case actionStatus.request:
        list.isLoading = true;
        break;
      case actionStatus.success:
        list.isLoading = false;
        list.data = action.data;
        list.lastLoaded = new Date();
        break;
      case actionStatus.failure:
        list.isLoading = false;
        list.error = action.data;
        list.lastLoaded = new Date();
        break;
      default: break;
    }
    return {
      ...state,
      list
    };
  }

  if (action.type === actions.detail) {
    let current = _.clone(initialState.current);

    switch (action.status) {
      case actionStatus.request:
        current.isLoading = true;
        break;
      case actionStatus.success:
        current.isLoading = false;
        current.data = action.data;
        current.lastLoaded = new Date();
        break;
      case actionStatus.failure:
        current.isLoading = false;
        current.error = action.data;
        current.lastLoaded = new Date();
        break;
      default: break;
    }

    return {
      ...state,
      current: current
    };
  }

  if (action.type === actions.create) {
    let list = state.list;
    if( !_.isArray(list.data)) list.data = [];

    switch(action.status) {
      case actionStatus.success:
      if(action.data && action.data.id > 0) list.data = [...list.data, action.data];
      break;
      default: break;
    }
    return {
      ...state,
      list
    };
  }
  

  return state;
};