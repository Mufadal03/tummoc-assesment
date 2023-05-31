import axios from 'axios'

const customAxios = axios.create({
    // baseURL: "http://localhost:8000",
    baseURL: 'https://tummoc-assesment.vercel.app'

})

customAxios.interceptors.response.use((res) => {
    if (res && res.data) return res.data

}, (err) => {
    throw err.response.data
})

export default customAxios