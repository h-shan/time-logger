<template>
  <div class="timer">
    <div class="massive ui label" style="float:right;">
      Time
      <span class="detail">{{ hhmmss(lapsed/1000) }}</span>
    </div>
    <br>
    <div class="ui two buttons">
      <button class="large ui positive button" @click="start" :class="{ 'disabled': !taskSelected }" v-if="state !== 'started'">
        {{ state === 'stopped' ? 'Start' : 'Resume' }}
      </button>
      <button class="large ui button" @click="pause" v-else>Pause</button>
      <button class="large ui button negative" @click="stop" :class="{ 'disabled': state !== 'started' }">Stop</button>
    </div>
  </div>
</template>

<script>
import TimeFormat from '@/mixins/TimeFormat';

export default {
  mixins: [
    TimeFormat
  ],
  data() {
    return {
      accumulatedTime: 0,
      state: 'stopped',
      beginTime: new Date(),
      startTime: Date.now(),
      currentTime: Date.now(),
      interval: null
    };
  },
  props: [
    'task-selected'
  ],
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
    }
  },
  methods: {
    start() {
      if (this.state === 'stopped') {
        this.beginTime = new Date();
      }
      this.state = 'started';
      this.zeroTimer();
      this.$emit('started');
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
      this.pause();
      this.$emit('submit-time', {
        beginTime: this.beginTime.toISOString(),
        hours: this.hours,
        minutes: this.minutes,
        seconds: this.seconds,
        totalSeconds: Math.ceil(this.accumulatedTime / 1000)
      });
      this.accumulatedTime = 0;
      this.state = 'stopped';
    },
    zeroTimer() {
      this.startTime = Date.now();
      this.currentTime = Date.now();
    }
  }
};
</script>
