import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
// import PinInput from "react-pin-input";
import TestReport from './TestReport';
import RepairReport from './RepairReport';
import ModelTable from './ModelTable';

interface ReportTableProps {
  usr: string;
  testT?: boolean;
  repairT?: boolean;
}

export default function ReportTable(props: ReportTableProps) {
    const [nameLabel, setNameLabel] = React.useState("Name");
    const [initialName, setInitialName] = React.useState(props.usr);
    const [sn, setSN] = React.useState("");
    // const [snCompleted, setSNCompleted] = React.useState(false);
    const [snHint, setSNHint] = React.useState("");
    const [snValid, setSNValid] = React.useState(false);
    const [model, setModel] = React.useState(-1);

    React.useEffect(() => {
        if (props.testT) setNameLabel("Tester Name");
        else if (props.repairT) setNameLabel("Technician Name");
    })

    const snRef = React.useRef<HTMLInputElement>(null);

    // const handleChange = (v: string) => {
    //     console.log("Input value is: " + v);
    //     setSN(v);
    // };

    React.useEffect(() => {
        snRef.current?.focus();
    }, []);

    React.useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && document.activeElement === snRef.current) {
                console.log(sn.slice(3, 15));
                if (sn.slice(3, 15).length != 12) {
                    setSNHint("Serial Number Length Wrong!");
                    setSNValid(false);
                }
                else if (sn.slice(3, 15)[0] != '6' || (sn.slice(3, 15)[1] === '0' || sn.slice(3, 15)[1] === '1') === false || sn.slice(3, 15).slice(2, 5) != "202") {
                    setSNHint("Serial Number Invalid!");
                    setSNValid(false);
                }
                else {
                    setSNHint("");
                    setSNValid(true);
                }
                setSN(sn.slice(3, 15));
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [sn]);

    // const handleComplete = () => {
    //     if (sn.length === 12) setSNCompleted(true);
    //     else setSNCompleted(false);
    // };

    return (
        <>
            <Box
                component="form"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    // height: "75vh",  // Adjusts to center in viewport
                    // '& .MuiTextField-root': { my: 1 }
                }}
            >
                <Grid
                    container
                    spacing={2}
                    columns={12}
                    sx={{
                        width: "95%",
                        alignItems: "center",
                    }}
                >
                    <Grid
                        container
                        spacing={0}
                        columns={12}
                        // justifyContent="space-between"   // horizontally center
                        // alignItems="center"       // vertically center
                        size={{ xs: 12, sm: 3.5, lg: 5 }}
                    >
                        <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 'bold',   // bold weight
                                }}
                            >
                                Name
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
                            <TextField
                                required
                                fullWidth
                                id="user-name-input"
                                label={nameLabel}
                                value={initialName}
                                variant="filled"
                                onChange={(e: React.ChangeEvent<
                                    HTMLInputElement | HTMLTextAreaElement
                                >) => {
                                    setInitialName(e.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>
                    
                    <Grid size={{ xs: 12, sm: 4.5, lg: 4.5 }}>
                        <Grid
                            container
                            spacing={1}
                            columns={12}
                            justifyContent="space-between"   // horizontally center
                            alignItems="center"       // vertically center
                        >
                            <Grid size={{ xs: 6, sm: 6, lg: 6 }}>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 'bold',   // bold weight
                                    }}
                                >
                                    Serial Number
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 6, sm: 6, lg: 6 }}>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: 'red',         // red text
                                        fontWeight: 'bold',   // bold weight
                                    }}
                                >
                                    {snHint}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid>
                            {/* <PinInput 
                                length={12}
                                focus
                                // only allow digits
                                regexCriteria={/^[0-9]$/}
                                inputMode="numeric"
                                // called on each change
                                onChange={(value) => handleChange(value)}
                                // called once all inputs are filled and valid
                                onComplete={handleComplete}
                                // styling each input
                                style={{
                                    textAlign: 'center',
                                    gridTemplateColumns: 'repeat(12)'
                                }}
                                inputStyle={{
                                    fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                                    width: 'clamp(1.5rem, 4vw, 2.5rem)',
                                    height: 'clamp(1.5rem, 4vw, 2.5rem)',
                                    borderColor: 'black',
                                    borderRadius: '0.5rem'
                                }}
                                inputFocusStyle={{
                                    borderColor: 'blue',
                                    borderRadius: '0.5rem'
                                }}
                            /> */}
                            <TextField
                                required
                                fullWidth
                                id="sn-input"
                                label="Serial Number"
                                inputRef={snRef}
                                value={sn}
                                variant="filled"
                                onChange={(e: React.ChangeEvent<
                                    HTMLInputElement | HTMLTextAreaElement
                                >) => {
                                    setSN(e.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4, lg: 2.5 }}>
                        <ModelTable model={model} setModel={setModel} edit={props.testT ? true : false} />
                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 5
                }}
            >
                <Box sx={{width: "95%"}}>
                    {props.testT && (
                        <TestReport usr={initialName} sn={sn} snValid={snValid} />
                    )}
                    {props.repairT && (
                        <RepairReport />
                    )}
                </Box>
            </Box>
        </>
    );
}
