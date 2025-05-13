import axios from 'axios'
import { API_BASE_URL } from '../api-config'
 
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers : {
        'Content-Type':'application/json'
    }
})
export function call(api,method,request){

    //앞서 설정한 options객체를 사용하여 axios로 HTTP요청을 보낸다.
    return apiClient({
        url : api,
        method,
        data : request || undefined,
    })
        .then(res => res.data);
}