import styles from "./styles.module.css";

export default function MainContainer({ header, footer, children }) {
	return (
		<div className={styles["page-container"]}>
			{header}

			<main className={`${styles["main-container"]} container`}>{children}</main>

			{footer}
		</div>
	);
}
