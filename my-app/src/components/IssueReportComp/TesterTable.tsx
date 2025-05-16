import * as React from 'react';
import {
    Box,
    TextField,
    FormControlLabel,
    Checkbox,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Stack,
    Button
} from '@mui/material';

type BodyState = {
    dirty: boolean;
    missing: boolean;
    missingText: string;
    surfaceDefect: boolean;
    surfaceDefectText: string;
    other: boolean;
};

type PwState = {
    notOn: boolean;
    notOff: boolean;
    ledFlashRG: boolean;
    ledSolidR: boolean;
    chargingNo: boolean;
    chargingSlow: boolean;
    tipDirty: boolean;
    tipBroken: boolean;
    other: boolean;
};

type SpState = {
    surfaceDefect: boolean;
    volL: string;
    volR: string;
    amp: string;
    battVol: string;
    other: boolean;
};

type LedState = {
    leftRed: boolean;
    leftGreen: boolean;
    rightRed: boolean;
    rightGreen: boolean;
    other: boolean;
};

type MfCol =
    | 'PW on not spin'
    | 'Noisy or shaking'
    | 'Twitching'
    | 'Spin then stop'
    | 'Stuck'
    | 'Broken plastic parts'
    | 'Other';
type MfLabel = 'MF' | 'MRR' | 'MRL';
type MfRow = Record<MfCol, boolean> & { otherText: string };
type MfState = Record<MfLabel, MfRow>;

type ReadingKey = 'UR' | 'UL' | 'ANG';
type Reading = { no: boolean; unstable: boolean, other: boolean };
type ReadingsState = Record<ReadingKey, Reading>;

