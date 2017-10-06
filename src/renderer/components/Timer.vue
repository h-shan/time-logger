<template>
  <div class="timer">
    <div class="massive ui label" style="float:right;">
      Time
      <span class="detail">{{ hours }}:{{ minutes }}:{{ seconds }}</span>
    </div>
    <br>
    <div class="ui two buttons">
      <button class="large ui positive button" @click="start" v-if="state !== 'started'">
        {{ state === 'stopped' ? 'Start' : 'Resume' }}
      </button>
      <button class="large ui button" @click="pause" v-else>Pause</button>
      <button class="large ui button negative" @click="stop" :class="{ 'button-disabled': state !== 'started' }">Stop</button>
    </div>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      accumulatedTime: 0,
      state: 'stopped',
      startTime: Date.now(),
      currentTime: Date.now(),
      interval: null
    };
  },
  mounted() {
    this.interval = setInterval(this.updateCurrentTime, 1000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  computed: {
    milliseconds() {
      return this.currentTime - this.startTime;
    },
    lapsed() {
      return this.milliseconds + this.accumulatedTime;
    },
    hours() {
      var hrs = Math.floor((this.lapsed / 1000 / 60 / 60));
      return hrs >= 10 ? hrs : '0' + hrs;
    },
    minutes() {
      var min = Math.floor((this.lapsed / 1000 / 60) % 60);
      return min >= 10 ? min : '0' + min;
    },
    seconds() {
      var sec = Math.ceil((this.lapsed / 1000) % 60);
      return sec >= 10 ? sec : '0' + sec;
    }
  },
  methods: {
    start() {
      this.state = 'started';
      this.zeroTimer();
    },
    pause() {
      this.state = 'paused';
      this.accumulatedTime += this.milliseconds;
      this.zeroTimer();
    },
    resume() {
      this.state = 'started';
    },
    updateCurrentTime() {
      if (this.state === 'started') {
        this.currentTime = Date.now();
      }
    },
    stop() {
      this.accumulatedTime = 0;
      this.state = 'stopped';
      this.zeroTimer();
    },
    zeroTimer() {
      this.startTime = Date.now();
      this.currentTime = Date.now();
    }
  }
};
</script>
