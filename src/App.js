import 'normalize.css'
import styles from './Styles/App.module.sass';



function App(props) {
  return (
    <div className={styles.app}>
      Hello, {props.name}!
    </div>
  );
}

export default App;
