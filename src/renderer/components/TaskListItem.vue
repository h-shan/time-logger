<template>
  <div class="ui card" :class="{ 'green': task.selected, 'task-selected': task.selected }" @click="select">
    <div class="content">
      <div class="header">{{ task.name }}</div>
      <div class="meta">{{ task.project }}</div>
      <div class="description">{{ 'Priority: ' + task.description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['task'],
  methods: {
    select() {
      this.$emit('select', {
        'id': this.task.id,
        'isActive': !this.task.selected
      });
    }
  }
};
</script>
