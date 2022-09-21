<template>
  <div class="container">
    <form @submit.prevent="addTodo()">
      <div class="form-group row mt-4">
        <input class="form-control  col-sm-2 mr-4 " v-model="newTodo" name="newTodo" autocomplete="off" placeholder="Текст">
        <button class="form-control btn btn-secondary col-sm-2 ">Добавить</button>
      </div>

    </form>
    <table class="table">
      <tr>
        <th>Текст</th>
        <th>Дата</th>
        <th>Выполнено</th>
        <th>Удалить</th>
      </tr>
      <tr v-for="todo in content" :key="todo.id">
        <td>{{ todo.text }}</td>
        <td>{{ todo.date }}</td>
        <td v-on:click="toggleTodo(todo)">
          <span v-if="todo.completed">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
              <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
              <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
            </svg>
          </span>
          <span v-else>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
              <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
            </svg>
          </span>
        </td>
        <td>  <div type="button" v-on:click="removeTodo(todo)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg></div></td>
      </tr>
    </table>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "Todo",
  data() {
    return {
      content: "",
      idUser: 0,
      newTodo : "",
    };
  },
  mounted() {
    let idUser =this.$store.state.auth.user.id
    this.idUser=idUser
    UserService.getTodos(idUser).then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        console.log((error.response &&
            error.response.data &&
            error.response.data.message) ||
        error.message ||
        error.toString());
      }
    );
  },
  methods:{
    removeTodo(todo){
      const index = this.content.indexOf(todo);
      this.content.splice(index, 1);
      UserService.removeTodo(this.idUser,todo.id).then(
          (response) => {
            if (response.status.ok){
              console.log("removed")
            }
          },
          (error) => {
            console.log(error.response.data.status )})
    },
    toggleTodo(todo){
      const todoToEdit = this.findTodo(todo);
      todoToEdit.completed = !todo.completed;
      UserService.toggleTodo(this.idUser, todo.id).then(
          (response) => {
            if (response.status.ok){
              console.log("toggled")
            }
          },
          (error) => {
            console.log(error.response.data.status )}
      )
    },
    addTodo(){
      let recievedTodo=this.newTodo;
      if (recievedTodo.length>0) {
        UserService.addTodo(this.idUser,recievedTodo).then(
            (response) => {
              this.content.push({
                      id:response.data.id,
                      text: response.data.text,
                      date: response.data.date,
                      completed:response.data.completed
                    });
            },
            (error) => {
              console.log(error.response.data.status )}
        )
        this.newTodo=""
      }
    },
    findTodo(item) {
      return this.content.find(todo => todo.id === item.id);
    },
  }
};
</script>
