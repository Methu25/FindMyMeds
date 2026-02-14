import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

export const authService = {
    // Civilian Login
    loginCivilian: async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/civilian/auth/login`, {
                email,
                password
            });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userType', 'CIVILIAN');
<<<<<<< HEAD
                // Store full user object
                const user = {
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email,
                    role: response.data.role
                };
                localStorage.setItem('user', JSON.stringify(user));
=======
                if (response.data.userDetails) {
                    localStorage.setItem('civilian_user', JSON.stringify(response.data.userDetails));
                }
>>>>>>> 7a607ad250beb6b88357c55488f99588a90ff33d
            }
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // Pharmacy Login
    loginPharmacy: async (email, password) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/pharmacy/auth/login`, {
                email,
                password
            });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userType', 'PHARMACY');
            }
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // Admin Login
    loginAdmin: async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/admin/auth/login`, {
                email,
                password
            });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userType', response.data.role); // ADMIN or SUPER_ADMIN
            }
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        // window.location.href = '/login'; 
    }
};
