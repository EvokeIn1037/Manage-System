import * as React from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface ApiTestProps {
    apiurl: string;
}

export default function ApiTest({ apiurl }: ApiTestProps) {
    const [path, setPath] = React.useState("");
    const [param, setParam] = React.useState("");
    const [result, setResult] = React.useState("Nothing");

    const changeContent = async () => {
        const url = apiurl + path + "?" + param;

        try {
        const res = await fetch(url, {
            method: 'GET',
            credentials: 'include', // 👈 IMPORTANT for sending/receiving cookies
            headers: {
            'Content-Type': 'application/json',
            },
        });

        if (res.ok) {
            const data = await res.json();
            setResult(JSON.stringify(data));
        } else {
            throw new Error(`Server error: ${res.status}`);
        }
        } catch (err) {
        console.error('Error logging in:', err);
        }
    };
    
    return (
        <>
        <Stack
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                ml: 4,
                mr: 4,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',      // vertical centering
                    justifyContent: 'space-between',
                    mb: 2,                     // bottom margin
                }}
            >
                <Grid
                    container
                    spacing={2}
                    columns={12}
                    sx={{ mb: (theme) => theme.spacing(2) }}
                >
                    <Grid size={{ xs: 5, sm: 5, md: 5 }}>
                        <TextField
                            id="outlined-path"
                            label="Path"
                            variant="outlined"
                            value={path}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setPath(event.target.value);
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 5, sm: 5, md: 5 }}>
                        <TextField
                            id="outlined-param"
                            label="Parameter"
                            variant="outlined"
                            value={param}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setParam(event.target.value);
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 2, sm: 2, md: 2 }}>
                        <Button variant="contained" onClick={changeContent}>Submit</Button>
                    </Grid>
                </Grid>
            </Box>
            <Typography component="span">{result}</Typography>
        </Stack>
        </>
    );
}
