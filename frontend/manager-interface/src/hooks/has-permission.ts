import { useMainStore } from "@/stores";

export const hasPermission = (
  permission: string | string[] | undefined
): boolean => {
  if (!permission) return true;
  const mainStore = useMainStore();
  if (mainStore.account?.authorities?.some(({ name }) => name === permission))
    return true;
  if (
    mainStore.account?.authorityGroups?.some((group) =>
      typeof permission === "string"
        ? group.authorities.some(({ name }) => name === permission)
        : group.authorities.some(({ name }) => permission.includes(name))
    )
  )
    return true;
  return false;
};
