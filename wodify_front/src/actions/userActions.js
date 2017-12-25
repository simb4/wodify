import * as actionTypes from '../constants/actionTypes'
import * as userApi from '../api/userApi'
import { defaultAction } from './defaultActions';

export const updateProfile = (data) => (dispatch, getState) => {
  defaultAction(dispatch, getState, {
    action: actionTypes.ACTION_UPDATE_PROFILE,
    apiCall: () => { return userApi.updateProfile(getState().user.token, data) },
    onSuccess: (response) => ({ user: response.user }),
    onFailure: (response) => ({ errorMessage: response.message }),
  })
}