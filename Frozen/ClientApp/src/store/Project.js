const requestProjectListType = 'REQUEST_PROJECT_LIST';
const receiveProjectListType = 'RECEIVE_PROJECT_LIST';

const requestProjectDetailType = 'REQUEST_PROJECT_DETAIL';
const receiveProjectDetailType = 'RECEIVE_PROJECT_DETAIL';

const createProjectType = "CREATE_PROJECT";

const initialState = { projects: [], current: null, isLoading: false };

export const actionCreators = {
  requestProjectList: pageIndex => async (dispatch, getState) => {    
    if (pageIndex === getState().projects.pageIndex) {
      // Don't issue a duplicate request (we already have or are loading the requested data)
      return;
    }

    dispatch({ type: requestProjectListType, pageIndex });

    const url = `api/Project/List?pageIndex=${pageIndex}`;
    const response = await fetch(url);
    const projects = await response.json();

    dispatch({ type: receiveProjectListType, pageIndex, projects });
  },

  requestProjectDetail: id => async (dispatch, getState) => {
    dispatch({ type: requestProjectDetailType, id });

    const url = `api/Project/Detail/${id}`;
    const response = await fetch(url);
    const project = await response.json();

    dispatch({ type: receiveProjectDetailType, id, project });
  },

  createProject: data => async (dispatch, getState) => {
    //dispatch({ type: createProjectType, data });
    const url=`api/Project/Create`;
    
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    const response = await fetch(url, options)
    const project = await response.json();
    
    dispatch({ type: createProjectType, project});
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestProjectListType) {
    return {
      ...state,
      pageIndex: action.pageIndex,
      isLoading: true
    };
  }

  if (action.type === receiveProjectListType) {
    return {
      ...state,
      pageIndex: action.pageIndex,
      projects: action.projects,
      isLoading: false
    };
  }

  if (action.type === requestProjectDetailType) {
    return {
      ...state,
      current: null,
      isLoading: true
    };
  }

  if (action.type === receiveProjectDetailType) {
    return {
      ...state,
      current: action.project,
      isLoading: false
    }
  }

  if (action.type === createProjectType) {
    if(action.project && action.project.id > 0) {
      state.projects.push(action.project);
      return {
        ...state
      }
    }
  }

  return state;
};