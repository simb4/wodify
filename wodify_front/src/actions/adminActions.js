import * as actionTypes from '../constants/actionTypes'
import * as adminApi from '../api/adminApi'
import * as authApi from '../api/authApi'

import { ERRORS } from '../constants/constants'

export const clearFlags = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_CLEAR_REGISTRATION
  })
}

export const clearAthleteList = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_CLEAR_ATHLETE_LIST
  })
}

export const getAthletes = () => (dispatch, getState) => {

	dispatch({
		type: actionTypes.ACTION_GET_ATHLETES_STARTED,
	})

	adminApi
		.getAthletes(getState().user.token)
		.then(
			response => {
				if(response.status !== 200) {
					dispatch({
						type: actionTypes.ACTION_GET_ATHLETES_FAILED,
						errorMessage: ERRORS.NUMBER + response.status,
					})
				} else {
					response
					.text()
					.then(
						value => {
							const responseObject = JSON.parse(value)
							if(responseObject.code === 0){
								dispatch({
									type: actionTypes.ACTION_GET_ATHLETES_SUCCESS,
									athletes: responseObject.athletes
								})
							} else{
								dispatch({
									type: actionTypes.ACTION_GET_ATHLETES_FAILED,
									errorMessage: responseObject.message
								})
							}
						}
					)
				}
			},
			error => {
				dispatch({
					type: actionTypes.ACTION_GET_ATHLETES_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
			}
		)
}

export const getCoaches = () => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_GET_COACHES_STARTED,
  })

  adminApi
    .getCoaches(getState().user.token)
    .then(
      response => {
        if(response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_COACHES_FAILED,
            errorMessage: ERRORS.NUMBER + response.status,
          })
        } else {
          response
          .text()
          .then(
            value => {
              const responseObject = JSON.parse(value)
              if(responseObject.code === 0){
                dispatch({
                  type: actionTypes.ACTION_GET_COACHES_SUCCESS,
                  coaches: responseObject.coaches
                })
              } else{
                dispatch({
                  type: actionTypes.ACTION_GET_COACHES_FAILED,
                  errorMessage: responseObject.message
                })
              }
            }
          )
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_COACHES_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
    )
}

export const getGyms = () => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_GET_GYMS_STARTED,
  })

  adminApi
    .getGyms(getState().user.token)
    .then(
      response => {
        if(response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_GYMS_FAILED,
            errorMessage: ERRORS.NUMBER + response.status,
          })
        } else {
          response
          .text()
          .then(
            value => {
              const responseObject = JSON.parse(value)
              if(responseObject.code === 0){
                dispatch({
                  type: actionTypes.ACTION_GET_GYMS_SUCCESS,
                  gyms: responseObject.gyms
                })
              } else{
                dispatch({
                  type: actionTypes.ACTION_GET_GYMS_FAILED,
                  errorMessage: responseObject.message
                })
              }
            }
          )
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_GYMS_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
    )
}

export const createWod = (data) => (dispatch, getState) => {
	dispatch({
		type: actionTypes.ACTION_ADD_WOD_STARTED,
	})

	adminApi
		.addWod(getState().user.token, data)
		.then(
			response => {
				if(response.status !== 200) {
					dispatch({
						type: actionTypes.ACTION_ADD_WOD_FAILED,
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
										type: actionTypes.ACTION_ADD_WOD_SUCCESS,
										wod: responseObject,
									})
								} else {
									dispatch({
										type: actionTypes.ACTION_ADD_WOD_FAILED,
										errorMessage: responseObject.message,
									})
								}
							}
						)
				}
			},
			error => {
				dispatch({
					type: actionTypes.ACTION_ADD_WOD_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
			}
		)
}


export const getWeeksWod = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_WEEK_WOD_STARTED,
  })

  adminApi
    .getWodOfWeek(getState().user.token,data)
    .then(
      response => {
        if(response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_WEEK_WOD_FAILED,
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
                    type: actionTypes.ACTION_GET_WEEK_WOD_SUCCESS,
                    wodOfWeek: responseObject,
                  })
                } else {
                  dispatch({
                    type: actionTypes.ACTION_GET_WEEK_WOD_FAILED,
                    errorMessage: responseObject.message,
                  })
                }
              }
            )
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_WEEK_WOD_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
    )
}

export const getWeeksWorkout = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_WORKOUTS_STARTED,
  })

  adminApi
    .getWorkoutsOfWeek(getState().user.token, data)
    .then(
      response => {
        if(response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_WORKOUTS_FAILED,
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
                    type: actionTypes.ACTION_GET_WORKOUTS_SUCCESS,
                    workouts: responseObject.workouts,
                  })
                } else {
                  dispatch({
                    type: actionTypes.ACTION_GET_WORKOUTS_FAILED,
                    errorMessage: responseObject.message,
                  })
                }
              }
            )
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_WORKOUTS_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
    )
}

