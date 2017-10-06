<template>
  <div class="ui basic segment">
    <div class='ui card left floated' style="min-width:300px;">
      <div class='content'>
        <div class='header'>
            {{ account.email }}
        </div>
        <div class='meta'>
            {{ account.companyId }}
        </div>
        <div class='description'>
            {{ account.apiKey }}
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
              <label>Email</label>
              <input type='text' v-model="account.email" >
            </div>
            <div class='field'>
              <label>Company Id</label>
              <input type='text' v-model="account.companyId" >
            </div>
            <div class='field'>
              <label>API Key</label>
              <input type='text' v-model="account.apiKey">
            </div>
            <div class='ui two button attached buttons'>
              <button class='ui basic green button' @click="updateForm">
                Save
              </button>
              <button class='ui basic black button' @click="hideForm">
                Cancel
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
      },
      updateForm() {
        this.$emit('update-account', this.account);
        this.hideForm();
      }
    }
  };
</script>
