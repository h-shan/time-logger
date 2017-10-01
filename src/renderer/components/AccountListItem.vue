<template>
  <div class="ui basic segment">
    <div class='ui card left floated' style="min-width:300px;">
      <div class='content'>
        <div class='header'>
            {{ account.name }}
        </div>
        <div class='meta'>
            {{ account.username }}
        </div>
        <div class='extra content'>
            <span class='right floated edit icon' @click="showForm">
              <i class='edit icon'></i>
            </span>
            <span class='right floated trash icon' @click="deleteAccount(account)">
              <i class='trash icon'></i>
            </span>
        </div>
        <div class="content" v-show="isEditing">
          <div class='ui form'>
            <div class='field'>
              <label>Name</label>
              <input type='text' v-model="account.name" >
            </div>
            <div class='field'>
              <label>Username</label>
              <input type='text' v-model="account.username" >
            </div>
            <div class='ui two button attached buttons'>
              <button class='ui basic blue button' @click="hideForm">
                Close X
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isEditing: false
      };
    },
    props: ['account'],
    methods: {
      showForm() {
        this.isEditing = true;
      },
      hideForm() {
        this.isEditing = false;
      },
      deleteAccount(account) {
        this.$emit('delete-account', account);
      }
    }
  };
</script>
