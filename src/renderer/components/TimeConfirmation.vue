<template>
<modal name="time-confirmation" transition="pop-out" :width="modalWidth" @before-open="beforeOpen" :height="400">
  <div class="ui centered box">
    <div class='ui centered card'>
      <div class='content'>
        <div class='header'>
          Confirm Time
        </div>
        <div class='meta' style="margin-bottom: 5px;">
          Logged Time: {{ loggedTime.hours }}:{{ loggedTime.minutes }}:{{ loggedTime.seconds }}
        </div>
        <div class="ui compact menu" style="margin-bottom:10px;">
          <div class="ui simple dropdown item" :class="{ 'loading': !workTypesReady }">
            Work Type
            <i class="dropdown icon"></i>
            <div class="menu">
              <div class="item" v-for="workType in workTypes" @click="select(workType)">{{ workType.name }}</div>
            </div>
          </div>
          <div style="padding:10px;" v-if="selectedWorkType.name">{{ selectedWorkType.name }}</div>
        </div>
        <br>
        <button class="ui button" @click="cancel">
          Cancel
        </button>
        <button class="ui positive button" @click="submit">
          Confirm
        </button>
      </div>
    </div>
  </div>
</modal>
</template>

<script>
import request from 'request';

const MODAL_WIDTH = 350;
export default {
  data() {
    return {
      modalWidth: MODAL_WIDTH,
      workTypes: [],
      workTypesReady: false,
      selectedWorkType: {},
      credentials: {}
    };
  },
  props: [
    'loggedTime'
  ],
  methods: {
    beforeOpen() {
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
    cancel() {
      this.hide();
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
        console.log(this.selectedWorkType);
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
            start: this.loggedTime.beginTime
          }
        };

        request(options, (error, response, body) => {
          console.log(body);
          if (!error && response.statusCode < 300) {
            alert('Successfully logged time!');
            this.hide();
          } else {
            alert('An error occurred.');
            console.log(err);
            console.log(response.statusCode);
            this.hide();
          }
        });
      });
    },
    hide() {
      this.$modal.hide('time-confirmation');
    }
  }
};
</script>