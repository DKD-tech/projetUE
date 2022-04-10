import React from 'react';
import styles from "../styles/Categories.module.css";
import {ChevronRightRounded} from '@mui/icons-material';

const Categories = () => {
    return (
        <div className={styles.container}>
        <h1 className={styles.title}></h1>
        <p className={styles.desc}>
        </p>
        <div className={styles.sousMenuContainer}>
        <h3>Menu Categories</h3>
      </div>
      <div className={styles.menuSous}>
          <div className={styles.imgBox}>
              <img src="./img/burger-baner.png" alt="" />
          </div>
          <h3>Burger</h3>
          <i className={styles.load}>
              <ChevronRightRounded/>
          </i>
      </div>
      <div className={styles.menuSous}>
          <div className={styles.imgBox}>
              <img src="./img/pizz.png" alt="" />
          </div>
          <h3>Pizza</h3>
          <i className={styles.load}>
              <ChevronRightRounded/>
          </i>
      </div>
      <div className={styles.menuSous}>
          <div className={styles.imgBox}>
              <img src="./img/tacos.jpg" alt="" />
          </div>
          <h3>Tacos</h3>
          <i className={styles.load}>
              <ChevronRightRounded/>
          </i>
      </div>
        
      </div>
    );
}

export default Categories;
