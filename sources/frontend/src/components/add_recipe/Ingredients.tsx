import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';

import { handleErrorChange, handleInputChange } from '../AddRecipe';


export type StepProps = {
    ingredientsField: {
        id: string;
        value: string;
    }[],
    setIngredientsField: any,
    setIntraErrors: any,
}

export const Ingredients = (props: StepProps) => {
    let errorCount = 0;
    const setErrorCount = (value) => { errorCount = value };

    const removeIngredientsField = (id: any) => {
        const values = [...props.ingredientsField];
        values.splice(values.findIndex(value => value.id === id), 1);
        props.setIngredientsField(values);
    }

    let elem = (
        <>
            <Typography color="text.primary">
                Ingrediences (don't forget to add the unit of measurement):
            </Typography>
            <Grid>
                <Grid>
                    {props.ingredientsField.map((inputField, index) => (
                        <Grid container alignItems="center">
                            <Typography color="text.primary">
                                Ingredient {index + 1}: &nbsp;
                            </Typography>
                            <TextField
                                error={handleErrorChange(inputField.value.length < 1, setErrorCount, errorCount)}
                                id={inputField.id}
                                margin="dense"
                                label={index}
                                value={inputField.value}
                                onChange={event => handleInputChange(inputField.id, event, props.ingredientsField, props.setIngredientsField)}
                            />
                            <IconButton disabled={props.ingredientsField.length === 1} onClick={() => removeIngredientsField(inputField.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    ))}
                </Grid>
                <IconButton onClick={() => props.setIngredientsField([...props.ingredientsField, { id: uuidv4(), value: "" }])}><AddIcon /></IconButton>
            </Grid>
        </>)

    props.setIntraErrors(errorCount);

    return elem;
}