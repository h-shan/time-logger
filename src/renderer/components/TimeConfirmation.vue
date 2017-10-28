<template>
<!-- <modal name="time-confirmation" transition="pop-out" :width="350" @before-open="beforeOpen" :height="300"> -->
<div class='content' style="padding:20px;">

  <div class="ui form">
    <div class='header' style='font-size: 20px;'>
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
      <div class="ui">
        <input type="checkbox" v-model="taskCompleted" @click="console.log('hello')">
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

export default {
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
    markStatus(team, user, pass, status) {
      const url = 'https://' + team + '.atlassian.net/rest/api/2/issue/' + this.task.id + '/transitions';
      request({
        method: 'GET',
        url,
        auth: {
          user,
          pass
        }
      }, (error, response, body) => {
        if (error) {
          console.log(error);
          return;
        }
        body = JSON.parse(body);
        let tranId = -1;
        body.transitions.forEach((tran) => {
          if (tran.name === status) {
            tranId = tran.id;
          }
        });
        const options = {
          method: 'POST',
          url,
          auth: {
            user,
            pass
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
            alert('An error occurred while marking item complete.');
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
          alert('No Jira account!');
          return;
        }
        const acct = res[0];
        if (this.taskCompleted) {
          this.markStatus(acct.team, acct.username, acct.password, 'Done');
        } else {
          this.markStatus(acct.team, acct.username, acct.password, 'In Progress');
        }
      });
      this.logPayableTime();
    },
    logPayableTime() {
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
          } else {
            alert('An error occurred.');
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
