import { makeAutoObservable } from "mobx";
import { Alert } from "react-native";

class TimerStore {
  targetTime: Date | null = null;
  remainingTime: string = "";
  intervalId: NodeJS.Timeout | null = null;
  lateDuration: number = 0; // seconds

  constructor() {
    makeAutoObservable(this);
  }

  setTargetTime(time: string) {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    const now = new Date();
    this.targetTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes,
      seconds
    );
    this.startTimer();
  }

  startTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      if (this.targetTime) {
        const now = new Date();
        const difference = this.targetTime.getTime() - now.getTime();

        if (difference <= 0) {
          clearInterval(this.intervalId as NodeJS.Timeout);
          this.remainingTime = "00:00:00";
          Alert.alert("You are late");
          this.lateDuration = Math.abs(difference / 1000);
        } else {
          this.remainingTime = this.formatTime(difference);
        }
      }
    }, 1000);
  }

  formatTime(difference: number) {
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`
  }

  pad(num: number) {
    return num.toString().padStart(2, "0");
  }

  onDelivered() {
    if (this.lateDuration > 0) {
      const hours = Math.floor(this.lateDuration / 3600);
      const minutes = Math.floor((this.lateDuration % 3600) / 60);
      const seconds = Math.floor(this.lateDuration % 60);

      Alert.alert(
        "You are late",
        `You are ${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)} late`
      );
    }
  }
}

const timerStore = new TimerStore();
export default timerStore;