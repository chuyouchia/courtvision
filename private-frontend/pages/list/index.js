import { useEffect } from "react";
import Link from "next/link";

const List = () => {
  //get the video thumbnails from the backend

  return (
    <>
      <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>this is a new list of snapshots</h1>
      <ol style={{listStylePosition: 'inside', textAlign:"center"}}>
        <li>
          <Link href="/view?i=1">vid 1</Link>
        </li>
        <li>
          <Link href="/view?i=2">vid 2</Link>
        </li>
        <li>
          <Link href="/view?i=3">vid 3</Link>
        </li>
      </ol>
    </>
  );
};
export default List;
