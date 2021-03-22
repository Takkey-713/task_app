import React, { useState } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { SearchForm } from "../search/SearchForm";
import { HiOutlineMenu } from "react-icons/hi";
import { HeaderMenu } from "./menu/HeaderMenu";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

interface Props {
  handleOnLogout: () => void;
}
export const Header: React.FC<Props> = (props) => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const mq = useMediaQuery();
  const handleOnClickMenu = () => {
    setIsShown(!isShown);
  };

  return (
    <>
      <div className={styles.header}>
        {mq.isPc && (
          <>
            <div className={styles.header_search_area}>
              <SearchForm />
            </div>

            <div className={styles.header_title_list}>
              <Link to="/" className={styles.header_title}>
                Task App
              </Link>
            </div>

            <div className={styles.header_list}>
              <AccountCircleIcon
                style={{
                  fontSize: "30px",
                  cursor: "pointer",
                  margin: "5px 10px 0px 0px",
                }}
                onClick={() => props.handleOnLogout()}
              />
            </div>
          </>
        )}

        {mq.isMobile && (
          <>
            <div className={styles.header_search_area}>
              <SearchForm />
            </div>
            <div className={styles.header_title_list}>
              <Link to="/" className={styles.header_title}>
                Task App
              </Link>
            </div>
            <div className={styles.header_list}>
              <HiOutlineMenu
                onClick={() => setIsShown(!isShown)}
                style={{
                  fontSize: "30px",
                  margin: "5px 10px 0px 0px",
                  cursor: "pointer",
                }}
              />
            </div>
          </>
        )}
      </div>
      <HeaderMenu
        isShown={isShown}
        handleOnClickMenu={handleOnClickMenu}
        handleOnLogout={props.handleOnLogout}
      />
    </>
  );
};
