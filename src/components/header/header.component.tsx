import type { FC } from "react";
import styles from "./header.module.scss";
import Link from "next/link";
import Image from "next/future/image";

const LOGO_SIZE = 35;

type Props = { title: string };

const Header: FC<Props> = ({ title }) => {
  return (
    <header className={styles.header}>
      <Link href={"/"}>
        <div className={styles.logo}>
          <h1 className={styles.link}>{title}</h1>
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
};

export { Header };
