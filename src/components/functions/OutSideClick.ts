import React from "react";

export const OutSideClick = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  fn: () => void
) => {
  if (e.target === e.currentTarget) {
    fn();
  } else {
  }
};
