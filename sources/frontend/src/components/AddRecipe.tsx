import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useNavigate, Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import axios from 'axios';
import { read } from 'fs';


const Input = styled('input')({
  display: 'none',
});

export const AddRecipe = () => {

  // const toDataURL = (url, callback) => {
  //   var xhr = new XMLHttpRequest();
  //   xhr.onload = function() {
  //     var reader = new FileReader();
  //     reader.onloadend = function() {
  //       callback(reader.result);
  //     }
  //     reader.readAsDataURL(xhr.response);
  //   };
  //   xhr.open('GET', url);
  //   xhr.responseType = 'blob';
  //   xhr.send();
  // }

  // toDataURL('blob:http://localhost:3000/3fafeaba-f348-42ae-b6aa-6790aeec3d57', function(dataUrl) {
  //   console.log('RESULT:', dataUrl)
  // })











  const navigate = useNavigate();

  const [stepField, setStepField] = useState([
    { id: uuidv4(), value: "" },
  ]);

  const removeStepField = (id: any) => {
    const values = [...stepField];
    values.splice(values.findIndex(value => value.id === id), 1);
    setStepField(values);
  }

  const [ingredientsField, setIngredientsField] = useState([
    { id: uuidv4(), value: "" },
  ]);

  const removeIngredientsField = (id: any) => {
    const values = [...ingredientsField];
    values.splice(values.findIndex(value => value.id === id), 1);
    setIngredientsField(values);
  }

  const [basicField, setBasicField] = useState([
    { id: uuidv4(), value: "" },
    { id: uuidv4(), value: "" },
    { id: uuidv4(), value: "" },
    { id: uuidv4(), value: "" },
  ]);

  const handleInputChange = (id: string, event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, field: { id: string; value: string; }[], setter: any) => {
    const newInputFields = field.map(i => {
      if (id === i.id) {
        i.value = event.target.value
      }
      return i;
    })

    setter(newInputFields);
  }

  const [tagField, setTagField] = useState([
    { id: uuidv4(), value: "" },
  ]);

  const handleSubmit = async (event) => {
    //e.preventDefault();
    console.log("Submitted");
    const body = {
      name: basicField[0].value,
      timeComplexity: +basicField[1].value,
      portions: +basicField[2].value,
<<<<<<< HEAD
      ingredients: ingredientsField.map(x => x.value).join("\n"),
      //ingredients: ingredientsField[0].value,
      description: basicField[3].value,
      steps: stepField.map(x => x.value).join("\n"),
      //steps: stepField[0].value,
=======
      ingredients: ingredientsField.map((x) => { x.value }).join('\n'),
      description: basicField[3].value,
      steps: stepField.map((x) => { x.value }).join('\n'),
>>>>>>> e9d8e601b81a3c509638feb2066e80a5efbf119b
      categoryId: categoryOptions[0].id,
      userId: "f8fb2811-b24a-495e-aa5a-840ba5cb1a34",
    };
    const url = "//localhost:3003/recipe";
    let res = await axios.post(url, body).then((x) => {
<<<<<<< HEAD
      console.log(x);

      if (x.status != 200) {
        return;
      }

      navigate('/recipe/' + x.data.data);
=======
      console.log(x)
>>>>>>> e9d8e601b81a3c509638feb2066e80a5efbf119b
    });

    // send it to the DB

    // await DB response

    // Show user "recipe added"

    // redirect

  };


  let errorCount: number = 0;

  const handleErrorChange = (cond: boolean) => {
    if (cond) errorCount++;

    return cond;
  }

  const [fileField, setFileField] = useState<{ id: string, file: ArrayBuffer, url: string }[]>([]);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (fileField.length == 0) {
      setFileField([]);
    }

    if (!event.target.files) {
      return;
    }

    console.log("Got ", event.target.files.length, " files");

    for (let i = 0; i < event.target.files.length; i++) {
      if (!event.target.files[i].type.includes('image')) {
        // give error to user

        console.log("This file is not an image!");

        return;
      }
    }

    let tmp: { id: string, file: ArrayBuffer, url: string }[] = [];

    for (let i = 0; i < event.target.files.length; i++) {
      let helper = true;

      let url = URL.createObjectURL(event.target.files[i]);

      const reader = new FileReader();

      reader.addEventListener("load", function () {
        // convert image file to base64 string
        console.log("DATA_URL", reader.result);

        tmp = [...tmp, { id: uuidv4(), file: reader.result! as ArrayBuffer, url: url }];

        helper = false;
      }, false);

      reader.readAsDataURL(event.target.files[i]);

      // This is horrible, but I don't know how else to do it
<<<<<<< HEAD
      while (helper) { await new Promise(resolve => setTimeout(resolve, 1000)); }
=======
      while(helper) {await new Promise(resolve => setTimeout(resolve, 1000));}
>>>>>>> e9d8e601b81a3c509638feb2066e80a5efbf119b
    }

    console.log("temp:", tmp);

    setFileField([...fileField, ...tmp]);
  }

  const [categoryOptions, setCategoryOptions] = useState<{ name: string, id: string }[]>([]);


  const elem = (
    <Grid container component="form" direction="column">
      <Typography color="text.primary" variant="h2" sx={{ mb: 2 }}>
        Add new recipe
      </Typography>
      <TextField
        error={handleErrorChange(basicField[0].value.length < 5)}
        id="name"
        label="Name"
        margin="dense"
        value={basicField[0].value}
        onChange={event => handleInputChange(basicField[0].id, event, basicField, setBasicField)}
      />
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <TextField
            error={handleErrorChange(basicField[1].value.length === 0)}
            id="time"
            label="Time in minutes"
            type="number"
            margin="dense"
            value={basicField[1].value}
            onChange={event => handleInputChange(basicField[1].id, event, basicField, setBasicField)}

            InputProps={{
              inputProps: { min: 1 }
            }}
          />
        </Grid>

        <Grid item>
          <TextField
            error={handleErrorChange(basicField[2].value.length === 0)}
            id="servings"
            label="Number of servings"
            type="number"
            margin="dense"
            value={basicField[2].value}
            onChange={event => handleInputChange(basicField[2].id, event, basicField, setBasicField)}

            InputProps={{
              inputProps: { min: 1 }
            }}
          />
        </Grid>
      </Grid>

      <Grid container direction="column">
        <Typography color="text.primary">
          Meal description:
        </Typography>
        <TextField
          error={handleErrorChange(basicField[3].value.length < 5)}
          id="description"
          label="Description"
          margin="dense"
          value={basicField[3].value}
          onChange={event => handleInputChange(basicField[3].id, event, basicField, setBasicField)}
        />
      </Grid>

      <Grid item sx={{ mt: 1 }}>
        <Grid container spacing={2}>


          <Grid item xs={4}>
            <Typography color="text.primary">
              Steps:
            </Typography>
            <Grid>
              <Grid>
                {stepField.map((inputField, index) => (
                  <Grid container alignItems="center">
                    <Typography color="text.primary">
                      Step {index + 1}: &nbsp;
                    </Typography>
                    <TextField
                      error={handleErrorChange(inputField.value.length < 1)}
                      id={inputField.id}
                      margin="dense"
                      label={index}
                      value={inputField.value}
                      onChange={event => handleInputChange(inputField.id, event, stepField, setStepField)}
                    />
                    <IconButton disabled={stepField.length === 1} onClick={() => removeStepField(inputField.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                ))}
              </Grid>
              <IconButton onClick={() => setStepField([...stepField, { id: uuidv4(), value: "" }])}><AddIcon /></IconButton>
            </Grid>
          </Grid>

          <Grid item xs={8}>
            <Typography color="text.primary">
              Ingrediences (don't forget to add the unit of measurement):
            </Typography>
            <Grid>
              <Grid>
                {ingredientsField.map((inputField, index) => (
                  <Grid container alignItems="center">
                    <Typography color="text.primary">
                      Ingredient {index + 1}: &nbsp;
                    </Typography>
                    <TextField
                      error={handleErrorChange(inputField.value.length < 1)}
                      id={inputField.id}
                      margin="dense"
                      label={index}
                      value={inputField.value}
                      onChange={event => handleInputChange(inputField.id, event, ingredientsField, setIngredientsField)}
                    />
                    <IconButton disabled={ingredientsField.length === 1} onClick={() => removeIngredientsField(inputField.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                ))}
              </Grid>
              <IconButton onClick={() => setIngredientsField([...ingredientsField, { id: uuidv4(), value: "" }])}><AddIcon /></IconButton>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container direction="row">
              {
                fileField.length > 0 &&

                <>
                  {fileField.map((inputField, index) => (
                    <Grid item>
                      <Typography color="text.primary">
                        Image {index + 1}
                      </Typography>
                      <Grid container alignItems="center">
                        <Card className={'a'}>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              alt="Contemplative Reptile"
                              height="255"
                              width="255"
                              image={inputField.url}
                              title="Contemplative Reptile"
                            />
                          </CardActionArea>
                        </Card>
                        <IconButton onClick={() => {
                          const values = [...fileField];
                          values.splice(index, 1);
                          setFileField(values);
                        }}>
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                </>
              }
            </Grid>

            <Typography color="text.primary" sx={{ mt: 2 }}>
              Upload your recipe photos:
            </Typography>
            <Grid item>
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={event => handleChange(event)}
                />
                <Button variant="contained" component="span" onClick={(event: any) => handleChange(event)}>
                  Upload photo
                </Button>
              </label>
            </Grid>
          </Grid>


        </Grid>
      </Grid>

      <Grid item sx={{ mt: 3 }} xs={8}>
        <Typography color="text.primary">
          Tags:
        </Typography>
        <Grid>
          <Grid>
            {tagField.map((inputField, index) => (
              <Grid container alignItems="center">
                <Typography color="text.primary">
                  Tag {index + 1}: &nbsp;
                </Typography>
                <TextField
                  error={handleErrorChange(inputField.value.length < 1)}
                  id={inputField.id}
                  margin="dense"
                  label={index}
                  value={inputField.value}
                  onChange={event => handleInputChange(inputField.id, event, tagField, setTagField)}

                  select
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Please select your category"

                  onClick={async () => {
                    if (categoryOptions.length === 0) {
                      let res = await axios.get("//localhost:3003/category");

                      if (res.statusText != "OK") {
                        console.log("Error here:", res);
                        return;
                      }

                      setCategoryOptions(res.data.data);
                    }
                  }}
                >
                  {categoryOptions.map((option) => (
                    <option key={option.id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </TextField>
                <IconButton disabled={tagField.length === 1} onClick={() => {
                  const values = [...tagField];
                  values.splice(index, 1);
                  setTagField(values);
                }}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            ))}
          </Grid>
          <IconButton onClick={() => setTagField([...tagField, { id: uuidv4(), value: "" }])}><AddIcon /></IconButton>
        </Grid>
      </Grid>

      <Grid item sx={{ mt: 2 }}>
        <Button variant="contained" disabled={errorCount > 0 || fileField.length == 0}
          onClick={event => handleSubmit(event)}>
          Save
        </Button>
      </Grid>
    </Grid>
  );

  console.log("ingredients:", ingredientsField);
  console.log("steps:", stepField);
  console.log("basic:", basicField);
  console.log(errorCount);
  console.log("FILE FIELD:", fileField);
  console.log(tagField);

  return elem;
}
