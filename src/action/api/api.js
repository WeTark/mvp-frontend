import axios from 'axios';

export class API {
    static baseUrl = 'http://localhost:8080';

    static authenticateUser(data) {
        return axios.post(`${this.baseUrl}/api/auth/signin`, data,{
            withCredentials: true,
          });
    };
    
    static registerUser(data) {
        return axios.post(`${this.baseUrl}/api/auth/signup`, data,{
            withCredentials: true,
        });
    }
    
}