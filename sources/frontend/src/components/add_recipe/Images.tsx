import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';

const Input = styled('input')({
    display: 'none',
});

export type ImageProps = {
    fileField: { id: string, file: ArrayBuffer, url: string, fileBin: File }[],
    setFileField: any,
}

export const Images = (props: ImageProps) => {
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (props.fileField.length == 0) {
            props.setFileField([]);
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

        let tmp: { id: string, file: ArrayBuffer, url: string, fileBin: File }[] = [];


        for (let i = 0; i < event.target.files.length; i++) {
            let helper = true;

            let url = URL.createObjectURL(event.target.files[i]);

            const reader = new FileReader();

            reader.addEventListener("load", function () {
                // convert image file to base64 string
                console.log("DATA_URL", reader.result);

                tmp = [...tmp, { id: uuidv4(), file: reader.result! as ArrayBuffer, url: url, fileBin: event!.target!.files![i] }];

                helper = false;
            }, false);

            reader.readAsDataURL(event.target.files[i]);

            // This is horrible, but I don't know how else to do it
            while (helper) { await new Promise(resolve => setTimeout(resolve, 1000)); }
        }

        console.log("temp:", tmp);

        props.setFileField([...props.fileField, ...tmp]);
    }



    let elem = (<><Grid container direction="row">
        {
            props.fileField.length > 0 &&

            <>
                {props.fileField.map((inputField, index) => (
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
                                const values = [...props.fileField];
                                values.splice(index, 1);
                                props.setFileField(values);
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
    </>
    );

    return elem;
}