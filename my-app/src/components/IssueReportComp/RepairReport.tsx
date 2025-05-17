import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import TestReportTable from './TestTable';
import RepairReportTable from './RepairTable';
import { BodyState, PwState, SpState, LedState, MfrCol, MfrLabel, MfrRow, MfrState, ReadingsState } from '../../dataDef/IssueReport/ReportDataType';

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

export default function RepairReport() {
    const [selectTab, setSelectTab] = React.useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setSelectTab(newValue);
    };

    const [body, setBody] = React.useState<BodyState>({
        dirty: false,
        missing: false,
        missingText: '',
        surfaceDefect: false,
        surfaceDefectText: '',
        other: false,
    });
    
    const [pw, setPw] = React.useState<PwState>({
        notOn: false,
        notOff: false,
        ledFlashRG: false,
        ledSolidR: false,
        chargingNo: false,
        chargingSlow: false,
        tipDirty: false,
        tipBroken: false,
        other: false,
    });
    
    const [sp, setSp] = React.useState<SpState>({
        surfaceDefect: false,
        volL: '',
        volR: '',
        amp: '',
        battVol: '',
        other: false,
    });
    
    const [led, setLed] = React.useState<LedState>({
        leftRed: false,
        leftGreen: false,
        rightRed: false,
        rightGreen: false,
        other: false,
    });
    
    const mfrCols: MfrCol[] = [
        'PW on not spin',
        'Noisy or shaking',
        'Twitching',
        'Spin then stop',
        'Stuck',
        'Broken plastic parts',
        'Other',
    ];
    
    const mfrLabelsArr: MfrLabel[] = ['MF', 'MRR', 'MRL'];
    
    const [mfr, setMfr] = React.useState<MfrState>(() =>
        mfrLabelsArr.reduce((acc, row) => {
            acc[row] = mfrCols.reduce((r, col) => {
                r[col] = false;
                return r;
            }, { otherText: '' } as MfrRow);
            return acc;
        }, {} as MfrState)
    );
    
    const [readings, setReadings] = React.useState<ReadingsState>({
        UR: { no: false, unstable: false, other: false },
        UL: { no: false, unstable: false, other: false },
        ANG: { no: false, unstable: false, other: false },
    });
    
    const [l1Note, setL1Note] = React.useState("");

    const [edit, setEdit] = React.useState(false);

    const handleSave = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setEdit(false);
    };
    const handleRead = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setEdit(true);
    };

    return (
        <>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={selectTab} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
                <Tab label="Tester Issue Report" {...a11yProps(0)} />
                <Tab label="Technician Issue Report" {...a11yProps(1)} />
            </Tabs>
        </Box>
        <CustomTabPanel value={selectTab} index={0}>
            <Stack sx={{ width: '100%' }}>
                <TestReportTable body={body} setBody={setBody} pw={pw} setPw={setPw} sp={sp} setSp={setSp} led={led} setLed={setLed} mfrCols={mfrCols} mfrLabelsArr={mfrLabelsArr} mfr={mfr} setMfr={setMfr} readings={readings} setReadings={setReadings} setL1Note={setL1Note} edit={edit} />
                {edit ? (
                    <Box
                        sx={{
                            display: 'flex',       // make it a flex container
                            justifyContent: 'end',
                            alignItems: 'center',     // vertical alignment within each row
                            mt: 2,
                        }}
                    >
                        <Button
                            id="test-save-button"
                            onClick={handleSave}
                            sx={{
                                bgcolor: 'primary.main',
                                backgroundImage: 'none',
                                borderColor: 'primary.main',
                                boxShadow: theme => `0px 2px 6px ${theme.palette.grey[500]}`,
                                color: 'primary.contrastText',      // ensure text is readable
                                '&:hover': {
                                    bgcolor: 'primary.dark',          // darker on hover
                                    backgroundImage: 'none',
                                },
                                // width: "100%",
                                height: "100%",
                            }}
                        >
                            Save
                        </Button>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: 'flex',       // make it a flex container
                            justifyContent: 'end',
                            alignItems: 'center',     // vertical alignment within each row
                            mt: 2,
                        }}
                    >
                        <Button
                            id="test-read-button"
                            onClick={handleRead}
                            sx={{
                                bgcolor: 'primary.main',
                                backgroundImage: 'none',
                                borderColor: 'primary.main',
                                boxShadow: theme => `0px 2px 6px ${theme.palette.grey[500]}`,
                                color: 'primary.contrastText',      // ensure text is readable
                                '&:hover': {
                                    bgcolor: 'primary.dark',          // darker on hover
                                    backgroundImage: 'none',
                                },
                                // width: "100%",
                                height: "100%",
                            }}
                        >
                            Edit
                        </Button>
                    </Box>
                )}
            </Stack>
        </CustomTabPanel>
        <CustomTabPanel value={selectTab} index={1}>
            <RepairReportTable />
        </CustomTabPanel>
        </>
    );
}