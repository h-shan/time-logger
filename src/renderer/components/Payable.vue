<template>
  <div>
    <AccountList :accounts="accounts" v-on:add-account="addAccount" v-on:delete-account="deleteAccount"></AccountList>
  </div>
</template>

<script>
import AccountList from './AccountList';

export default {
  data() {
    return {
      accounts: []
    };
  },
  methods: {
    addAccount(account) {
      this.$db.accounts.insert(Object.assign({ type: 'payable' }, account), (err, doc) => {
        if (err) {
          console.log(err);
        }
        console.log(doc);
        this.updateAccounts();
      });
    },
    deleteAccount(account) {
      this.$db.accounts.remove(account);
      this.updateAccounts();
    },
    updateAccounts() {
      return this.$db.accounts.find({ type: 'payable' }, (err, res) => {
        if (err) {
          console.log(err);
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
    AccountList
  }
};
</script>
