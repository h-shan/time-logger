<template>
<!-- <modal name="time-confirmation" transition="pop-out" :width="350" @before-open="beforeOpen" :height="300"> -->
<div class="card">
  <div class='content' style="padding:20px;">

    <div class="ui form">
      <div class='header'>
        Confirm Time
      </div>
      <div class='meta' style="margin-bottom: 5px;">
        Logged Time: {{ loggedTime.hours }}:{{ loggedTime.minutes }}:{{ loggedTime.seconds }}
      </div>
      <div class="field">
        <label class="left floated">Notes</label>
        <input v-model="notes" type="text" required>
      </div>
      <div class="inline field">
        <div class="ui checkbox">
          <input type="checkbox">
          <label>Mark Completed</label>
        </div>
      </div>
      <div class="ui compact menu" style="margin-bottom:10px;">
        <div class="ui simple dropdown item" :class="{ 'loading': !workTypesReady }">
          Work Type
          <i class="dropdown icon"></i>
          <div class="menu">
            <div class="item" v-for="workType in workTypes" @click="select(workType)">{{ workType.name }}</div>
          </div>
        </div>
        <div style="padding:10px;" v-if="selectedWorkType">{{ selectedWorkType.name }}</div>
      </div>
      <br>

    </div>
    <div class="actions">
      <button class="right floated deny ui button">
        Cancel
      </button>
      <button class="right floated ui positive button" :class="{ 'disabled': selectedWorkType === null }" @click="submit">
        Confirm
      </button>
    </div>
  </div>
</div>
<!-- </modal> -->
</template>

<script>
import request from 'request';
import url from 'url';
import $ from 'jquery';

export default {
  data() {
    return {
      workTypes: [],
      workTypesReady: false,
      selectedWorkType: null,
      notes: '',
      credentials: {},
      taskCompleted: true
    };
  },
  props: [
    'loggedTime',
    'task'
  ],
  methods: {
    beforeOpen() {
      this.notes = this.task.name;
      this.$db.payable.find({}, (err, res) => {
        if (err) {
          console.log(err);
          return;
        }
        if (res.length === 0) {
          console.log('No Account!');
          alert('No Payable Account!');
          return;
        }
        const acc = res[0];
        this.credentials = {
          email: acc.email,
          companyId: acc.companyId,
          apiKey: acc.apiKey
        };
        this.getWorkOptions();
      });
    },
    select(workType) {
      this.selectedWorkType = workType;
    },
    getWorkOptions() {
      const options = {
        url: 'https://api.payable.com/v1/work_types',
        auth: {
          'user': this.credentials.companyId,
          'pass': this.credentials.apiKey
        }
      };

      request(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const res = JSON.parse(body);
          this.workTypes = res.work_types;
          this.workTypesReady = true;
        }
      });
    },
    markCompleted(team, username, password) {
      const options = {
        method: 'PUT',
        url: url.format({
          protocol: 'https:',
          host: team + '.atlassian.net',
          pathname: '/rest/api/2/issue/' + this.task.id
        }),
        auth: {
          'user': username,
          'pass': password
        },
        form: {
          fields: {
            resolution: {
              self: 'https://skedlife.atlassian.net/rest/api/2/resolution/10000',
              id: '10000',
              description: 'Work has been completed on this issue.',
              'name': 'Done'
            }
          }
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
    },
    toggleCompletion() {
      console.log('he');
      this.taskCompleted = !this.taskCompleted;
    },
    submit() {
      this.$db.payable.find({}, (err, res) => {
        if (err) {
          console.log(err);
          return;
        }
        if (res.length === 0) {
          alert('No Payable account found!');
          return;
        }
        const payableId = res[0].id;
        const options = {
          method: 'POST',
          url: 'https://api.payable.com/v1/work',
          auth: {
            'user': this.credentials.companyId,
            'pass': this.credentials.apiKey
          },
          form: {
            worker_id: payableId,
            work_type_id: this.selectedWorkType.id,
            quantity: this.loggedTime.totalSeconds,
            start: this.loggedTime.beginTime,
            notes: this.notes
          }
        };

        request(options, (error, response, body) => {
          if (!error && response.statusCode < 300) {
            alert('Successfully logged time!');
            this.hide();
          } else {
            alert('An error occurred.');
            console.log(error);
            console.log(response.statusCode);
            this.hide();
          }
        });
      });
    }
  },
  mounted() {
    $('.ui.checkbox').checkbox();
  }
};
</script>
