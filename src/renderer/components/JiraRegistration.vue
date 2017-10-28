<template>
  <div class="ui basic segment">
    <button class="ui basic button icon" @click="openForm" v-show="!isCreating">
      <i class="plus icon"></i>
    </button>
    <div class="ui card left floated" v-show="isCreating" style="min-width:300px;">
      <div class="content">
        <div class="ui form">
          <div class="field">
            <label class="left floated">Team</label>
            <input v-model="accountForm.team" type="text" required>
          </div>
          <div class="field">
            <label class="left floated">Username</label>
            <input v-model="accountForm.username" type="text" required>
          </div>
          <div class="field">
            <label>Password</label>
            <input v-model="accountForm.password" type="password" required>
          </div>
          <div class="ui two button attached buttons">
            <button class="ui basic blue button" @click="sendForm">
              Create
            </button>
            <button class="ui basic red button" type="button" @click="closeForm">
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
      accountForm: {},
      isCreating: false
    };
  },
  methods: {
    openForm() {
      this.isCreating = true;
      this.accountForm = {
        team: '',
        username: '',
        password: ''
      };
    },
    closeForm() {
      this.isCreating = false;
    },
    sendForm() {
      if (!this.accountForm.team || !this.accountForm.username || !this.accountForm.password) {
        return;
      }
      this.$emit('add-account', {
        team: this.accountForm.team,
        username: this.accountForm.username,
        password: this.accountForm.password
      });
      this.isCreating = false;
    }
  }
};
</script>
