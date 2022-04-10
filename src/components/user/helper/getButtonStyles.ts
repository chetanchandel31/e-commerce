import { Theme } from "haki-ui";

export const getButtonStyles = (isSelected: boolean, theme: Theme) => ({
  color: isSelected ? theme.colors.primary.main : theme.colors.disabled.dark,
});
