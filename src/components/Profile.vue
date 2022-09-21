<template>
  <div class="container card">
      <div class="card-header">
        Профиль пользователя {{currentUser.username}}
      </div>
    <div class="card-body">
       <div>За последнюю неделю Вы</div>
      <p class="text-success">Создали {{userActivityEntry}} новые заметки</p>
      <p class="text-success">Выполнили {{userActivityTodo}} поставленных задач</p>
    </div>
<!--    <p>-->
<!--   Token:-->
<!--      {{currentUser.accessToken}}-->
<!--    </p>-->
<!--    <p>-->
<!--      <strong>Id:</strong>-->
<!--      {{currentUser.id}}-->
<!--    </p>-->
<!--    <p>-->
<!--      <strong>Email:</strong>-->
<!--      {{currentUser.email}}-->
<!--    </p>-->
<!--    <strong>Роли:</strong>-->
<!--    <ul>-->
<!--      <li v-for="role in currentUser.roles" :key="role">{{role}}</li>-->
<!--    </ul>-->

  </div>
</template>

<script>
import UserService from "../services/user.service";
export default {
  name: 'Profile',
  data() {
    return {
      userActivityTodo:0,
      userActivityEntry:0,
    };
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    UserService.getActivity(this.$store.state.auth.user.id).then(
        (response) => {
          this.userActivityTodo = response.data.todosCompletedCount;
          this.userActivityEntry = response.data.entriesCount;
        },
        (error) => {
          console.log((error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message ||
              error.toString());
        })
  }
};
</script>