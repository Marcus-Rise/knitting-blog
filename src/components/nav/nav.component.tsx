import React, { useCallback, useMemo, useState } from "react";
import styles from "./nav.module.scss";
import type { INavLink } from "./nav-link.interface";
import { Overlay } from "../overlay";
import { MobileMenuButton } from "../mobile-menu-button";
import { MobileMenuCloseButton } from "../mobile-menu-close-button";
import classnames from "classnames";
import { NavItem } from "./nav-item";

interface IProps {
  items: Array<INavLink>;
}

const Nav: React.FC<IProps> = (props) => {
  const [showMobileMenu, setShowMenu] = useState<boolean>(false);
  const openMenu = useCallback((): void => setShowMenu(true), []);
  const closeMenu = useCallback((): void => setShowMenu(false), []);

  const items = useMemo(
    () =>
      props.items.map((i) => (
        <li className={styles.li} key={i.title} onClick={closeMenu}>
          <NavItem {...i} />
        </li>
      )),
    [closeMenu, props.items],
  );

  return (
    <nav className={styles.root}>
      <div className={styles.mobileToggle}>
        <MobileMenuButton onClick={openMenu} />
      </div>
      {showMobileMenu && <Overlay onClose={closeMenu} />}
      <div className={classnames(styles.itemsContainer, { [styles.itemsContainerShow]: showMobileMenu })}>
        {showMobileMenu && (
          <div className={styles.closeButtonContainer}>
            <MobileMenuCloseButton onClick={closeMenu} />{" "}
          </div>
        )}
        <div className="container">
          <ul className={styles.ul}>{items}</ul>
        </div>
      </div>
    </nav>
  );
};

export { Nav };
