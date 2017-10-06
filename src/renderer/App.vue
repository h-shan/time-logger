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
      <router-view name="body" v-on:task-selected="enableTimer($event)"></router-view>
    </transition>
    <Timer :task-selected="taskSelected" v-on:submit-time="processTimeSubmission($event)"></Timer>
    <TimeConfirmation :logged-time="loggedTime"/>
  </div>
</template>

<script>
import Timer from '@/components/Timer';
import TimeConfirmation from '@/components/TimeConfirmation';

export default {
  data() {
    return {
      selectedTab: 'tasks',
      taskSelected: false,
      loggedTime: {}
    };
  },
  created() {
    this.$router.push({ path: '/' });
  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab;
    },
    enableTimer($event) {
      this.taskSelected = $event.selected;
    },
    processTimeSubmission($event) {
      this.loggedTime = $event;
      this.$modal.show('time-confirmation');
    }
  },
  components: {
    Timer,
    TimeConfirmation
  }
};
</script>

<style lang="scss">
  @import 'assets/sass/main.scss';
</style>
