export const actionTypeCreator = {
        request: action => `${action}_REQUEST`,
        success: action => `${action}_SUCCESS`,
        failure: action => `${action}_FAILURE`
    };

export const actionStatus = {
  request: 'REQUEST',
  success: 'SUCCESS',
  failure: 'FAILURE'
};

export const errorTypes = {
  http: 'HTTP',
  other: 'OTHER'
}