import React, { useCallback, useMemo, useState } from "react";
import styles from "./nav.module.scss";
import type { INavLink } from "./nav-link.interface";
import Link from "next/link";
import { Overlay } from "../overlay";
import { MobileMenuButton } from "../mobile-menu-button";

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
        <li key={i.title} className={styles.li}>
          <Link href={i.link}>{i.title}</Link>
        </li>
      )),
    [props.items],
  );

  return (
    <nav className={styles.root}>
      <div className={styles.mobileToggle}>
        <MobileMenuButton onClick={openMenu} />
      </div>
      {showMobileMenu && <Overlay onClose={closeMenu} />}
      <div className={[styles.itemsContainer, showMobileMenu ? "d-flex" : ""].join(" ")}>
        <div className="container">
          <ul className={styles.ul}>{items}</ul>
        </div>
      </div>
    </nav>
  );
};

export { Nav };
