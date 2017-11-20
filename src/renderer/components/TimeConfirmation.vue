<template>
<!-- <modal name="time-confirmation" transition="pop-out" :width="350" @before-open="beforeOpen" :height="300"> -->
<div class='content' style="padding:20px;">

  <div class="ui form">
    <div class='header' style='font-size: 20px;'>
      Confirm Time
    </div>
    <div class='meta' style="margin-bottom: 5px;">
      Logged Time: {{ hhmmss(loggedTime.totalSeconds) }}
    </div>
    <div class="field">
      <label class="left floated">Notes</label>
      <input v-model="notes" type="text" required>
    </div>
    <div class="inline field">
      <!--TODO: checkbox class makes it reset, fix that and add it back-->
      <div class="ui">
        <input type="checkbox" v-model="taskCompleted">
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
  <div class="ui actions">
    <button class="right floated deny ui button">
      Cancel
    </button>
    <button class="right floated ui positive button" :class="{ 'disabled': selectedWorkType === null }" @click="submit">
      Confirm
    </button>
  </div>
</div>
<!-- </modal> -->
</template>

<script>
import request from 'request';
import $ from 'jquery';

import TimeFormat from '@/mixins/TimeFormat';

export default {
  mixins: [
    TimeFormat
  ],
  data() {
    return {
      workTypes: [],
      workTypesReady: false,
      selectedWorkType: null,
      notes: '',
      credentials: {},
      taskCompleted: false
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
          this.$toasted.error('No Payable Account!');
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
    markStatus({ team, username, password }, status) {
      const url = `https://${team}.atlassian.net/rest/api/2/issue/${this.task.id}/transitions`;
      request({
        method: 'GET',
        url,
        auth: {
          username,
          password
        }
      }, (error, response, body) => {
        if (error) {
          console.log(error);
          return;
        }
        body = JSON.parse(body);
        let tranId = -1;
        body.transitions.forEach((tran) => {
          if (tran.name.toLowerCase().includes(status.toLowerCase())) {
            tranId = tran.id;
          }
        });
        const options = {
          method: 'POST',
          url,
          auth: {
            username,
            password
          },
          body: {
            transition: {
              id: tranId
            }
          },
          json: true
        };

        request(options, (error, response, body) => {
          if (error || response.statusCode >= 300) {
            console.log(error, response);
            this.$toasted.error('An error occurred while marking task in "' + status + '"');
          } else {
            if (status === 'Done') {
              this.$toasted.show('Task marked completed!');
              this.$emit('remove-task', { task: this.task });
            }
          }
        });
      });
    },
    submit() {
      this.$db.jira.find({ 'team': this.task.team }, (err, res) => {
        if (err) {
          console.log(err);
          return;
        }
        if (res.length === 0) {
          this.$toasted.error('No Jira account!');
          return;
        }
        const acct = res[0];
        if (this.taskCompleted) {
          this.markStatus(acct, 'done');
        } else {
          this.markStatus(acct, 'progress');
        }
        if (this.loggedTime.totalSeconds >= 60) {
          this.logJiraTime(acct);
        }
      });
      this.logPayableTime();
    },
    logJiraTime({ team, username, password }) {
      const url = `https://${team}.atlassian.net/rest/api/2/issue/${this.task.id}/worklog`;
      const options = {
        method: 'POST',
        url,
        auth: {
          username,
          password
        },
        body: {
          timeSpentSeconds: this.loggedTime.totalSeconds
        },
        json: true
      };

      request(options, (error, response, body) => {
        if (error || response.statusCode >= 300) {
          console.log(error, response);
          this.$toasted.error('An error occurred while logging time in JIRA.');
        } else {
          this.$toasted.show('Logged time in JIRA!');
        }
      });
    },
    logPayableTime() {
      this.$db.payable.find({}, (err, res) => {
        if (err) {
          console.log(err);
          return;
        }
        if (res.length === 0) {
          this.$toasted.error('No Payable account found!');
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
            this.$toasted.show('Successfully logged time!');
          } else {
            this.$toasted.error('An error occurred.');
            console.log(error);
            console.log(response.statusCode);
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
