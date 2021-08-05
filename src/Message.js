import styles from './Styles/Message.module.sass'

export function Message(props) {
  return(
    <div className={styles.message}>
      <p>{props.text}</p>
    </div>
  )
}