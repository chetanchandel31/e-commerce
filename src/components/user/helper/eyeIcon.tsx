import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export const eyeIcon = (isVisible: boolean) =>
  isVisible ? (
    <AiFillEye type="button" style={{ color: "rgba(0, 0, 0, 0.5)" }} />
  ) : (
    <AiFillEyeInvisible type="button" style={{ color: "rgba(0, 0, 0, 0.5)" }} />
  );
