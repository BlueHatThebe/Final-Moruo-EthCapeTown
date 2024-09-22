import POSApp from '@/app/components/POSApp';

import styles from '../app/components/transactions.module.css';

const Home = () => {
    return (
        <div>
          <div className={styles.container}>
           
           <div className={styles.posApp}>
               <POSApp />
           </div>
           
       </div>
        </div>
    );
};

export default Home;
