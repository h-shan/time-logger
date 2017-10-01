<template>
  <div>
    <AccountListItem v-on:delete-account="deleteAccount($event)"
    v-for="account in accounts" :account="account"></AccountListItem>
    <RegisterAccount v-on:add-account="addAccount($event)"></RegisterAccount>
  </div>
</template>

<script type = "text/javascript" >

import AccountListItem from './AccountListItem';
import RegisterAccount from './RegisterAccount';

export default {
  props: ['accounts'],
  methods: {
    deleteAccount(account) {
      const accountIndex = this.accounts.indexOf(account);
      this.accounts.splice(accountIndex, 1);
      this.$emit('accounts-update', this.accounts);
    },
    addAccount(account) {
      this.accounts.push(account);
      this.$emit('accounts-update', this.accounts);
    }
  },
  components: {
    AccountListItem,
    RegisterAccount
  }
};
</script>
