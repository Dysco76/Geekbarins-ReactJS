import 'normalize.css'
import styles from './Styles/App.module.sass';
import {Message} from './Message.js'



export function App() {
  return (
    <div className={styles.app}>
      <Message text="Hello World" />
    </div>
  );
}
