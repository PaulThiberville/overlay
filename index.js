const params = new URL(document.location).searchParams;
const video = params.get("video");
const text = params.get("text");
const timer = params.get("timer");

const iframe = document.getElementById("iframe");
const src = `https://www.youtube.com/embed/${video}?autoplay=1&mute=1&playlist=${video}&loop=1&controls=0`;
iframe.src = src;

const getTime = () => {
  const now = new Date();
  const hour = document.getElementById("time");
  hour.innerText =
    now.getHours() +
    ":" +
    (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes());
};

const getTimer = () => {
  if (!timer) return null;
  const now = new Date().getTime();
  const countDownDate = new Date();
  const [hours, minutes] = timer.split(":");
  countDownDate.setHours(hours);
  countDownDate.setMinutes(minutes);
  countDownDate.setSeconds(0);
  const timeleft = countDownDate.getTime() - now;
  const remaining = {
    hours: Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeleft % (1000 * 60)) / 1000),
  };
  const hoursToString = remaining.hours
    ? remaining.hours > 10
      ? remaining.hours + ":"
      : "0" + remaining.hours + ":"
    : "";

  const minutesToString = remaining.minutes
    ? remaining.minutes > 10
      ? remaining.minutes + ":"
      : "0" + remaining.minutes + ":"
    : "00:";

  const secondsToString = remaining.seconds
    ? remaining.seconds > 10
      ? remaining.seconds
      : "0" + remaining.seconds
    : "00";

  return timeleft > 0
    ? hoursToString + minutesToString + secondsToString
    : null;
};

const getTextToDisplay = () => {
  if (!text && !timer) return;
  const textWrapper = document.getElementById("text-wrapper");
  const textElement = document.getElementById("text");
  const textToDisplay = getTimer() || text;
  textWrapper.className = textToDisplay ? "" : "hidden";
  textElement.innerText = textToDisplay || "";
};

setInterval(() => {
  getTime();
  getTextToDisplay();
}, 1000);
