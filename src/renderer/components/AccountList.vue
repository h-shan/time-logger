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
      this.$emit('delete-account', account);
    },
    addAccount(account) {
      this.$emit('add-account', account);
    }
  },
  components: {
    AccountListItem,
    RegisterAccount
  }
};
</script>
