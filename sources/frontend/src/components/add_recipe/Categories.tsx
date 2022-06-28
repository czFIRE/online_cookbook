import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';

import axios from 'axios';
import path from './../path.json';

import { handleErrorChange, handleInputChange } from '../AddRecipe';
import { useState } from 'react';

export type CategoryProps = {
    categoryField: {
        id: string;
        value: string;
    }[],
    setCategoryField: any,
    setIntraErrors: any,
}


export const Categories = (props: CategoryProps) => {
    let errorCount = 0;
    const setErrorCount = (value) => { errorCount = value };

    const [categoryOptions, setCategoryOptions] = useState<{ name: string, id: string }[]>([]);

    const elem = (<>
        <Typography color="text.primary">
            Categories:
        </Typography>
        <Grid>
            <Grid>
                {props.categoryField.map((inputField, index) => (
                    <Grid container alignItems="center">
                        <Typography color="text.primary">
                            Category {index + 1}: &nbsp;
                        </Typography>
                        <TextField
                            error={handleErrorChange(inputField.value.length < 1, setErrorCount, errorCount)}
                            id={inputField.id}
                            margin="dense"
                            label={index}
                            value={inputField.value}
                            onChange={event => {
                                const newInputField = props.categoryField.map((i, ind) => {
                                    if (index === ind) {
                                      i.value = event.target.value;
                                      i.id = categoryOptions.find(x => x.name == event.target.value)!.id;
                                    }
                                    return i;
                                  })

                                props.setCategoryField(newInputField);
                            }}

                            select
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Please select your category"

                            onClick={async () => {
                                if (categoryOptions.length === 0) {
                                    let res = await axios.get(path.path.category);

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
                        <IconButton disabled={props.categoryField.length === 1} onClick={() => {
                            const values = [...props.categoryField];
                            values.splice(index, 1);
                            props.setCategoryField(values);
                        }}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                ))}
            </Grid>
            <IconButton onClick={() => props.setCategoryField([...props.categoryField, { id: "", value: "" }])}><AddIcon /></IconButton>
        </Grid></>);

    props.setIntraErrors(errorCount);

    return elem;
}