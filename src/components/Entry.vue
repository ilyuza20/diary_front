<template>
  <div class="container">
    <form @submit.prevent="addEntry()">
      <div class="form-group row mt-4">
        <input class="form-control  col-sm-2 mr-4 " v-model="newEntryTitle" name="newEntryTitle" autocomplete="off"
               placeholder="Заголовок">
        <input class="form-control  col-sm-2 mr-4 " v-model="newEntryText" name="newEntryText" autocomplete="off"
               placeholder="Текст">
        <button class="form-control btn btn-secondary col-sm-2 ">Добавить</button>
      </div>

    </form>
    <table class="table">
      <tr>
        <th>Заголовок</th>
        <th>Текст</th>
        <th>Дата</th>
        <th>Управление</th>

      </tr>
      <tr v-for="entry in content" :key="entry.id">
        <td>{{ entry.title }}</td>
        <td>{{ entry.text }}</td>
        <td>{{ entry.date }}</td>
        <td class="row">
          <!--          edit-->
          <div type="button" class="col" data-toggle="modal" data-target="#exampleModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil"
                 viewBox="0 0 16 16">
              <path
                  d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            </svg>
          </div>
          <!--          modal-->
          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
               aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Редактировать</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                    <div class="form-group  ">
                      <input class="form-control mb-4" v-model="entry.title" name="editTitle" autocomplete="off">
                      <input class="form-control mb-4" v-model="entry.text"  name="editText" autocomplete="off"
                             placeholder="Текст">
                      <button v-on:click="editEntry(entry)"  class="form-control btn btn-secondary mb-4" data-dismiss="modal">Редактировать</button>
                    </div>
                </div>

              </div>
            </div>
          </div>
          <!--          remove-->
          <div v-on:click="removeEntry(entry)" type="button" class="col">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle"
                 viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </div>

        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "Entry",
  data() {
    return {
      content: "",
      idUser: 0,
      newEntryTitle: "",
      newEntryText: "",
      editText:"",
    };
  },
  mounted() {
    let idUser = this.$store.state.auth.user.id
    this.idUser = idUser
    UserService.getEntries(idUser).then(
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
  methods: {
    removeEntry(entry) {
      const index = this.content.indexOf(entry);
      this.content.splice(index, 1);
      UserService.removeEntry(this.idUser, entry.id).then(
          (response) => {
            if (response.status.ok) {
              console.log("removed")
            }
          },
          (error) => {
            console.log(error.response.data.status)
          })
    },
    editEntry(entry) {
      if (entry.title.length>0 && entry.text.length>0){
        UserService.editEntry(this.idUser,entry.id,entry.title,entry.text)
      }
    },
    addEntry() {
      let recievedEntry = {title: this.newEntryTitle, text: this.newEntryText};
      console.log(recievedEntry.title)
      if (recievedEntry.title.length > 0 && recievedEntry.text.length > 0) {
        UserService.addEntry(this.idUser, recievedEntry.title, recievedEntry.text).then(
            (response) => {
              this.content.push({
                id: response.data.id,
                title: response.data.title,
                text: response.data.text,
                date: response.data.date,
              });
            },
            (error) => {
              console.log(error.response.data.status)
            }
        )
        this.newEntryText = "";
        this.newEntryTitle = "";
      }
    },
  }
};
</script>
