<template>
  <div class="container-fluid">
    <TaskListItem v-for="task in tasks" :task="task" v-on:select="select($event)" :key="task.id"></TaskListItem>
  </div>
</template>

<script>
import request from 'request';
import url from 'url';
import TaskListItem from './TaskListItem';

export default {
  data() {
    return {
      tasks: []
    };
  },
  props: [
    'timerRunning'
  ],
  methods: {
    select(selectedTask) {
      if (!this.timerRunning) {
        if (selectedTask.isActive) {
          this.tasks.forEach((task) => {
            if (task.id === selectedTask.id) {
              this.$set(task, 'selected', true);
            } else {
              this.$set(task, 'selected', false);
            }
          });
        } else {
          this.tasks.forEach((task) => {
            if (task.id === selectedTask.id) {
              this.$set(task, 'selected', false);
            }
          });
        }
        this.$emit('task-selected', { 'selected': selectedTask.isActive });
      }
    },
    deselect() {
      this.$emit('task-selected', { 'selected': false });
    },
    queryJira(team, username, password) {
      try {
        const options = {
          url: url.format({
            protocol: 'https:',
            host: team + '.atlassian.net',
            pathname: '/rest/api/2/search',
            search: '?jql=assignee=' + username
          }),
          auth: {
            'user': username,
            'pass': password
          }
        };

        request(options, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            body = JSON.parse(body);
            body.issues.forEach((issue) => {
              const id = issue.id;
              const description = issue.fields.priority.name;
              const name = issue.fields.summary;
              const project = issue.fields.project.name;
              this.tasks.push({ id, description, name, project });
            });
          }
        });
      } catch (err) {
        console.log('Error in finding task: ' + err);
      }
    }
  },
  mounted() {
    // wait for db to load
    setTimeout(() => {
      this.$db.accounts.find({ type: 'jira' }, (err, accounts) => {
        if (err) {
          console.error(err);
          return;
        }
        accounts.forEach((account) => {
          this.queryJira(account.team, account.username, account.password);
        });
      });
    }, 500);
  },
  components: {
    TaskListItem
  }
};
</script>
