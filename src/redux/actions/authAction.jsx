import { getDataAPI, postDataAPI } from "../../utils/fetchData";

export const AUTH = "AUTH"
export const NOTIFY = "NOTIFY"
export const ERROR = "ERROR"
export const LOADING = "LOADING"


export const login = (data) => async (dispatch) => {


    dispatch({type: NOTIFY, payload: {loading: true}})

    const res = await postDataAPI("user/login", data)

    if(res.data.access_token){
      dispatch({  
        type: AUTH,
        payload: {
          data: res.data
        }
      })

      localStorage.setItem('firstLogin', res.data.access_token)

      dispatch({
        type: NOTIFY,
        payload: {
          success: "login success"
        }
      })
    }else{
      dispatch({
        type: NOTIFY,
        payload: {
          error: res.data
      }
    })
    }
}

export const register = (data) => async (dispatch) => {

  dispatch({type: NOTIFY, payload: {loading: true}})
    const res = await postDataAPI("user/create",data);

    if(res.data.access_token){
      dispatch({
        type: AUTH,
        payload: {
          data: res.data
        }
      })

      localStorage.setItem('firstLogin', res.data.access_token)

      dispatch({
        type: NOTIFY,
        payload: {
          success: "register success"
        }
      })
    }else{

      dispatch({
        type: NOTIFY,
        payload: {
          error: res.data,
          email: res.data.e
        }
      })
   
    }

};

export const logout = (token) => async (dispatch) => {


    localStorage.removeItem('firstLogin')

    const res = await getDataAPI('user/logout', token)

    dispatch({
      type: AUTH,
      payload: {},
    });
};
