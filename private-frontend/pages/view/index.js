import { useEffect } from "react";
import { useRouter } from "next/router";

const ImageDetail = () => {
  //get the full video from the backend
  const router = useRouter();
  const imageId = router.query["i"];
  return <h1>Actual Image {imageId} here</h1>;
};
export default ImageDetail;
