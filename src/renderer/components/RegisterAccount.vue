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
            <input v-model="nameText" type="text" ref="title" defaultValue="">
          </div>
          <div class="field">
            <label class="left floated" style="margin-left:10px;">Username</label>
            <input v-model="usernameText" type="text" ref="project" defaultValue="">
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
        this.$emit('add-account', {
          name,
          username,
          done: false
        });
      }
      this.isCreating = false;
    }
  }
};
</script>
