<template>
  <div class="ui card" :class="{ 'green': task.selected, 'task-selected': task.selected }" @click="select">
    <div class="content">
      <div class="header">{{ task.name }}</div>
      <div class="meta">{{ task.project }}, {{ task.team }}</div>
      <div class="description">{{ 'Priority: ' + task.description }}</div>
      <div class="description">{{ 'Issue type: ' + task.issueType }}</div>
      <div class="description" v-if="task.timeEstimate">{{ 'Time estimate: ' + xhxmxs(task.timeEstimate) }}</div>
    </div>
  </div>
</template>

<script>
import TimeFormat from '@/mixins/TimeFormat';

export default {
  mixins: [
    TimeFormat
  ],
  props: ['task'],
  methods: {
    select() {
      this.$emit('select', this.task);
    }
  }
};
</script>
