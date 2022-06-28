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

import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import axios from 'axios';
import path from './path.json';

import { BasicInput } from './add_recipe/BasicInput';
import { Steps } from './add_recipe/Steps';
import { Ingredients } from './add_recipe/Ingredients';
import { Categories } from './add_recipe/Categories';
import { Images } from './add_recipe/Images';



export const handleErrorChange = (cond: boolean, setErrorNumber: any, error: number) => {
  if (cond) setErrorNumber(error + 1);

  return cond;
}

export const handleInputChange = (id: string, event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, field: { id: string; value: string; }[], setter: any) => {
  const newInputFields = field.map(i => {
    if (id === i.id) {
      i.value = event.target.value
    }
    return i;
  })

  setter(newInputFields);
}


export const AddRecipe = () => {
  const navigate = useNavigate();

  const [stepField, setStepField] = useState([
    { id: uuidv4(), value: "" },
  ]);

  const [ingredientsField, setIngredientsField] = useState([
    { id: uuidv4(), value: "" },
  ]);

  const [basicField, setBasicField] = useState([
    { id: uuidv4(), value: "" },
    { id: uuidv4(), value: "" },
    { id: uuidv4(), value: "" },
    { id: uuidv4(), value: "" },
  ]);

  const [categoryField, setCategoryField] = useState([
    { id: "", value: "" },
  ]);

  const handleSubmit = async (event) => {
    //e.preventDefault();
    console.log("Submitted");
    const body = {
      name: basicField[0].value,
      timeComplexity: +basicField[1].value,
      portions: +basicField[2].value,
      ingredients: ingredientsField.map(x => x.value).join("\n"),
      //ingredients: ingredientsField[0].value,
      description: basicField[3].value,
      steps: stepField.map(x => x.value).join("\n"),
      //steps: stepField[0].value,
      categoryId: categoryField[0].id,
      userId: "f8fb2811-b24a-495e-aa5a-840ba5cb1a34",
    };
    const url = path.path.recipes;
    let res = await axios.post(url, body).then((x) => {
      console.log(x);

      if (x.status != 200) {
        return;
      }

      navigate('/recipe/' + x.data.data);
    });

    // send it to the DB

    // await DB response

    // Show user "recipe added"

    // redirect

  };

  const [fileField, setFileField] = useState<{ id: string, file: ArrayBuffer, url: string }[]>([]);

  let errorCount = 0;

  const [basicInputErrorCount, setBasicInputErrorCount] = useState(0);
  const [stepInputErrorCount, setStepInputErrorCount] = useState(0);
  const [ingredientsInputErrorCount, setIngredientsInputErrorCount] = useState(0);
  const [categoryInputErrorCount, setCategoryInputErrorCount] = useState(0);

  errorCount += basicInputErrorCount;
  errorCount += stepInputErrorCount;
  errorCount += ingredientsInputErrorCount;
  errorCount += categoryInputErrorCount;





  const elem = (
    <Grid container component="form" direction="column">

      <BasicInput basicField={basicField} setBasicField={setBasicField} setIntraErrors={setBasicInputErrorCount} />

      <Grid item sx={{ mt: 1 }}>

        <Grid container spacing={2}>

          <Grid item xs={4}>
            <Steps stepField={stepField} setStepField={setStepField} setIntraErrors={setStepInputErrorCount}/>
          </Grid>

          <Grid item xs={8}>
            <Ingredients ingredientsField={ingredientsField} setIngredientsField={setIngredientsField} setIntraErrors={setIngredientsInputErrorCount}/>
          </Grid>

          <Grid item>
            <Images fileField={fileField} setFileField={setFileField}/>
          </Grid>

        </Grid>

      </Grid>

      <Grid item sx={{ mt: 3 }} xs={8}>
        <Categories categoryField={categoryField} setCategoryField={setCategoryField} setIntraErrors={setCategoryInputErrorCount}/>
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
  console.log("ERRORS:", errorCount);
  console.log("FILE FIELD:", fileField);
  console.log(categoryField);

  return elem;
}
