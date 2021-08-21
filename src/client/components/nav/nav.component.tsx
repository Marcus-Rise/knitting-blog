import type { FC } from "react";
import React, { useCallback, useMemo, useState } from "react";
import type { INavLink } from "./nav-link.interface";
import { Overlay } from "../overlay";
import { MobileMenuButton } from "../mobile-menu-button";
import { MobileMenuCloseButton } from "../mobile-menu-close-button";
import { NavItem } from "./nav-item";
import { CloseButtonContainer, ItemsContainer, Li, MobileToggle, Root, Ul } from "./nav.styles";
import { Container } from "../container";

interface IProps {
  items: ReadonlyArray<INavLink>;
}

const Nav: FC<IProps> = (props) => {
  const [showMobileMenu, setShowMenu] = useState<boolean>(false);
  const openMenu = useCallback((): void => setShowMenu(true), []);
  const closeMenu = useCallback((): void => setShowMenu(false), []);

  const items = useMemo(
    () =>
      props.items.map((i) => (
        <Li key={i.title} onClick={closeMenu}>
          <NavItem {...i} />
        </Li>
      )),
    [closeMenu, props.items],
  );

  return (
    <Root>
      <MobileToggle>
        <MobileMenuButton onClick={openMenu} />
      </MobileToggle>
      {showMobileMenu && <Overlay onClose={closeMenu} />}
      <ItemsContainer as={Container} showMobileMenu={showMobileMenu}>
        {showMobileMenu && (
          <CloseButtonContainer>
            <MobileMenuCloseButton onClick={closeMenu} />{" "}
          </CloseButtonContainer>
        )}
        <div>
          <Ul>{items}</Ul>
        </div>
      </ItemsContainer>
    </Root>
  );
};

export { Nav };
