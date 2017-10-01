<template>
  <div>
    <AccountList :accounts="testData" v-on:accounts-update="updateAccounts"></AccountList>
  </div>
</template>

<script>
import AccountList from './AccountList';

export default {
  computed: {
    testData() {
      return {};
    }
  },
  methods: {
    updateAccounts(accounts) {
      console.log(accounts);
    }
  },
  components: {
    AccountList
  }
};
</script>
