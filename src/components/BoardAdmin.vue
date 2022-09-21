<template>
  <div class="container">
    <table class="table">
      <tr>
        <th>Тема</th>
        <th>Содержание</th>
        <th>Дата</th>
        <th>Email пользователя</th>
      </tr>
      <tr v-for="cb in content" :key="cb.id">
        <td>{{ cb.title }}</td>
        <td>{{ cb.text }}</td>
        <td>{{ cb.date }}</td>
        <td>{{ cb.email }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "Admin",
  data() {
    return {
      content: "",
      idUser:0
    };
  },
  mounted() {
    this.idUser =this.$store.state.auth.user.id
    UserService.getCallbacks(this.idUser).then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>
