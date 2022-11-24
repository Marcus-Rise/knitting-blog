import styles from "./icon.module.scss";
import classNames from "classnames";

const IconSvg: Icon = ({ className, ...props }) => (
  <svg
    {...props}
    x="0px"
    y="0px"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    className={classNames(styles.icon, className)}
  />
);

export { IconSvg };