export default function TestReportTable() {
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
    
    const mfCols: MfCol[] = [
        'PW on not spin',
        'Noisy or shaking',
        'Twitching',
        'Spin then stop',
        'Stuck',
        'Broken plastic parts',
        'Other',
    ];
    
    const mfLabelsArr: MfLabel[] = ['MF', 'MRR', 'MRL'];
    
    const [mf, setMf] = React.useState<MfState>(() =>
        mfLabelsArr.reduce((acc, row) => {
            acc[row] = mfCols.reduce((r, col) => {
                r[col] = false;
                return r;
            }, { otherText: '' } as MfRow);
            return acc;
        }, {} as MfState)
    );
    
    const [readings, setReadings] = React.useState<ReadingsState>({
        UR: { no: false, unstable: false, other: false },
        UL: { no: false, unstable: false, other: false },
        ANG: { no: false, unstable: false, other: false },
    });

    const toggle = <T, K extends keyof T>(
            _state: T,
            setter: React.Dispatch<React.SetStateAction<T>>,
            key: K
        ) => () => setter(
            (prev) => ({ ...prev, [key]: !prev[key] } as T)
        );

    const [l1Note, setL1Note] = React.useState("");
    
    const l1NoteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setL1Note(e.target.value);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        console.log("Body: " + body.dirty);
        console.log("Power: " + pw);
        console.log("Solar Panel: " + sp);
        console.log("LED: " + led);
        console.log("Motor: " + mf.MF['Broken plastic parts']);
        console.log("U + ANG: " + readings);
        console.log("Notes: " + l1Note);
      };
    
    return (
        <>
        <Box p={0} sx={{ width: "100%", maxWidth: "100%" }}>
            {/* 2) Tester findings */}
            <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                    <TableBody>
                        {/* BODY */}
                        <TableRow>
                            <TableCell>
                                <strong>BODY</strong>
                            </TableCell>
                            <TableCell>
                                <Box 
                                    sx={{ 
                                        display:      'flex',       // make it a flex container
                                        flexWrap:     'wrap',       // allow items to wrap onto new lines
                                        alignItems:   'center',     // vertical alignment within each row
                                    }}
                                >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={body.dirty}
                                                onChange={toggle(body, setBody, 'dirty')}
                                                sx={{m: 0.5}}
                                            />
                                        }
                                        label="Dirty"
                                        sx={{ mr: 4 }}
                                    />
                                    <Stack direction="row" spacing={0} alignItems="center">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={body.missing}
                                                    onChange={toggle(body, setBody, 'missing')}
                                                    sx={{m: 0.5}}
                                                />
                                            }
                                            label="Missing parts"
                                            sx={{ mr: 4 }}
                                        />
                                        {body.missing && (
                                            <TextField
                                                size="small"
                                                placeholder="describe..."
                                                value={body.missingText}
                                                onChange={(e) =>
                                                    setBody((b) => ({
                                                        ...b,
                                                        missingText: e.target.value,
                                                    }))
                                                }
                                                sx={{ ml: -3, mr: 4, width: 200 }}
                                            />
                                        )}
                                    </Stack>
                                    <Stack direction="row" spacing={0} alignItems="center">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={body.surfaceDefect}
                                                    onChange={toggle(body, setBody, 'surfaceDefect')}
                                                    sx={{m: 0.5}}
                                                />
                                            }
                                            label="Surface defect"
                                            sx={{ mr: 4 }}
                                        />
                                        {body.surfaceDefect && (
                                            <TextField
                                                size="small"
                                                placeholder="describe..."
                                                value={body.surfaceDefectText}
                                                onChange={(e) =>
                                                    setBody((b) => ({
                                                        ...b,
                                                        surfaceDefectText: e.target.value,
                                                    }))
                                                }
                                                sx={{ ml: -3, mr: 4, width: 200 }}
                                            />
                                        )}
                                    </Stack>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={body.other}
                                                onChange={toggle(body, setBody, 'other')}
                                                sx={{m: 0.5}}
                                            />
                                        }
                                        label="Other"
                                    />
                                </Box>
                            </TableCell>
                        </TableRow>

                        {/* PW */}
                        <TableRow>
                            <TableCell>
                                <strong>PW</strong>
                            </TableCell>
                            <TableCell>
                                <Box 
                                    sx={{ 
                                        display:      'flex',       // make it a flex container
                                        flexWrap:     'wrap',       // allow items to wrap onto new lines
                                        alignItems:   'center',     // vertical alignment within each row
                                    }}
                                >
                                    <Stack direction="row" spacing={0} alignItems="center">
                                        <Typography variant='body1' sx={{ mr: 2 }}><strong>Not</strong></Typography>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={pw.notOn}
                                                    onChange={toggle(pw, setPw, 'notOn')}
                                                    sx={{m: 0.5}}
                                                />
                                            }
                                            label="On"
                                            sx={{ mr: 0.5 }}
                                        />
                                        <Typography variant='body1' sx={{ mr: 1.5 }}>/</Typography>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={pw.notOff}
                                                    onChange={toggle(pw, setPw, 'notOff')}
                                                    sx={{m: 0.5}}
                                                />
                                            }
                                            label="Off"
                                            sx={{ mr: 4 }}
                                        />
                                    </Stack>
                                    <Stack direction="row" spacing={0} alignItems="center">
                                        <Typography variant='body1' sx={{ mr: 2 }}><strong>LED</strong></Typography>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={pw.ledFlashRG}
                                                    onChange={toggle(pw, setPw, 'ledFlashRG')}
                                                    sx={{m: 0.5}}
                                                />
                                            }
                                            label="flash RG"
                                            sx={{ mr: 0.5 }}
                                        />
                                        <Typography variant='body1' sx={{ mr: 1.5 }}>/</Typography>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={pw.ledSolidR}
                                                    onChange={toggle(pw, setPw, 'ledSolidR')}
                                                    sx={{m: 0.5}}
                                                />
                                            }
                                            label="solid R"
                                            sx={{ mr: 4 }}
                                        />
                                    </Stack>
                                    <Stack direction="row" spacing={0} alignItems="center">
                                        <Typography variant='body1' sx={{ mr: 2 }}><strong>Charging</strong></Typography>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={pw.chargingNo}
                                                    onChange={toggle(pw, setPw, 'chargingNo')}
                                                    sx={{m: 0.5}}
                                                />
                                            }
                                            label="no"
                                            sx={{ mr: 0.5 }}
                                        />
                                        <Typography variant='body1' sx={{ mr: 1.5 }}>/</Typography>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={pw.chargingSlow}
                                                    onChange={toggle(pw, setPw, 'chargingSlow')}
                                                    sx={{m: 0.5}}
                                                />
                                            }
                                            label="slow"
                                            sx={{ mr: 4 }}
                                        />
                                    </Stack>
                                    <Stack direction="row" spacing={0} alignItems="center">
                                        <Typography variant='body1' sx={{ mr: 2 }}><strong>SE+ tips</strong></Typography>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={pw.tipDirty}
                                                    onChange={toggle(pw, setPw, 'tipDirty')}
                                                    sx={{m: 0.5}}
                                                />
                                            }
                                            label="dirty"
                                            sx={{ mr: 0.5 }}
                                        />
                                        <Typography variant='body1' sx={{ mr: 1.5 }}>/</Typography>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={pw.tipBroken}
                                                    onChange={toggle(pw, setPw, 'tipBroken')}
                                                    sx={{m: 0.5}}
                                                />
                                            }
                                            label="broken"
                                            sx={{ mr: 4 }}
                                        />
                                    </Stack>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={pw.other}
                                                onChange={toggle(pw, setPw, 'other')}
                                                sx={{m: 0.5}}
                                            />
                                        }
                                        label="Other"
                                    />
                                </Box>
                            </TableCell>
                        </TableRow>

                        {/* SP */}
                        <TableRow>
                            <TableCell>
                                <strong>SP</strong>
                            </TableCell>
                            <TableCell>
                                <Box 
                                    sx={{
                                        display:      'flex',       // make it a flex container
                                        flexWrap:     'wrap',       // allow items to wrap onto new lines
                                        alignItems:   'center',     // vertical alignment within each row
                                    }}
                                >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={sp.surfaceDefect}
                                                onChange={toggle(sp, setSp, 'surfaceDefect')}
                                                sx={{m: 0.5}}
                                            />
                                        }
                                        label="Surface defect"
                                        sx={{ mr: 3 }}
                                    />
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Stack direction="row" spacing={0} alignItems="center">
                                            <TextField
                                                size="small"
                                                label="SP VolL"
                                                value={sp.volL}
                                                slotProps={{
                                                    htmlInput: {
                                                        // mobile: numeric + “.” keypad
                                                        inputMode: 'decimal',
                                                        // optional HTML pattern validation
                                                        pattern: '[0-9]*\\.?[0-9]*',
                                                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                                            // 1) strip anything but digits or dot
                                                            let val = e.target.value.replace(/[^0-9.]/g, '');
                                                            // 2) allow only one dot
                                                            const parts = val.split('.');
                                                            if (parts.length > 2) {
                                                                val = parts.shift()! + '.' + parts.join('');
                                                            }
                                                            // 3) update state
                                                            setSp(s => ({ ...s, volL: val }));
                                                        },
                                                    },
                                                }}
                                                sx={{ width: 80, mr: 0.5 }}
                                            />
                                            <Typography variant='body1'>V</Typography>
                                        </Stack>
                                        <Typography variant='body1'>/</Typography>
                                        <Stack direction="row" spacing={0} alignItems="center">
                                            <TextField
                                                size="small"
                                                label="SP VolR"
                                                value={sp.volR}
                                                slotProps={{
                                                    htmlInput: {
                                                        // mobile: numeric + “.” keypad
                                                        inputMode: 'decimal',
                                                        // optional HTML pattern validation
                                                        pattern: '[0-9]*\\.?[0-9]*',
                                                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                                            // 1) strip anything but digits or dot
                                                            let val = e.target.value.replace(/[^0-9.]/g, '');
                                                            // 2) allow only one dot
                                                            const parts = val.split('.');
                                                            if (parts.length > 2) {
                                                                val = parts.shift()! + '.' + parts.join('');
                                                            }
                                                            // 3) update state
                                                            setSp(s => ({ ...s, volR: val }));
                                                        },
                                                    },
                                                }}
                                                sx={{ width: 80, mr: 0.5 }}
                                            />
                                            <Typography variant='body1' sx={{ mr: 1 }}>V</Typography>
                                        </Stack>
                                    </Stack>
                                    <Stack direction="row" spacing={0} alignItems="center">
                                        <TextField
                                            size="small"
                                            label="SP Amp"
                                            value={sp.amp}
                                            slotProps={{
                                                htmlInput: {
                                                    // mobile: numeric + “.” keypad
                                                    inputMode: 'decimal',
                                                    // optional HTML pattern validation
                                                    pattern: '[0-9]*\\.?[0-9]*',
                                                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                                        // 1) strip anything but digits or dot
                                                        let val = e.target.value.replace(/[^0-9.]/g, '');
                                                        // 2) allow only one dot
                                                        const parts = val.split('.');
                                                        if (parts.length > 2) {
                                                            val = parts.shift()! + '.' + parts.join('');
                                                        }
                                                        // 3) update state
                                                        setSp(s => ({ ...s, amp: val }));
                                                    },
                                                },
                                            }}
                                            sx={{ width: 80, ml: 2, mr: 0.5 }}
                                        />
                                        <Typography variant='body1' sx={{ mr: 3 }}>A</Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={0} alignItems="center">
                                        <TextField
                                            size="small"
                                            label="Batt Vol"
                                            value={sp.battVol}
                                            slotProps={{
                                                htmlInput: {
                                                    // mobile: numeric + “.” keypad
                                                    inputMode: 'decimal',
                                                    // optional HTML pattern validation
                                                    pattern: '[0-9]*\\.?[0-9]*',
                                                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                                        // 1) strip anything but digits or dot
                                                        let val = e.target.value.replace(/[^0-9.]/g, '');
                                                        // 2) allow only one dot
                                                        const parts = val.split('.');
                                                        if (parts.length > 2) {
                                                            val = parts.shift()! + '.' + parts.join('');
                                                        }
                                                        // 3) update state
                                                        setSp(s => ({ ...s, battVol: val }));
                                                    },
                                                },
                                            }}
                                            sx={{ width: 80, mr: 0.5 }}
                                        />
                                        <Typography variant='body1'>A</Typography>
                                    </Stack>
                                </Box>
                            </TableCell>
                        </TableRow>

                        {/* LED */}
                        <TableRow>
                            <TableCell>
                                <strong>LED</strong>
                            </TableCell>
                            <TableCell>
                                <Box 
                                    sx={{
                                        display:      'flex',       // make it a flex container
                                        flexWrap:     'wrap',       // allow items to wrap onto new lines
                                        alignItems:   'center',     // vertical alignment within each row
                                    }}
                                >
                                    <Stack direction="row" spacing={0} alignItems="center">
                                        <Typography variant='body1' sx={{ mr: 2 }}><strong>Left off</strong></Typography>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={led.leftRed}
                                                    onChange={toggle(led, setLed, 'leftRed')}
                                                    sx={{
                                                        margin: 0.5
                                                    }}
                                                />
                                            }
                                            label="red"
                                            sx={{ mr: 0.5 }}
                                        />
                                        <Typography variant='body1' sx={{ mr: 1.5 }}>/</Typography>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={led.leftGreen}
                                                    onChange={toggle(led, setLed, 'leftGreen')}
                                                    sx={{
                                                        margin: 0.5
                                                    }}
                                                />
                                            }
                                            label="green"
                                            sx={{ mr: 4 }}
                                        />
                                    </Stack>
                                    <Stack direction="row" spacing={0} alignItems="center">
                                        <Typography variant='body1' sx={{ mr: 2 }}><strong>Right off</strong></Typography>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={led.rightRed}
                                                    onChange={toggle(led, setLed, 'rightRed')}
                                                    sx={{
                                                        margin: 0.5
                                                    }}
                                                />
                                            }
                                            label="red"
                                            sx={{ mr: 0.5 }}
                                        />
                                        <Typography variant='body1' sx={{ mr: 1.5 }}>/</Typography>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={led.rightGreen}
                                                    onChange={toggle(led, setLed, 'rightGreen')}
                                                    sx={{
                                                        margin: 0.5
                                                    }}
                                                />
                                            }
                                            label="green"
                                            sx={{ mr: 2 }}
                                        />
                                    </Stack>
                                    <Typography variant="caption" color="textSecondary">
                                        *Not caused by power issue
                                    </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>

                        {/* Motor grid */}
                        <TableRow>
                            <TableCell>
                                <strong>Motor</strong>
                            </TableCell>
                            <TableCell>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            {mfCols.map((col) => (
                                                <TableCell key={col} align="center">
                                                    <Typography variant="caption" whiteSpace="pre-line">
                                                        {col}
                                                    </Typography>
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {mfLabelsArr.map((row) => (
                                            <TableRow key={row}>
                                                <TableCell>
                                                    <strong>{row}</strong>
                                                </TableCell>
                                                {mfCols.map((col) => (
                                                    <TableCell key={col} align="center">
                                                        {col === 'Other' ? (
                                                            <TextField
                                                                size="small"
                                                                value={mf[row].otherText}
                                                                onChange={(e) =>
                                                                setMf((m) => ({
                                                                    ...m,
                                                                    [row]: {
                                                                    ...m[row],
                                                                    otherText: e.target.value,
                                                                    },
                                                                }))
                                                                }
                                                                placeholder="…"
                                                                sx={{ minWidth: "8rem" }}
                                                            />
                                                        ) : (
                                                            <Checkbox
                                                                checked={mf[row][col]}
                                                                onChange={() =>
                                                                setMf((m) => ({
                                                                    ...m,
                                                                    [row]: {
                                                                    ...m[row],
                                                                    [col]: !m[row][col],
                                                                    },
                                                                }))
                                                                }
                                                            />
                                                        )}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableCell>
                        </TableRow>

                        {/* UR / UL / ANG */}
                        {( ['UR','UL','ANG'] as ReadingKey[] ).map((k) => (
                            <TableRow key={k}>
                                <TableCell>
                                    <strong>{k}</strong>
                                </TableCell>
                                <TableCell>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={readings[k].no}
                                                onChange={() =>
                                                    setReadings((r) => ({
                                                        ...r,
                                                        [k]: { ...r[k], no: !r[k].no },
                                                    }))
                                                }
                                            />
                                        }
                                        label="No reading"
                                        sx={{ mr: 2 }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={readings[k].unstable}
                                                onChange={() =>
                                                    setReadings((r) => ({
                                                        ...r,
                                                        [k]: { ...r[k], unstable: !r[k].unstable },
                                                    }))
                                                }
                                            />
                                        }
                                        label="Unstable reading"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box mt={2}>
                <TextField
                    label="Note"
                    fullWidth
                    multiline
                    rows={3}
                    onChange={l1NoteChange}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            height: '10vh',              // total height
                            '& .MuiOutlinedInput-input': {
                                // adjust padding so text sits nicely
                                padding: '2rem',
                            },
                        }, 
                    }}
                />
            </Box>
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