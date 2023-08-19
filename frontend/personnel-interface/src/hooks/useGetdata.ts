const useGetDayAll = (starDay: string, endDay: string) => {
  const arr = [];

  const dates = [];
  // 设置两个日期UTC时间
  const db = new Date(starDay);
  const de = new Date(endDay);
  // 获取两个日期GTM时间
  const s = db.getTime() - 24 * 60 * 60 * 1000;
  const d = de.getTime() - 24 * 60 * 60 * 1000;
  // 获取到两个日期之间的每一天的毫秒数
  for (let i = s; i <= d; ) {
    i = i + 24 * 60 * 60 * 1000;
    arr.push(Math.trunc(i));
  }
  // 获取每一天的时间  YY-MM-DD
  for (const j in arr) {
    const time = new Date(arr[j]);
    const year = time.getFullYear();
    const mouth =
      time.getMonth() + 1 >= 10
        ? time.getMonth() + 1
        : "0" + (time.getMonth() + 1);
    const day = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
    const YYMMDD = year + "-" + mouth + "-" + day;
    dates.push(YYMMDD);
  }
  return dates;
};
export default useGetDayAll;
