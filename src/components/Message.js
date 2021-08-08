import styles from "./Message.module.sass";

export function Message({ message: { value, author } }) {
  return (
    <div className={styles.message}>
      <p>
        <span className={styles.author}>{author}</span>: {value}
      </p>
    </div>
  );
}
