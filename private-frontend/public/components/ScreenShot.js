import { useState } from "react";
import { Input, Button, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

import axios from 'axios';

const THEMES = [
  "Drive and Kick",
  "Fast break",
  "Zone Break",
  "Box and 1",
  "Offball",
  "Press Break",
  "Iso",
];

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ScreenShot = (props) => {
  const classes = useStyles();
  const [theme, setTheme] = useState("");

  const [imageName, setImageName] = useState("");
  //obtain screen shot from link

  //save screenshot to backend
  const saveSnapshot = async () => {
    const canvas = props.canvasRef.current;
    const image = canvas.toDataURL();

    // this turns the base 64 string to a [File] object
    const res = await fetch(image);
    const buff = await res.arrayBuffer();
    // clone so we can rename, and put into array for easy proccessing
    const files = [
      new File([buff], `${imageName}_${theme}_${new Date()}.jpeg`, {
        type: "image/jpeg",
      }),
    ];

    //save the file back to the database
    var formData = new FormData();
    formData.append("snapshot", files[0]);
    formData.append("name", imageName);
    formData.append("theme", theme);
    // for(var pair of formData.entries()) {
    //   console.log(pair[0]+ ', '+ pair[1]);
    // }
   
    const resp = await axios.post('http://localhost:20000/-/snapshot/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })    
    
    return files;
  };
  return (
    <>
      <div style={{ marginTop: "10px" }}>
        <text style={{ marginRight: "10px" }}>Enter Name:</text>
        <Input style={{ width: "45%" }} onChange={(event) => setImageName(event.target.value)} value={imageName}/>
        <Button
          variant="contained"
          style={{ margin: "10px" }}
          onClick={saveSnapshot}
        >
          Save SS
        </Button>
      </div>
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Situation Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={theme}
          onChange={(event) => setTheme(event.target.value)}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None of the Above</em>
          </MenuItem>
          {THEMES.map((item) => {
            return <MenuItem value={item} key={item}>{item}</MenuItem>;
          })}
        </Select>
        <FormHelperText>themeegorize the situation</FormHelperText>
      </FormControl>
      <canvas ref={props.canvasRef} id="screenshot" width="800" height="480" />
    </>
  );
};

export default ScreenShot;
