import sleep from "utils/sleep";

export const login = async (email: string, password: string) => {
  await sleep(1000);
  return {
    token: "some-random-token",
    user: {
      email,
    },
  };
};
