import type { FC } from "react";
import styles from "./header.module.scss";
import Link from "next/link";
import Image from "next/image";

const LOGO_SIZE = 35;

type Props = { title: string };

const Header: FC<Props> = ({ title }) => (
  <header className={styles.header}>
    <Link className={styles.link} href={"/"}>
      <div className={styles.logo}>
        <h1 className={styles.title}>{title}</h1>
        <Image
          alt={title}
          src={"/android-chrome-192x192.png"}
          height={LOGO_SIZE}
          width={LOGO_SIZE}
          quality={15}
          className={styles.image}
        />
      </div>
    </Link>
  </header>
);

export { Header };
