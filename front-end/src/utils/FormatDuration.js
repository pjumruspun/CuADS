import * as constant from "../Constants";

function formatSeconds(seconds) {
  // Formats float number into HH:MM:SS:MI or MM:SS:MI
  // Have options to turn on or off milliseconds
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());
  const mi = padMs(date.getUTCMilliseconds());
  if (hh) {
    return (
      `${hh}:${pad(mm)}:${ss}` + (constant.showMilliseconds ? `:${mi}` : ``)
    );
  }
  return `${mm}:${ss}` + (constant.showMilliseconds ? `:${mi}` : ``);
}

function formatSecondsCustom(seconds, showMilliseconds) {
  // For showing milliseconds on demand with parameter showMilliseconds (boolean)
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
