import {
    JOB_LOAD_FAIL,
    JOB_LOAD_REQUEST,
    JOB_LOAD_SUCCESS
  } from "../constants/jobconstant";
  
  const initialState = {
    job: {
      jobs: [], // Array of job objects
      loading: true, // Assuming initial loading state is true
      error: null
    }
  };
  
  export const loadJobReducer = (state = initialState, action) => {
    switch (action.type) {
      case JOB_LOAD_REQUEST:
        return { ...state, job: { ...state.job, loading: true } };
      case JOB_LOAD_SUCCESS:
        return { ...state, job: { ...state.job, loading: false, jobs: action.payload } };
      case JOB_LOAD_FAIL:
        return { ...state, job: { ...state.job, loading: false, error: action.payload } };
      default:
        return state;
    }
  };
  