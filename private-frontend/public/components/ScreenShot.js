import { useState } from "react";
import { Input, Button, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

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
  const [cat, setCat] = useState("");

  const [imageName, setImageName] = useState("");
  //obtain screen shot from link

  //save screenshot to backend
  const saveImage = async () => {
    const canvas = props.canvasRef.current;
    const image = canvas.toDataURL();

    // this turns the base 64 string to a [File] object
    const res = await fetch(image);
    const buff = await res.arrayBuffer();
    // clone so we can rename, and put into array for easy proccessing
    const file = [
      new File([buff], `photo_${new Date()}.jpg`, {
        type: "image/jpeg",
      }),
    ];

    //save the file back to the database
    console.log(file);
    return file;
  };
  return (
    <>
      <div style={{ marginTop: "10px" }}>
        <text style={{ marginRight: "10px" }}>Enter Name:</text>
        <Input style={{ width: "45%" }} onChange={setImageName} />
        <Button
          variant="contained"
          style={{ margin: "10px" }}
          onClick={saveImage}
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
          value={cat}
          onChange={(event) => setCat(event.target.value)}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None of the Above</em>
          </MenuItem>
          {THEMES.map((item) => {
            return <MenuItem value={item}>{item}</MenuItem>;
          })}
        </Select>
        <FormHelperText>Categorize the situation</FormHelperText>
      </FormControl>
      <canvas ref={props.canvasRef} id="screenshot" width="800" height="480" />
    </>
  );
};

export default ScreenShot;
