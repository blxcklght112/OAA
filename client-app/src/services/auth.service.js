import axios from 'axios';

const login = async (username, password) => {
    const response = await axios.post("https://localhost:7150/login", {
        username,
        password,
    });
    if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data));
    }
    return response.data;
};
const authService = {
    login
};

export default authService;