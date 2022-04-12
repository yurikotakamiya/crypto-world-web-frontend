import axios from 'axios'

const axiosWithAuth = () => {
    const sid = localStorage.getItem('sid')
    const id = localStorage.getItem('id')
    return axios.create({
        headers:{
            sid: sid,
            user_id: id
        },
        baseURL:'https://crypto-world-api.herokuapp.com',
    })    
}

export default axiosWithAuth