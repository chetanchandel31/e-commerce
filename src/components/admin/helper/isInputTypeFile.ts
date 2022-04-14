// type narrowing 🙀
export const isInputTypeFile = (
  target: EventTarget & (HTMLInputElement | HTMLSelectElement)
): target is EventTarget & HTMLInputElement => target.name === "photo";
