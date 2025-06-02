import styles from "./Header.module.css";

const Header = () => {
  return (
    <div>
      <h2 className={styles["header-heading"]}>
        Geometrical 2D shape calculator
      </h2>
    </div>
  );
};

export default Header;
