<template>
  <div>
    <PayableAccount v-for="account in accounts" :account="account"
    v-on:delete-account="deleteAccount($event)" v-on:update-account="updateAccount($event)"
    style="margin-bottom:0px;"></PayableAccount>
    <PayableRegistration v-on:add-account="addAccount($event)" style="margin-top:0px;" v-if="accounts.length === 0"/>
  </div>
</template>

<script>
import request from 'request';

import PayableAccount from './PayableAccount';
import PayableRegistration from './PayableRegistration';

export default {
  data() {
    return {
      accounts: []
    };
  },
  methods: {
    deleteAccount(account) {
      this.$db.payable.remove(account, {}, (err) => {
        if (err) {
          console.error(err);
        }
        this.updateAccounts();
      });
    },
    updateAccount(account) {
      this.queryPayable(account, this.updateAcc);
    },
    updateAccounts() {
      return this.$db.payable.find({}, (err, res) => {
        if (err) {
          console.error(err);
          return;
        }
        this.accounts = res;
      });
    },
    addAccount(account) {
      this.queryPayable(account, this.insertAcc);
    },
    queryPayable(account, callback) {
      const options = {
        url: 'https://api.payable.com/v1/workers',
        auth: {
          'user': account.companyId,
          'pass': account.apiKey
        }
      };

      request(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const workers = JSON.parse(body).workers;
          workers.forEach((worker) => {
            if (worker.email === account.email) {
              account = Object.assign(account, worker);
              callback(account);
            }
          });
        } else {
          this.$toasted.error('There was an error in registering your account.');
        }
      });
    },
    insertAcc(account) {
      this.$db.payable.insert(account, (err, doc) => {
        if (err) {
          this.$toasted.error('There was an error in registering your account.');
          console.error(err);
        }
        this.updateAccounts();
      });
    },
    updateAcc(account) {
      this.$db.payable.update({ _id: account._id }, account, {}, (err) => {
        if (err) {
          console.error(err);
        }
        this.updateAccounts();
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
