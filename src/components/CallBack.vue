<template>
 <div class="container d-flex justify-content-center">
   <form @submit.prevent="addCallBack()" class="mt-4">
     <div class="form-group ">
       <input class="form-control mb-4" v-model="cbTitle" name="cbTitle" autocomplete="off" placeholder="Тема">
       <textarea  class="form-control mb-4" v-model="cbText" name="cbText" autocomplete="off" placeholder="Текст">
       </textarea>
       <button class="form-control btn btn-secondary">Отправить</button>
       <div v-if="isSent" class=" alert alert-success" role="alert">Отправлено!</div>
     </div>
   </form>
 </div>
</template>

<script>
import UserService from "../services/user.service";
export default {
name: "CallBack",
  data() {
    return {
      cbTitle: "",
      cbText : "",
      idUser: 0,
      isSent:false,
    };
  },
  mounted() {
    this.idUser =this.$store.state.auth.user.id
  },
  methods:{
    addCallBack(){
      UserService.addCallback(this.idUser,this.cbTitle,this.cbText).then(
          () => {
            this.isSent=true
          },
          (error) => {
            console.log((error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString());
          }
      );
    }
  }
}
</script>

<style scoped>

</style>