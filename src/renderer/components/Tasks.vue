<template>
  <div class="container-fluid">
    <draggable v-model="tasks">
      <TaskListItem :task="task" v-on:select="select(task)" :key="task.id" v-for="task in tasks"></TaskListItem>
    </draggable>
  </div>
</template>

<script>
import request from 'request';
import url from 'url';
import TaskListItem from './TaskListItem';
import draggable from 'vuedraggable';

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
        if (!selectedTask.selected) {
          this.tasks.forEach((task) => {
            if (task.id === selectedTask.id) {
              this.$set(task, 'selected', true);
            } else {
              this.$set(task, 'selected', false);
            }
          });
          this.$emit('task-selected', selectedTask);
        } else {
          this.tasks.forEach((task) => {
            if (task.id === selectedTask.id) {
              this.$set(task, 'selected', false);
            }
          });
          this.$emit('task-selected', null);
        }
      }
    },
    queryJira(team, username, password) {
      this.tasks = [];
      const options = {
        url: url.format({
          protocol: 'https:',
          host: team + '.atlassian.net',
          pathname: '/rest/api/2/search',
          search: '?jql=assignee=' + username + '+AND+resolution=Unresolved'
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
            this.tasks.push({ id, team, description, name, project });
          });
        }
      });
    },
    getTasks() {
      this.$db.jira.find({}, (err, accounts) => {
        if (err) {
          console.error(err);
          return;
        }
        accounts.forEach((account) => {
          this.queryJira(account.team, account.username, account.password);
        });
      });
    }
  },
  mounted() {
    // wait for db to load
    setTimeout(() => {
      this.getTasks();
    }, 500);
  },
  components: {
    TaskListItem,
    draggable
  }
};
</script>
