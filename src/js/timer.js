const btnRefs = {
  start: document.querySelector('button[data-action="Start"]'),
  stop: document.querySelector('button[data-action="Stop"]'),
};

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }
  intervalId = null;
  isActive = false;
  getRefs() {
    const clock = document.querySelector(this.selector);
    return {
      days: clock.querySelector('span[data-value="days"]'),
      hours: clock.querySelector('span[data-value="hours"]'),
      mins: clock.querySelector('span[data-value="mins"]'),
      secs: clock.querySelector('span[data-value="secs"]'),
    };
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
  updateClockFace(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    this.getRefs().secs.textContent = `${secs}`;
    this.getRefs().mins.textContent = `${mins}`;
    this.getRefs().hours.textContent = `${hours}`;
    this.getRefs().days.textContent = `${days}`;
  }
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;
      if (deltaTime <= 0) {
        this.updateClockFace(0);
        return;
      }
      this.updateClockFace(deltaTime);
    }, 1000);
  }
  stop() {
    clearInterval(this.intervalId);
    // this.intervalId = null;
    this.isActive = false;
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 07, 2021'),
});

btnRefs.start.addEventListener('click', timer.start.bind(timer));
btnRefs.stop.addEventListener('click', timer.stop.bind(timer));