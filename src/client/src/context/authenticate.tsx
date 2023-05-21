import axios from "axios";

export const wrappedAxios = () => {
    let journalAuthTokenGoogle = localStorage.getItem("journalAuthTokenGoogle");
    let journalAuthTokenEmail = localStorage.getItem("journalAuthTokenEmail")
    axios.defaults.headers.common["journalAuthTokenGoogle"] = journalAuthTokenGoogle;
    axios.defaults.headers.common["journalAuthTokenEmail"] = journalAuthTokenEmail;
    return axios;
}