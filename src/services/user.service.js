import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8089/api/user/';

class UserService {
  addTodo(idUser,text) {
    return axios.post(API_URL + idUser+'/todos', {text:text ,headers: authHeader() });
  }
  //Todos
  getTodos(idUser) {
    return axios.get(API_URL + idUser+'/todos', { headers: authHeader() });
  }
  removeTodo(idUser, idTodo) {
    return axios.delete(API_URL + idUser+'/todos/'+idTodo, { headers: authHeader() });
  }
  toggleTodo(idUser, idTodo) {
    return axios.put(API_URL + idUser+'/todos/'+idTodo+'/toggle', { headers: authHeader() });
  }

  //Entries

  addEntry(idUser,title,text) {
    return axios.post(API_URL + idUser+'/entries', {title:title,text:text ,headers: authHeader() });
  }
  getEntries(idUser){
    return axios.get(API_URL + idUser+'/entries', { headers: authHeader() });
  }
  removeEntry(idUser, idEntry) {
    return axios.delete(API_URL + idUser+'/entries/'+idEntry, { headers: authHeader() });
  }
  editEntry(idUser, idEntry,title,text) {
    return axios.put(API_URL + idUser+'/entries/'+idEntry, {title:title,text:text, headers: authHeader() });
  }

  //UserActivity
  getActivity(idUser){
    return axios.get(API_URL + idUser+'/activity', { headers: authHeader() })
  }

  //CallBack
  addCallback(idUser,title,text){
    return axios.post(API_URL + idUser+'/callbacks', {title:title,text:text,  headers: authHeader() })
  }

  //Admin
  getCallbacks(idUser) {
    return axios.get('http://localhost:8089/api/admin/' + idUser+'/callbacks', { headers: authHeader() });
  }

}

export default new UserService();
