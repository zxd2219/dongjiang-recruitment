const useDate = (timestamp: any): `${number}-${number}-${number}` => {
  const chinaStandard = timestamp;
  const date = new Date(chinaStandard);
  const Y = date.getFullYear();
  const M =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const DateTime = `${Y}-${M}-${D}`;
  return DateTime as `${number}-${number}-${number}`;
};
export default useDate;
