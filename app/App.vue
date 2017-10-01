<template>
  <div id="app">
    <nav class="navbar navbar-default" style="border:none;">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <div class="navbar-brand">Time Logger</div>
        </div>
      </div>
      <ul class="nav nav-tabs">
        <li role="presentation" class="active">
          <router-link to="/tasks">
            <span>Tasks</span>
          </router-link>
        </li>
        <li role="presentation">
          <router-link to="/accounts">
            <span>Accounts</span>
          </router-link>
        </li>
      </ul>
    </nav>
    <transition>
      <router-view name="body"></router-view>
    </transition>
  </div>
</template>

<script>
import Tasks from '@/components/Tasks.vue';

export default {
  created() {
    console.log(this.$route.path);
    this.$router.push({ path: '/'});
    console.log(this.$route.path);
  }
}
</script>

<style lang="scss">
  @import 'assets/sass/main.scss';
</style>
