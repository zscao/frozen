// a loading reducer to store all loading status for async api calls
// credit to Sam Aryasa https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6

import _ from 'lodash';


export const reducer = (state = {}, action) => {
    const { type } = action;
    const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

    if(!matches) return state;

    const [, requestName, requestState] = matches;
    return {
        ...state, 
        [requestName]: requestState === 'REQUEST'
    };
}

export const createLoadingSelector = (actions) => (state) => {
    return _(actions).some(action => _.get(state, `loading.${action}`));
}