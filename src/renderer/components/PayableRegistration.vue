<template>
  <div class="ui basic segment">
    <button class="ui basic button icon" @click="openForm" v-show="!isCreating">
      <i class="plus icon"></i>
    </button>
    <div class="ui card left floated" v-show="isCreating" style="min-width:300px;">
      <div class="content">
        <div class="ui form">
          <div class="field">
            <label class="left floated">Email</label>
            <input v-model="accountForm.email" type="text" required>
          </div>
          <div class="field">
            <label class="left floated">Company Id</label>
            <input v-model="accountForm.companyId" type="text" required>
          </div>
          <div class="field">
            <label class="left floated">API Key</label>
            <input v-model="accountForm.apiKey" type="text" required>
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
        apiKey: '',
        companyId: '',
        email: ''
      };
    },
    closeForm() {
      this.isCreating = false;
    },
    sendForm() {
      if (!this.accountForm.email || !this.accountForm.companyId || !this.accountForm.apiKey) {
        return;
      }
      this.$emit('add-account', this.accountForm);
      this.isCreating = false;
    }
  }
};
</script>
