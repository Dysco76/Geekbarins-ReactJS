import styles from "./Message.module.sass";

export function Message({ message: { text, author } }) {
  return (
    <div className={styles.message}>
      <p>
        <span className={styles.author}>{author}</span>: {text}
      </p>
    </div>
  );
}
