<template>
  <div id="app">
    <nav class="navbar navbar-default" style="border:none;">
      <div class="container-fluid">
        <div class="row navbar-header">
          <div class="navbar-brand">Time Logger</div>
        </div>
      </div>
      <div class="row ui tabular menu" style="margin-top: 0px;">

        <router-link class="ui item" :class="{ active: selectedTab === 'tasks' }" style="margin-left:10px;"
        @click.native="selectTab('tasks')" to="/tasks">
          <span>Tasks</span>
        </router-link>

        <router-link class="ui item" :class="{ active: selectedTab === 'accounts' }"
        @click.native="selectTab('accounts')" to="/accounts">
          <span>Accounts</span>
        </router-link>
      </div>
    </nav>
    <transition>
      <router-view name="body"></router-view>
    </transition>
    <Timer></Timer>
  </div>
</template>

<script>
import Timer from '@/components/Timer';

export default {
  data() {
    return {
      selectedTab: 'tasks'
    };
  },
  created() {
    this.$router.push({ path: '/' });
  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab;
    }
  },
  components: {
    Timer
  }
};
</script>

<style lang="scss">
  @import 'assets/sass/main.scss';
</style>
