import React from 'react';
import styles from '../Style/Components.css';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div className={styles.navigation_container}>
        <a href='/first_search'>
          <span className={styles.navigation_left}>
            <span className={styles.navigation_marked_text}>Search</span>
          </span>
          <span className={styles.arrow_right_blue}/>
        </a>
        <a href='/shortlist'>
          <span className={styles.navigation_middle}>
            <span className={styles.navigation_middle_text}>Requirements & Accommodation</span>
          </span>
        </a>
        <span className={styles.arrow_right}/>
        <span className={styles.navigation_right}>
          <span className={styles.navigation_last_text}>Summary & Submit</span>
        </span>
      </ div>
    );
  }


}

export default Navigation;
