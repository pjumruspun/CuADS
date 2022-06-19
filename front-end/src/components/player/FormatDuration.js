const showMilliseconds = false;

function formatSeconds(seconds) {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());
  const mi = padMs(date.getUTCMilliseconds());
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}` + (showMilliseconds ? `:${mi}` : ``);
  }
  return `${mm}:${ss}` + (showMilliseconds ? `:${mi}` : ``);
}

function pad(string) {
  return ("0" + string).slice(-2);
}

function padMs(string) {
  return ("00" + string).slice(-3).slice(0, -1);
}

export default formatSeconds;
