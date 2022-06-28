import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { handleErrorChange, handleInputChange } from '../AddRecipe';

export type BasicInputProps = {
    basicField: {
        id: string;
        value: string;
    }[],
    setBasicField: any,
    setIntraErrors: any,
};

export const BasicInput = (props: BasicInputProps) => {
    let errorCount = 0;
    const setErrorCount = (value) => { errorCount = value };

    const elem = (<>

        <Typography color="text.primary" variant="h2" sx={{ mb: 2 }}>
            Add new recipe
        </Typography>
        <TextField
            error={handleErrorChange(props.basicField[0].value.length < 5, setErrorCount, errorCount)}
            id="name"
            label="Name"
            margin="dense"
            value={props.basicField[0].value}
            onChange={event => handleInputChange(props.basicField[0].id, event, props.basicField, props.setBasicField)}
        />
        <Grid container spacing={2} alignItems="center">
            <Grid item>
                <TextField
                    error={handleErrorChange(props.basicField[1].value.length === 0, setErrorCount, errorCount)}
                    id="time"
                    label="Time in minutes"
                    type="number"
                    margin="dense"
                    value={props.basicField[1].value}
                    onChange={event => handleInputChange(props.basicField[1].id, event, props.basicField, props.setBasicField)}

                    InputProps={{
                        inputProps: { min: 1 }
                    }}
                />
            </Grid>

            <Grid item>
                <TextField
                    error={handleErrorChange(props.basicField[2].value.length === 0, setErrorCount, errorCount)}
                    id="servings"
                    label="Number of servings"
                    type="number"
                    margin="dense"
                    value={props.basicField[2].value}
                    onChange={event => handleInputChange(props.basicField[2].id, event, props.basicField, props.setBasicField)}

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
                error={handleErrorChange(props.basicField[3].value.length < 5, setErrorCount, errorCount)}
                id="description"
                label="Description"
                margin="dense"
                value={props.basicField[3].value}
                onChange={event => handleInputChange(props.basicField[3].id, event, props.basicField, props.setBasicField)}
            />
        </Grid>

    </>);

    console.log("ERRORS IN CHILD:", errorCount);

    props.setIntraErrors(errorCount);

    return elem;
};