export const users = new Map<number, string>();

export const loadUser = (source: number) => {
  users.set(source, `user-${source}`);
};
