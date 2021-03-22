import React, { useState } from "react";
import { OutSideClick } from "../../../functions/OutSideClick";
import "./HeaderMenu.scss";

interface Props {
  handleOnClickMenu: () => void;
  isShown: boolean;
  handleOnLogout: () => void;
}
export const HeaderMenu: React.FC<Props> = (props) => {
  return (
    <div
      className={`menuWrapper ${props.isShown ? "menuWrapper__active" : ""}`}
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        OutSideClick(e, props.handleOnClickMenu)
      }
    >
      <div className="menu">
        <ul className="menuList">
          <li onClick={() => props.handleOnLogout()}>ログアウト</li>
        </ul>
      </div>
    </div>
  );
};
