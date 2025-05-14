import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import PinInput from "react-pin-input";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface ReportTableProps {
  usr: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ReportTable({usr}: ReportTableProps) {
    const [initialName, setInitialName] = React.useState(usr);
    const [sn, setSN] = React.useState("");
    const [snCompleted, setSNCompleted] = React.useState(false);
    const [snHint, setSNHint] = React.useState("");
    const [snValid, setSNValid] = React.useState(false);
    const [selectTab, setSelectTab] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectTab(newValue);
    };

    React.useEffect(() => {
        if (snCompleted === true) {
            console.log(sn);
            if (sn.length != 12) {
                setSNHint("Serial Number Length Wrong!");
                setSNValid(false);
            }
            else if (sn[0] != '6' || (sn[1] === '0' || sn[1] === '1') === false || sn.slice(2, 5) != "202") {
                setSNHint("Serial Number Invalid!");
                setSNValid(false);
            }
            else {
                setSNHint("");
                setSNValid(true);
            }
        }
    });

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
                <Grid container spacing={2} columns={12} sx={{width: "95%"}}>
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
                                id="filled-required"
                                label="Initial"
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
                    
                    <Grid size={{ xs: 12, sm: 8.5, lg: 7 }}>
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
                            <PinInput 
                                length={12}
                                // only allow digits
                                regexCriteria={/^[0-9]$/}
                                inputMode="numeric"
                                // called on each change
                                onChange={setSN}
                                // called once all inputs are filled and valid
                                onComplete={() => setSNCompleted(true)}
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
                            />
                        </Grid>
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
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={selectTab} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
                            <Tab label="Tester Issue Report" {...a11yProps(0)} />
                            <Tab label="Technician Issue Report" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={selectTab} index={0}>
                        Item One
                    </CustomTabPanel>
                    <CustomTabPanel value={selectTab} index={1}>
                        Item Two
                    </CustomTabPanel>
                </Box>
            </Box>
        </>
    );
}
