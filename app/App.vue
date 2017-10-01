<template>
  <div id="app">

    <nav class="navbar navbar-default" style="border:none;">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <div class="navbar-brand">Time Logger</div>
        </div>
        <div class="ui tabular menu" style="margin-top: 0px;">

          <router-link class="ui item" :class="{ active: selectedTab === 'tasks' }"
          @click.native="selectTab('tasks')" to="/tasks">
            <span>Tasks</span>
          </router-link>

          <router-link class="ui item" :class="{ active: selectedTab === 'accounts' }"
          @click.native="selectTab('accounts')" to="/accounts">
            <span>Accounts</span>
          </router-link>
        </div>
      </div>
    </nav>
    <transition>
      <router-view name="body"></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  data() {
    return {
      selectedTab: 'tasks'
    }
  },
  created() {
    console.log(this.$route.path);
    this.$router.push({ path: '/'});
    console.log(this.$route.path);
  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab;
    }
  }
}
</script>

<style lang="scss">
  @import 'assets/sass/main.scss';
</style>
