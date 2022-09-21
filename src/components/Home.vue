<template>
  <div class="container" >
    <header class="d-flex d-flex flex-column justify-content-center mt-4">
      <h3><span style="color: black; font-size: 30px; font-family: cursive; font-style:italic">{{ content }}<span v-if="currentUser" >, {{currentUser.username}}!</span></span></h3>
      <br>
      <h2><span style="color: black; font-size: 20px; font-family: cursive; font-style:italic">Мы рады, что вы выбрали нашу информационную систему для создания заметок. Здесь вы можете создать обычную запись или составить ToDo-лист. Также есть возможность написать администратору, если у вас возникли какие-то проблемы или же вы хотели бы что-то предложить для улучшения системы.</span></h2>
      <br>
      <h2><span style="color: black; font-size: 20px; font-family: cursive; font-style:italic">Благодарим за уделенное внимание! Хорошего вам настроения!</span></h2>
    </header>
  </div>
</template>

<script>

export default {
  name: "Home",
  data() {
    return {
      content: "Добро пожаловать",
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  }
};
</script>
