/*
 * @Date: 2022-10-19 11:47:22
 * @LastEditTime: 2023-05-09 09:50:08
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 本地存储
 */

const storage = {
  setCookie<T>(name: string, value: T, days: number) {
    const Days = days || 7;
    const exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie =
      name +
      "=" +
      (window as any).escape(value) +
      ";path=/;expires=" +
      exp.toLocaleString();
  },
  getCookie(name: string) {
    const arrStr = document.cookie.split(";");
    for (let i = 0; i < arrStr.length; i++) {
      const temp = arrStr[i].split("=");
      if (temp[0].trim() === name) return (window as any).unescape(temp[1]);
    }
  },
  delCookie(name: string) {
    document.cookie = name + "=;expires=" + new Date(0).toLocaleString();
  },
  getSession(name: string) {
    if (!name) return;
    return window.sessionStorage.getItem(name);
  },
  setSession(name: string, content: string | object) {
    if (!name) return;
    if (typeof content !== "string") {
      content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content);
  },
  removeSession(name: string) {
    if (!name) return;
    window.sessionStorage.removeItem(name);
  },
  getLocal(name: string) {
    if (!name) return;
    return window.localStorage.getItem(name);
  },
  setLocal(name: string, content: string | object) {
    if (!name) return;
    if (typeof content !== "string") {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  },
  removeLocal(name: string) {
    if (!name) return;
    window.localStorage.removeItem(name);
  },
  /**
   * Clear all localStorage adn sessionStorage
   */
  clearAll() {
    window.localStorage.clear();
    window.sessionStorage.clear();
  },
};

export default storage;
