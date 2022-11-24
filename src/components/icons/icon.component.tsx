import styles from "./icon.module.scss";

const IconSvg: Icon = (props) => (
  <svg
    {...props}
    x="0px"
    y="0px"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.icon}
  />
);

export { IconSvg };
