import * as actionTypes from '../constants/actionTypes';
import * as authApi from '../api/authApi';
import { ERRORS } from '../constants/constants';

export const checkLogin = (data) => (dispatch, getState) => {
  if (getState().auth.isLoggingIn) {
    return Promise.resolve();
  }
  dispatch({
    type: actionTypes.ACTION_CHECK_LOGIN_STARTED
  });

  authApi
    .checkLogin(data) 
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_CHECK_LOGIN_FAILED,
            errorMessage: ERRORS.NUMBER + response.status
          });
        } else {
          response
            .text()
            .then(
              value => {
                const responseObject = JSON.parse(value);
                if(responseObject.code === 0 && responseObject.exists){
                  dispatch({
                    type: actionTypes.ACTION_CHECK_LOGIN_EXIST,
                  });
                }else{
                  dispatch({
                    type: actionTypes.ACTION_CHECK_LOGIN_FAILED,
                    errorMessage: ERRORS.ACCOUNT_NOT_FOUND
                  });
                }
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_CHECK_LOGIN_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
  );
};

export const login = (data) => (dispatch, getState) => {
  if (getState().auth.isLoggingIn) {
    return Promise.resolve();
  }

  dispatch({
    type: actionTypes.ACTION_LOGIN_STARTED
  });

  authApi
    .login(data)  
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_LOGIN_FAILED,
            errorMessage: ERRORS.NUMBER + response.status
          });
        } else {
          response
            .text()
            .then(
              value => {
                const responseObject = JSON.parse(value);
                if(responseObject.code === 0 && responseObject.user.administrator){
                  dispatch({
                    type: actionTypes.ACTION_LOGIN_SUCCESS,
                    token: responseObject.token,
                    user: responseObject.user
                  });
                }else{
                  if(!responseObject.user.administrator){
                    dispatch({
                      type: actionTypes.ACTION_LOGIN_FAILED,
                      errorMessage: "Войти могут только пользователи со статусом администратора"
                    });
                  } else {
                    dispatch({
                      type: actionTypes.ACTION_LOGIN_FAILED,
                      errorMessage: ERRORS.INCORRECT_PASSWORD
                    });
                  }
                }
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_LOGIN_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
  );
};

export const resetPassword = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_CHANGE_PASSWORD_STARTED,
  }) 

  authApi
    .resetPassword(data)
    .then(
      response => {
        if(response.status !== 200){
          dispatch({
            type: actionTypes.ACTION_CHANGE_PASSWORD_FAILED,
            errorMessage: ERRORS.NUMBER + response.status
          })
        } else {
          response
          .text()
          .then(
            value => {
              const responseObject = JSON.parse(value)
              if(responseObject.code === 0){
                dispatch({
                  type: actionTypes.ACTION_CHANGE_PASSWORD_SUCCESS
                })
              } else {
                dispatch({
                  type: actionTypes.ACTION_CHANGE_PASSWORD_FAILED,
                  errorMessage: responseObject.message
                })
              }
            }
          )
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_CHANGE_PASSWORD_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      } 
    )
}

export const setPassword = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_SET_PASSWORD_STARTED,
  }) 

  authApi
    .setPassword(data)
    .then(
      response => {
        if(response.status !== 200){
          dispatch({
            type: actionTypes.ACTION_SET_PASSWORD_FAILED,
            errorMessage: ERRORS.NUMBER + response.status
          })
        } else {
          response
          .text()
          .then(
            value => {
              const responseObject = JSON.parse(value)
              if(responseObject.code === 0){
                dispatch({
                  type: actionTypes.ACTION_SET_PASSWORD_SUCCESS
                })
              } else {
                dispatch({
                  type: actionTypes.ACTION_SET_PASSWORD_FAILED,
                  errorMessage: responseObject.message
                })
              }
            }
          )
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_SET_PASSWORD_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      } 
    )
}

export const logout = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_LOGGED_OUT,
    user: getState().user,
  });
}

// export const logout = () => (dispatch, getState) => {

//   dispatch({
//     type: actionTypes.ACTION_LOGOUT_STARTED,
//   })

//   authApi
//     .logout(getState().user.token)
//     .then(
//       response => {
//         if(response.status !== 200){
//           dispatch({
//             type: actionTypes.ACTION_LOGOUT_FAILED,
//             errorMessage: ERRORS.NUMBER + response.status
//           })
//         } else{
//           response
//             .text()
//             .then(
//               value => {
//                 var responseObject = JSON.parse(value)
//                 if(responseObject.code === 0) {
//                   dispatch({
//                     type: actionTypes.ACTION_LOGGED_OUT,
//                     user: getState().user,
//                   })
//                 } else {
//                   dispatch({
//                     type: actionTypes.ACTION_LOGOUT_FAILED,
//                     errorMessage: responseObject.message,
//                   })
//                 }
//               }
//             )
//         }
//       },
//       error => {
//         dispatch({
//           type: actionTypes.ACTION_LOGOUT_FAILED,
//           errorMessage: ERRORS.NO_INTERNET,
//         })
//       }
//     )
// } 