import axios from "axios";
import Cookies from "universal-cookie";

export const cookies = new Cookies();

axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.headers.common['X-CSRFToken'] = cookies.get('csrftoken')
axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true
})

export const chatsUrl = '/api/v1/chats/categories/',
  userUrl = '/api/v1/users/'