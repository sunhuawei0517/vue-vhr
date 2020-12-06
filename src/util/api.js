import axios from "axios";
import {Message} from 'element-ui';

//响应拦截器
axios.interceptors.response.use(success => {
    console.log(success);
    if (success.status && success.status == 200 && success.data.code == 500) {
        Message.error({message: success.data.message})
        return;
    }
    return success.data;
}, error => {
    console.log(error);
    if (error.response.status == 504 || error.response.status == 404) {
        Message.error({message: "服务器被吃了"})
    } else if (error.response.status == 403) {
        Message.error({message: "权限不足，请联系管理员"})
    } else if (error.response.status == 401) {
        Message.error({message: "尚未登陆，请登陆"})
    } else {
        if (error.response.data.message) {
            Message.error({message: error.response.data.message})
        } else {
            Message.error({message: "未知错误"})
        }
    }
    return;
})

// 全局基础路径
let base = '';

// 这个post仅仅是为了登陆的时候request.getParameter能够拿到参数封装的
export const postKeyValueRequest = (url, params) => {
    return axios({
        method: "post",
        // 注意这里不是单引号，是数字1左边的那个符号
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&&'
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

    })
}

// post
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })
}

// put
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}

// get
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params
    })
}

// delete
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    })
}


