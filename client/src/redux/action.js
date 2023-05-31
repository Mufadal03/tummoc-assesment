import customAxios from "../api/axios"

export const LoginFn = (payload) => dispatch => {
    return customAxios.post('/user/login', payload)
        .then((res) => {
            console.log(res)
            return res
        })
        .catch((err) => {
            return err
    })
}
export const signup = (payload) => dispatch => {
    console.log('signup fn invoked')
    return customAxios.post('/user/signup', payload)
        .then((res) => {
            console.log(res)
            return res
        }).catch((err) => {
            return err
        })
}