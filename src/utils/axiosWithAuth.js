import axios from 'axios'

const axiosWithAuth = ()=> {
    const session = localStorage.getItem('session')
    return axios.create({
        headers:{
            sid: session,
        },
        baseURL:'http://localhost:9000/api',
    })    
}

export default axiosWithAuth