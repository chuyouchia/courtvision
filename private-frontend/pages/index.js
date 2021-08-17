import React,{ useEffect } from "react";
import MenuBar from "../public/components/MenuBar";
import { makeStyles } from '@material-ui/core/styles';
import SimpleCard from "../public/components/Card";

const navItems = [{url:'/create', name: 'hehe'}, {url:'/view', name: 'view'}, {url:'/', name: 'home'}]

const List = () => {
  //get the video thumbnails from the backend
  return (
    <>
     <MenuBar navItems={navItems}>
     </MenuBar>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: '30px',
        }}
      >
        Start by selecting one of the snapshots!
      </h1>
      <div style = {{display: 'flex', justifyContent: 'space-around', backgroundColor:'blue', padding:'30px'}}>
        <SimpleCard href="/view?i=1" title="Image 1" body="body of card"/>
        <SimpleCard href="/view?i=2" title="Image 2" body="body of card"/>
        <SimpleCard href="/view?i=3" title="Image 3" body="body of card"/>
      </div>
      <div style = {{display: 'flex', justifyContent: 'space-around', padding:'30px'}}>
      <div style = {{display: 'flex',flexDirection: 'column', justifyContent: 'center'}}> 
        <div style={{width:'1000px'}}>
          Explanation For Video Clipping
          <div style = {{display: 'flex', justifyContent: 'space-around', padding:'40px'}}>
            <div id="pre-image-background" style = {{ width: '450px', height: '275px'}}/>
            <div>
              Arrow
            </div>
            <div id="post-image-background" style = {{ width: '450px', height: '275px'}}/>
          </div>
        </div>
        <div style = {{display: 'flex',flexDirection: 'column', justifyContent: 'center'}}> 
        <div style={{width:'1000px'}}>
          Explanation For SnapShot review
          <div style = {{display: 'flex', justifyContent: 'space-around', padding:'40px'}}>
            <div id="pre-image-background" style = {{ width: '450px', height: '275px'}}/>
            <div>
              item 2
            </div>
            <div id="post-image-background" style = {{ width: '450px', height: '275px'}}/>
          </div>
        </div>
        </div>
        <div style={{width:'1000px'}}>
          Explanation For community interaction
          <div style = {{display: 'flex', justifyContent: 'space-around', padding:'40px'}}>
            <div id="pre-image-background" style = {{ width: '450px', height: '275px'}}/>
            <div>
              item 2
            </div>
            <div id="post-image-background" style = {{ width: '450px', height: '275px'}}/>
          </div>
        </div>
        </div>
      </div>
      </>
  );
};
export default List;
