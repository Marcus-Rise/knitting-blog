import type { FC } from "react";
import styles from "./header.module.scss";
import Link from "next/link";
import Image from "next/image";
import { KnitsLeftIcon, KnitsRightIcon } from "../icons";
import classNames from "classnames";
import logo from "../../app/icon.png";
import { Theme } from "../theme";

const LOGO_SIZE = 35;

type Props = { title: string };

const Header: FC<Props> = ({ title }) => (
  <header className={styles.header}>
    <KnitsLeftIcon
      className={classNames(styles.knits, styles.knitsLeft)}
      width={"10rem"}
      height={"6rem"}
    />
    <KnitsRightIcon
      className={classNames(styles.knits, styles.knitsRight)}
      width={"9rem"}
      height={"10rem"}
    />
    <Link className={styles.link} href={"/"}>
      <div className={styles.logo}>
        <h1 className={styles.title}>{title}</h1>
        <Image
          alt={title}
          src={logo}
          height={LOGO_SIZE}
          width={LOGO_SIZE}
          quality={15}
          className={styles.image}
        />
      </div>
    </Link>
    <Theme className={styles.theme} />
  </header>
);

export { Header };
