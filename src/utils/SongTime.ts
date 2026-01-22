export const newSongTime = (
  timeStr: string,
  durationInput: HTMLInputElement,
): number | null => {
  //Minute, second - splits them between the : giving us two different values, minStr, secStr
  const [min, sec] = strToNum(timeStr);
  // If any of the numbers arent numbers and after we alert, return
  if (isNaN(min) || isNaN(sec)) {
    return null;
  }
  // Removes error class once we click submit and everything goes through
  durationInput.classList.remove("error");
  // Converts our minute, seconds to only seconds
  const totalSeconds = min * 60 + sec;
  return totalSeconds;
};

// Converts string to numbers with a : in between the two, then return the numbers which the newSongTime() function picks up
const strToNum = (timeStr: string): [number, number] => {
  const [minStr, secStr] = timeStr.split(":");

  // Makes variables be numbers of our newly split strings
  const min = Number(minStr);
  const sec = Number(secStr);

  return [min, sec];
};
