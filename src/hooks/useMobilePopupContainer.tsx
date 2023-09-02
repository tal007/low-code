export const useMobilePopupContainer = () => {
  const { MODE } = import.meta.env;
  const reg = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (MODE === "dev" && !reg) {
    const popupId = "popup-container";
    const dom = document.querySelector(popupId) as HTMLElement;
    return dom;
  }

  return document.body as HTMLElement;
};
