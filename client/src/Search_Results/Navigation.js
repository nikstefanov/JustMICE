import React from 'react';
import styles from '../Style/Style.css';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div className={styles.navigation_container}>
        <span className={styles.navigation_marked}>
          <span className={styles.navigation_marked_text}>Search</span>
        </span>
        <span className={styles.arrow_right_blue}/>
        <span className={styles.navigation_middle}>
          <span className={styles.navigation_middle_text}>Requirements & Accommodation</span>
        </span>
        <span className={styles.arrow_right}/>
        <span className={styles.navigation_last_text}>Summary & Submit</span>
        <span className={styles.arrow_right}/>
      </div>
    );
  }


}

export default Navigation;
