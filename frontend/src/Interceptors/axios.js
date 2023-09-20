// import axios from "axios";

// let refresh = false;

// axios.interceptors.response.use(resp => resp, async error => {
//     console.log("interceptor");

//     if (error.response.status === 401 && !refresh) {

//         refresh = true;
//         console.log(localStorage.getItem('refresh_token'))

//         const response = await axios.post('/token/refresh/',
//             { refresh: localStorage.getItem('refresh_token') },
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
//                 },
//                 withCredentials: true
//             },
//         );

//         console.log("inside interceptor");

//         if (response.status === 200) {
//             axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
//             localStorage.setItem('access_token', response.data.access);
//             localStorage.setItem('refresh_token', response.data.refresh);
//             return axios(error.config);
//         }
//     }
//     refresh = false;
//     return error;
// });