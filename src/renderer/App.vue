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
      <router-view name="body" ref="rView" v-on:task-selected="enableTimer($event)" :timer-running="timerRunning"></router-view>
    </transition>
    <Timer :task-selected="taskSelected" v-on:started="timerRunning = true" v-on:submit-time="processTimeSubmission($event)"></Timer>
    <div class="ui modal card" style="width:300px; height:300px; position:fixed; margin:-125px;">
      <TimeConfirmation ref="confirm" :task="selectedTaskInfo" :logged-time="loggedTime" v-on:remove-task="removeTask($event)"/>
    </div>
  </div>
</template>

<script>
import Timer from '@/components/Timer';
import TimeConfirmation from '@/components/TimeConfirmation';
import $ from 'jquery';

export default {
  data() {
    return {
      selectedTab: 'tasks',
      taskSelected: false,
      selectedTaskInfo: {},
      loggedTime: {},
      timerRunning: false
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
      this.taskSelected = $event !== null;
      this.selectedTaskInfo = $event;
    },
    removeTask($event) {
      this.$refs.rView.getTasks();
    },
    processTimeSubmission($event) {
      this.timerRunning = false;
      this.loggedTime = $event;
      $('.ui.modal').modal({
        closable: false
      }).modal('show');
      this.$refs.confirm.beforeOpen();
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
