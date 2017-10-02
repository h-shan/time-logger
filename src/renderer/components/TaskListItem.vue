<template>
  <div class="ui card">
    <div class="content">
      <div class="header">{{ task.name }}</div>
      <div class="meta">{{ task.project }}</div>
      <div class="description">{{ task.description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['task']
};
</script>
