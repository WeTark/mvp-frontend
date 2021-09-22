import axios from 'axios';
import { getLocalStorage } from '../LocalStorageActions';


export class API {
    static baseUrl = 'http://localhost:8080';
    // static baseUrl = 'https://api.wetark.in';

    static authenticateUser(data) {
        return axios.post(`${this.baseUrl}/api/auth/signin`, data,{
            withCredentials: true,
          });
    };

    static registerUser(data) {
        return axios.post(`${this.baseUrl}/api/auth/signup`, data,{
            withCredentials: true,
        });
    };
    
    static fetchAllEvents(page, size) {
        return axios.get(`${this.baseUrl}/event/all?page=${page}&size=${size}`,{
            headers: {
                Authorization: getLocalStorage("accessToken")
            },
            withCredentials: true,
        });
    };

    static fetchEventByID(id, page, size) {
        return axios.get(`${this.baseUrl}/event?id=${id}&page=${page}&size=${size}`,{
            headers: {
                Authorization: getLocalStorage("accessToken")
            },
            withCredentials: true,
        });
    };

    static newTrade(data) {
        return axios.post(`${this.baseUrl}/trade`, data,{
            headers: {
                Authorization: getLocalStorage("accessToken")
            },
            withCredentials: true,
        });
    };

    static fetchUser() {
        return axios.get(`${this.baseUrl}/api/auth/me`,{
            headers: {
                Authorization: getLocalStorage("accessToken")
            },
            withCredentials: true,
        });
    };

    static fetchTopPendingTrade(eventId) {
        return axios.get(`${this.baseUrl}/trade/pending?eventId=${eventId}&page=0&size=8`,{
            headers: {
                Authorization: getLocalStorage("accessToken")
            },
            withCredentials: true,
        });
    };

    static fetchTotalTradeAmount(eventId) {
        return axios.get(`${this.baseUrl}/matched-trade/sum?eventId=${eventId}`,{
            headers: {
                Authorization: getLocalStorage("accessToken")
            },
            withCredentials: true,
        });
    };

    static fetchGraphData(eventId) {
        return axios.get(`${this.baseUrl}/matched-trade/graph?eventId=${eventId}`,{
            headers: {
                Authorization: getLocalStorage("accessToken")
            },
            withCredentials: true,
        });
    };

    static fetchUserPortfolio() {
        return axios.get(`${this.baseUrl}/user/portfolio`,{
            headers: {
                Authorization: getLocalStorage("accessToken")
            },
            withCredentials: true,
        });
    };

    static fetchEventVariable(eventId) {
        return axios.get(`${this.baseUrl}/event/event-variable?eventId=${eventId}`,{
            headers: {
                Authorization: getLocalStorage("accessToken")
            },
            withCredentials: true,
        });
    };
    
    static newPersonalEvent(data) {
        return axios.post(`${this.baseUrl}/event/create-personal-event`, data,{
            headers: {
                Authorization: getLocalStorage("accessToken")
            },
            withCredentials: true,
        });
    };

    static fetchAllPersonalEvents(page, size) {
        return axios.get(`${this.baseUrl}/event/all/personal?page=${page}&size=${size}`,{
            headers: {
                Authorization: getLocalStorage("accessToken")
            },
            withCredentials: true,
        });
    };
    
}