export const addAthlete = (data) => (dispatch, getState) => {

	dispatch({
		type: actionTypes.ACTION_ADD_ATHLETE_STARTED,
	})

	adminApi
		.addAthlete(getState().user.token, data)
		.then(
			response => {
				if(response.status !== 200) {
					dispatch({
						type: actionTypes.ACTION_ADD_ATHLETE_FAILED,
						errorMessage: ERRORS.NUMBER + response.status,
					})
				} else {
					response
						.text()
						.then(
							value => {
								const responseObject = JSON.parse(value)
								if(responseObject.code === 0){
									dispatch({
										type: actionTypes.ACTION_ADD_ATHLETE_SUCCESS,
										athlete: responseObject.result,
									})
								} else {
									dispatch({
										type: actionTypes.ACTION_ADD_ATHLETE_FAILED,
										errorMessage: responseObject.message,
									})
								}
							}
						)
				}
			},
			error => {
				dispatch({
					type: actionTypes.ACTION_ADD_ATHLETE_FAILED,
					errorMessage: ERRORS.NO_INTERNET,
				})
			}
		)
}

export const addWorkout = (data) => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_ADD_WORKOUT_STARTED,
  })

  adminApi
    .addWorkout(getState().user.token, data)
    .then(
      response => {
        if(response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_ADD_WORKOUT_FAILED,
            errorMessage: ERRORS.NUMBER + response.status,
          })
        } else {
          response
            .text()
            .then(
              value => {
                const responseObject = JSON.parse(value)
                if(responseObject.code === 0){
                  dispatch({
                    type: actionTypes.ACTION_ADD_WORKOUT_SUCCESS,
                    workout: responseObject,
                    // date: date,
                  })
                } else {
                  dispatch({
                    type: actionTypes.ACTION_ADD_WORKOUT_FAILED,
                    errorMessage: responseObject.message,
                  })
                }
              }
            )
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_ADD_WORKOUT_FAILED,
          errorMessage: ERRORS.NO_INTERNET,
        })
      }
    )
}

export const registerUser = (data) => (dispatch, getState) => {

	dispatch({
		type: actionTypes.ACTION_REGISTRATION_STARTED,
	})

	adminApi
		.register(getState().user.token, data)
		.then(
			response => {
				if(response.status !== 200) {
					dispatch({
						type: actionTypes.ACTION_REGISTRATION_FAILED,
						errorMessage: ERRORS.NUMBER + response.status
					})
				} else {
					response
						.text()
						.then(
							value => {
								const responseObject = JSON.parse(value)
								if(responseObject.code === 0) {
									dispatch({
										type: actionTypes.ACTION_REGISTRATION_SUCCESS
									})
								} else {
									dispatch({
										type: actionTypes.ACTION_REGISTRATION_FAILED,
										errorMessage: responseObject.message
									})
								}
							}
						)
				}
			},
			error => {
				dispatch({
					type: actionTypes.ACTION_REGISTRATION_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
			}
		)
}

export const checkAccount = (data) => (dispatch, getState) => {
  if (getState().auth.isRegistering) {
    return Promise.resolve();
  }
  dispatch({
    type: actionTypes.ACTION_CHECK_ACCOUNT_STARTED
  });

  authApi
    .checkLogin(data) 
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_CHECK_ACCOUNT_FAILED,
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
                    type: actionTypes.ACTION_CHECK_ACCOUNT_EXISTS,
                    errorMessage: ERRORS.ACCOUNT_ALREADY_EXISTS
                  });
                }else{
                  dispatch({
                    type: actionTypes.ACTION_CHECK_ACCOUNT_NOTEXIST,
                  });
                }
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_CHECK_ACCOUNT_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
  );
};

export const getPrograms = () => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_GET_PROGRAMS_STARTED,
  })

  adminApi
    .getPrograms(getState().user.token)
    .then(
      response => {
        if(response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_PROGRAMS_FAILED,
            errorMessage: ERRORS.NUMBER + response.status,
          })
        } else {
          response
          .text()
          .then(
            value => {
              const responseObject = JSON.parse(value)
              if(responseObject.code === 0){
                dispatch({
                  type: actionTypes.ACTION_GET_PROGRAMS_SUCCESS,
                  programs: responseObject.programs
                })
              } else{
                dispatch({
                  type: actionTypes.ACTION_GET_PROGRAMS_FAILED,
                  errorMessage: responseObject.message
                })
              }
            }
          )
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_PROGRAMS_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
    )
}

export const updateWorkout = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_UPDATE_WORKOUT_STARTED,
  })

  adminApi
    .updateWorkout(getState().user.token, data)
    .then(
      response => {
        if(response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_UPDATE_WORKOUT_FAILED,
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
                    type: actionTypes.ACTION_UPDATE_WORKOUT_SUCCESS,
                    workouts: responseObject,
                  })
                } else {
                  dispatch({
                    type: actionTypes.ACTION_UPDATE_WORKOUT_FAILED,
                    errorMessage: responseObject.message,
                  })
                }
              }
            )
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_UPDATE_WORKOUT_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
    )
}


export const uploadCSV = (data) => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_UPLOAD_CSV_STARTED,
  })

  adminApi
    .uploadCSV(getState().user.token, data)
    .then(
      response => {
        if(response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_UPLOAD_CSV_FAILED,
            errorMessage: ERRORS.NUMBER + response.status,
          })
        } else {
          response
          .text()
          .then(
            value => {
              const responseObject = JSON.parse(value)
              if(responseObject.code === 0){
                dispatch({
                  type: actionTypes.ACTION_UPLOAD_CSV_SUCCESS,
                  athletes: responseObject.athletes
                })
              } else{
                dispatch({
                  type: actionTypes.ACTION_UPLOAD_CSV_FAILED,
                  errorMessage: responseObject.message
                })
              }
            }
          )
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_UPLOAD_CSV_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
    )
}

