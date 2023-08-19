import { ElMessage } from "element-plus";

const useAvatarUpload = (rawFile: File) => {
  const imgTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  if (!imgTypes.includes(rawFile.type)) {
    ElMessage.error("对不起，暂不支持上传该类型文件");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error("对不起，上传文件大小不能超过5MB");
    return false;
  }
  return true;
};
export default useAvatarUpload;
