export default {
  methods: {
    pad(num) {
      return ('0' + num).slice(-2);
    },
    hhmmss(secs) {
      var minutes = Math.floor(secs / 60);
      secs = secs % 60;
      var hours = Math.floor(minutes / 60);
      minutes = minutes % 60;
      return this.pad(hours) + ':' + this.pad(minutes) + ':' + this.pad(secs);
    },
    xhxmxs(secs) {
      var minutes = Math.floor(secs / 60);
      secs = secs % 60;
      var hours = Math.floor(minutes / 60);
      minutes = minutes % 60;
      return (hours ? hours + 'h ' : '') +
        (minutes ? minutes + 'm ' : '') +
        (secs ? secs + 's ' : '');
    }
  }
};
