<template>
  <div>
    <PayableAccount v-for="account in accounts" :account="account"
    v-on:delete-account="deleteAccount($event)" v-on:update-account="updateAccount($event)"
    style="margin-bottom:0px;"></PayableAccount>
    <PayableRegistration v-on:add-account="addAccount($event)" style="margin-top:0px;" v-if="accounts.length === 0"/>
  </div>
</template>

<script>
import PayableAccount from './PayableAccount';
import PayableRegistration from './PayableRegistration';

export default {
  data() {
    return {
      accounts: []
    };
  },
  methods: {
    addAccount(account) {
      this.$db.payable.insert(account, (err, doc) => {
        if (err) {
          console.error(err);
        }
        this.updateAccounts();
      });
    },
    deleteAccount(account) {
      this.$db.payable.remove(account, {}, (err) => {
        if (err) {
          console.error(err);
        }
        this.updateAccounts();
      });
    },
    updateAccount(account) {
      this.$db.payable.update({ _id: account._id }, account, {}, (err) => {
        if (err) {
          console.error(err);
        }
        this.updateAccounts();
      });
    },
    updateAccounts() {
      return this.$db.payable.find({}, (err, res) => {
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
    PayableAccount,
    PayableRegistration
  }
};
</script>
