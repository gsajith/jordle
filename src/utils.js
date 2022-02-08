import * as React from "react";

export const isLetter = (str) => {
  return str.length === 1 && str.match(/[a-z]/i);
};

// Seeded pseudo-RNG adapted from
// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
export const getSeededRand = (str) => {
  for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0)/4294967295;
  };
};


// Shuffle array with a given RNG function, adapted from
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export const shuffle = (array, rand) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(rand() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export const useStickyState = (defaultValue, key) => {
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

// Adapted from
// https://stackoverflow.com/questions/19700283/how-to-convert-time-in-milliseconds-to-hours-min-sec-format-in-javascript
// and https://helperbyte.com/questions/429672/how-to-get-number-of-milliseconds-until-tomorrow
export const timeTilTomorrow = () => {
  const d = new Date();
  const currentTimestamp = d.getTime();
  d.setDate(d.getDate() + 1);
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  const timeDiffMillis =  d.getTime() - currentTimestamp;
  
   var milliseconds = Math.floor((timeDiffMillis % 1000) / 100),
    seconds = Math.floor((timeDiffMillis / 1000) % 60),
    minutes = Math.floor((timeDiffMillis / (1000 * 60)) % 60),
    hours = Math.floor((timeDiffMillis / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}