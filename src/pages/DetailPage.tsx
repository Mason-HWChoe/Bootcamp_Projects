import Footer from '../components/Footer';
import { useSelectedDataContext } from '../store/SelectedItemsContext';
import styles from './DetailPage.module.css';

export default function DetailPage() {
  const { selectedData } = useSelectedDataContext();
  console.log(selectedData);

  return (
    <>
      <div className={styles.banner}></div>

      <Footer />
    </>
  );
}
