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
            console.log("success")

            // Update the access token in local storage
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            // Return the refreshed access token
            return {
                access: response.data.access,
                refresh: response.data.refresh,
            };

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
            const { access, refresh } = await refreshToken(); // Call your token refreshing function
            instance.defaults.headers.common['Authorization'] = `Bearer ${access}`;
            console.log("worked");
            console.log(access);

            // Update the refresh token in error.config data
            error.config.data = JSON.stringify({ refresh_token: refresh });

            // Update the Authorization header in error.config
            error.config.headers['Authorization'] = `Bearer ${access}`;

            // Retry the original request
            return instance.request(error.config);

        } catch (refreshError) {
            // Handle token refreshing error or logout the user
            console.error("Issue with refreshing access token!");
            console.error(refreshError);

            console.log(error.config.url)
            // Check the URL of the original request
            if (error.config.url !== '/api/logout/') {
                console.log("logging out!")
                const token = { refresh_token: localStorage.getItem('refresh_token') };

                let res = await instance.post('/api/logout/',
                    token,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                        },
                        withCredentials: true,
                    }
                );
            }

            localStorage.clear();
            instance.defaults.headers.common['Authorization'] = null;
            // window.location.reload();
        }
    }
    refresh = false;
    return Promise.reject(error);
});

export default instance;