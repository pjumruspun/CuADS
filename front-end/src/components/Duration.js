import React from "react";

export default function Duration({ className, seconds }) {
  return (
    <time dateTime={`P${Math.round(seconds)}S`} className={className}>
      {format(seconds)}
    </time>
  );
}

function format(seconds) {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());
  const mi = padMs(date.getUTCMilliseconds());
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}:${mi}`;
  }
  return `${mm}:${ss}:${mi}`;
}

function pad(string) {
  return ("0" + string).slice(-2);
}

function padMs(string) {
  return ("00" + string).slice(-3).slice(0, -1);
}
