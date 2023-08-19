const useTime = (timestamp: any) => {
  const chinaStandard = timestamp;
  const date = new Date(chinaStandard);
  const h = date.getHours();
  let minute: string | number = date.getMinutes();
  minute = minute < 10 ? "0" + minute : minute;
  let second: string | number = date.getSeconds();
  second = second < 10 ? "0" + second : second;
  const Time = h + ":" + minute + ":" + second;

  return Time;
};

export default useTime;
