import axios from 'axios'

const axiosWithAuth = () => {
    const sid = localStorage.getItem('sid')
    const id = localStorage.getItem('id')
    return axios.create({
        headers:{
            sid: sid,
            user_id: id
        },
        baseURL:'http://localhost:9000/api',
    })    
}

export default axiosWithAuth