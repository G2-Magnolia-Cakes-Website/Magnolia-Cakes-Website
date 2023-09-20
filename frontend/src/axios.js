import axios from 'axios';

const instance = axios.create({
    // baseURL: "https://backend-dot-alpine-avatar-399423.ts.r.appspot.com/", // Uncomment this before deploying
    baseURL: "http://127.0.0.1:8000/", // Uncomment this when you run it locally
});


let refresh = false;

// Function to refresh the access token
const refreshToken = async () => {
    try {
        // Make a request to refresh the access token
        const response = await instance.post('/api/token/refresh/',
            { refresh: localStorage.getItem('refresh_token') },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
                withCredentials: true
            },
        );
        if (response.status === 200) {
            // Update the access token in local storage
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            // Return the refreshed access token
            return response.data.access;
        } else {
            console.log(response);
            return Promise.reject(response);
        }
    } catch (error) {
        console.log(error);
        console.log(error.response.data);
        return Promise.reject(error);
    }
};

// Add your interceptor here
instance.interceptors.response.use((response) => response, async (error) => {

    console.log("interceptor");
    if (error.response.status === 401 && !refresh) {
        refresh = true;
        console.log("inside if");
        try {
            // Perform token refreshing logic here
            const refreshedAccessToken = await refreshToken(); // Call your token refreshing function
            instance.defaults.headers.common['Authorization'] = `Bearer ${refreshedAccessToken}`;
            console.log("worked");
            // Retry the original request
            return instance.request(error.config);
        } catch (refreshError) {
            console.error("Issue with refreshing access token!");
            console.error(refreshError);
            // Handle token refreshing error or logout the user
            localStorage.clear();
            instance.defaults.headers.common['Authorization'] = null;
            // window.location.reload();
        }
    }
    refresh = false;
    return Promise.reject(error);
});

export default instance;