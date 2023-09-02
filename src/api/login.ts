import { useAjax } from "@/hooks/useAjax";

export const LOGIN_URL = "/auth/oauth2/token";

export const useLogin = () => {
  const client = useAjax();
  return (data: object) =>
    client(LOGIN_URL, {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    });
};
