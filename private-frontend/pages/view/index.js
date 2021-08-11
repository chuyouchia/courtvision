import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from '../../styles/Home.module.css'

const ImageDetail = (props) => {
  //get the full video from the backend
  const router = useRouter();
  const imageId = router.query["i"];
  //TODO props should pass imagePath
  return (
  <main className={styles.main}>
    <h1>Actual Image {imageId} here</h1>
    <div className={styles.grid}>
    <img 
      src={`http://localhost:20000/-/media/${imageId}.png`}
      alt="new"
      width="1100" height="600"
      />
      </div>
    </main>);
};
export default ImageDetail;
