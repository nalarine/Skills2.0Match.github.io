import axios from 'axios'
import {
  JOB_LOAD_FAIL,
  JOB_LOAD_REQUEST,
  JOB_LOAD_SUCCESS,
} from '../constants/jobconstant'
import { toast } from 'react-toastify'

export const registerAjobAction = (job) => async (dispatch) => {
  dispatch({ type: REGISTER_JOB_REQUEST })

  try {
    const { data } = await axios.post('/api-v1/jobs/upload-job', job)
    dispatch({
      type: REGISTER_JOB_SUCCESS,
      payload: data,
    })
    toast.success('Job created successfully')
  } catch (error) {
    dispatch({
      type: REGISTER_JOB_FAIL,
      payload: error.response.data.error,
    })
    toast.error(error.response.data.error)
  }
}

export const jobLoadAction = () => async (dispatch) => {
  dispatch({ type: JOB_LOAD_REQUEST })
  try {
    const response = await axios.get('/api-v1/jobs/alljobs')
    console.log('Response from API:', response) // Log the response
    if (response.data && response.data.data) {
      dispatch({
        type: JOB_LOAD_SUCCESS,
        payload: response.data.data,
      })
    } else {
      dispatch({
        type: JOB_LOAD_FAIL,
        payload: 'Data is undefined in the response',
      })
    }
  } catch (error) {
    console.error('Error fetching jobs:', error) // Log the error
    dispatch({
      type: JOB_LOAD_FAIL,
      payload: error.message,
    })
  }
}
