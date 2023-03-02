import axios from 'axios'
import constants from '../../constant'

export function registerUser(newUserDetails){
    let apiUrl = ` ${constants.baseURL}/register`
    return axios.post(apiUrl,newUserDetails,{
        headers:{
            'Content-Type': 'application/json'
        }
    })
}
