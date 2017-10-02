<template>
  <div class="ui basic segment">
    <button class="ui basic button icon" v-on:click="openForm" v-show="!isCreating">
      <i class="plus icon"></i>
    </button>
    <div class="ui card left floated" v-show="isCreating" style="min-width:300px;">
      <div class="content">
        <div class="ui form">
          <div class="field">
            <label class="left floated" style="margin-left:10px;">Name</label>
            <input v-model="nameText" type="text" defaultValue="">
          </div>
          <div class="field">
            <label class="left floated" style="margin-left:10px;">Username</label>
            <input v-model="usernameText" type="text" defaultValue="">
          </div>
          <div class="field">
            <label>Password</label>
            <input v-model="passwordText" type="password" defaultValue="">
          </div>
          <div class="ui two button attached buttons">
            <button class="ui basic blue button" v-on:click="sendForm()">
              Create
            </button>
            <button class="ui basic red button" v-on:click="closeForm">
              Cancel
            </button>
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
      nameText: '',
      usernameText: '',
      passwordText: '',
      isCreating: false
    };
  },
  methods: {
    openForm() {
      this.isCreating = true;
    },
    closeForm() {
      this.isCreating = false;
    },
    sendForm() {
      if (this.nameText.length > 0 && this.usernameText.length > 0) {
        const name = this.nameText;
        const username = this.usernameText;
        const password = this.passwordText;
        this.$emit('add-account', {
          name,
          username,
          password
        });
        this.nameText = this.usernameText = '';
      }
      this.isCreating = false;
    }
  }
};
</script>
