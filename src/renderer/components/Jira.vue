<template>
  <div>
    <JiraAccount v-for="account in accounts" :account="account"
    v-on:delete-account="deleteAccount($event)" v-on:update-account="updateAccount($event)"
    style="margin-bottom:0px;"></JiraAccount>
    <JiraRegistration v-on:add-account="addAccount($event)" style="margin-top:0px;"/>
  </div>
</template>

<script>
import JiraAccount from './JiraAccount';
import JiraRegistration from './JiraRegistration';

export default {
  data() {
    return {
      accounts: []
    };
  },
  methods: {
    addAccount(account) {
      console.log(account);
      this.$db.jira.insert(Object.assign({ type: 'jira' }, account), (err, doc) => {
        if (err) {
          console.error(err);
        }
        console.log(doc);
        this.updateAccounts();
      });
    },
    deleteAccount(account) {
      this.$db.jira.remove(account, {}, (err) => {
        if (err) {
          console.error(err);
        }
        this.updateAccounts();
      });
    },
    updateAccount(account) {
      this.$db.jira.update({ _id: account._id }, account, {}, (err) => {
        if (err) {
          console.error(err);
        }
        this.updateAccounts();
      });
    },
    updateAccounts() {
      return this.$db.jira.find({}, (err, res) => {
        if (err) {
          console.error(err);
          return;
        }
        this.accounts = res;
      });
    }
  },
  created() {
    this.updateAccounts();
  },
  components: {
    JiraAccount,
    JiraRegistration
  }
};
</script>
