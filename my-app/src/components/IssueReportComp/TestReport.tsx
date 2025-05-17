import * as React from 'react';
import Box from '@mui/material/Box';
import TestReportTable from './TestTable';
import Button from '@mui/material/Button';
import { BodyState, PwState, SpState, LedState, MfrCol, MfrLabel, MfrRow, MfrState, ReadingsState } from '../../dataDef/IssueReport/ReportDataType';

interface TestReportProps {
    usr: string;
    sn: string;
    snValid: boolean;
}

export default function TestReport({ usr, sn, snValid }: TestReportProps) {
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

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        console.log("Tester: " + usr);
        if (snValid) console.log("Serial Number: " + sn);
        else console.log("Serial Number Invalid");
        console.log("Body: " + body.dirty);
        console.log("Power: " + pw.other);
        console.log("Solar Panel: " + sp.surfaceDefect);
        console.log("LED: " + led.other);
        console.log("Motor: " + mfr.MF['Broken plastic parts']);
        console.log("U + ANG: " + readings.ANG.no);
        console.log("Notes: " + l1Note);
    };

    return (
        <>
        <Box p={0} sx={{ width: "100%", maxWidth: "100%" }}>
            <TestReportTable body={body} setBody={setBody} pw={pw} setPw={setPw} sp={sp} setSp={setSp} led={led} setLed={setLed} mfrCols={mfrCols} mfrLabelsArr={mfrLabelsArr} mfr={mfr} setMfr={setMfr} readings={readings} setReadings={setReadings} setL1Note={setL1Note} edit={true} />
            <Box
                sx={{
                    display: 'flex',       // make it a flex container
                    justifyContent: 'end',
                    alignItems: 'center',     // vertical alignment within each row
                    mt: 2,
                }}
            >
                <Button
                    id="test-submit-button"
                    onClick={handleClick}
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
                    Submit
                </Button>
            </Box>
        </Box>
        </>
    );
}