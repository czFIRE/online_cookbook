import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';

import { handleErrorChange, handleInputChange } from '../AddRecipe';

export type StepProps = {
    stepField: {
        id: string;
        value: string;
    }[],
    setStepField: any,
    setIntraErrors: any,
}

export const Steps = (props: StepProps) => {
    let errorCount = 0;
    const setErrorCount = (value) => { errorCount = value };

    const removeStepField = (id: any) => {
        const values = [...props.stepField];
        values.splice(values.findIndex(value => value.id === id), 1);
        props.setStepField(values);
    }

    let elem = (
        <>
            <Typography color="text.primary">
                Steps:
            </Typography>
            <Grid>
                <Grid>
                    {props.stepField.map((inputField, index) => (
                        <Grid container alignItems="center">
                            <Typography color="text.primary">
                                Step {index + 1}: &nbsp;
                            </Typography>
                            <TextField
                                error={handleErrorChange(inputField.value.length < 1, setErrorCount, errorCount)}
                                id={inputField.id}
                                margin="dense"
                                label={index}
                                value={inputField.value}
                                onChange={event => handleInputChange(inputField.id, event, props.stepField, props.setStepField)}
                            />
                            <IconButton disabled={props.stepField.length === 1} onClick={() => removeStepField(inputField.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    ))}
                </Grid>
                <IconButton onClick={() => props.setStepField([...props.stepField, { id: uuidv4(), value: "" }])}><AddIcon /></IconButton>
            </Grid>
        </>)

    props.setIntraErrors(errorCount);

    return elem;
}