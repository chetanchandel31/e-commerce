import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const EyeIcon = ({ isVisible }: { isVisible: boolean }) =>
  isVisible ? (
    <AiFillEye type="button" style={{ color: "rgba(0, 0, 0, 0.5)" }} />
  ) : (
    <AiFillEyeInvisible type="button" style={{ color: "rgba(0, 0, 0, 0.5)" }} />
  );

export default EyeIcon;
