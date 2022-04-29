import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const eyeIconColor = "rgba(0, 0, 0, 0.5)";

const EyeIcon = ({ isVisible }: { isVisible: boolean }) =>
  isVisible ? (
    <AiFillEye type="button" style={{ color: eyeIconColor }} />
  ) : (
    <AiFillEyeInvisible type="button" style={{ color: eyeIconColor }} />
  );

export default EyeIcon;
