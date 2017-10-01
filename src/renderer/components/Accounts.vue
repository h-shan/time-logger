<template>
  <div class="container-fluid">
    <p>Your Accounts</p>
    <div class="ui pointing menu">
      <router-link class="item" :class="{ active: selectedTab === 'payable' }"
      @click.native="selectTab('payable')" to="/accounts/payable">
        Payable
      </router-link>
      <router-link class="item" :class="{ active: selectedTab === 'jira' }"
      @click.native="selectTab('jira')" to="/accounts/jira">
        JIRA
      </router-link>
    </div>
    <transition>
      <router-view name="body"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTab: 'payable'
    };
  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab;
    }
  }
};
</script>
