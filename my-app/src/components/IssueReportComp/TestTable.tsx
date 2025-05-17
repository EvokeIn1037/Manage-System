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
    Stack
} from '@mui/material';
import { BodyState, PwState, SpState, LedState, MfrCol, MfrLabel, MfrState, ReadingKey, ReadingsState } from "./../../dataDef/IssueReport/ReportDataType";

interface TestTableProps {
    body: BodyState;
    setBody: React.Dispatch<React.SetStateAction<BodyState>>;
    pw: PwState;
    setPw: React.Dispatch<React.SetStateAction<PwState>>;
    sp: SpState;
    setSp: React.Dispatch<React.SetStateAction<SpState>>;
    led: LedState;
    setLed: React.Dispatch<React.SetStateAction<LedState>>;
    mfrCols: MfrCol[];
    mfrLabelsArr: MfrLabel[];
    mfr: MfrState;
    setMfr: React.Dispatch<React.SetStateAction<MfrState>>;
    readings: ReadingsState;
    setReadings: React.Dispatch<React.SetStateAction<ReadingsState>>;
    setL1Note: (item: string) => void;
    edit: boolean;
}

export default function TestReportTable(props: TestTableProps) {
    const { body, setBody, pw, setPw, sp, setSp, led, setLed, mfrCols, mfrLabelsArr, mfr, setMfr, readings, setReadings, setL1Note, edit } = props;

    const [isRead, setIsRead] = React.useState(!edit);

    React.useEffect(() => {
        if (edit === isRead) {
            setIsRead(!edit);
            console.log("Read state is: " + !isRead);
        }
    });

    const toggle = <T, K extends keyof T>(
            _state: T,
            setter: React.Dispatch<React.SetStateAction<T>>,
            key: K
        ) => () => setter(
            (prev) => ({ ...prev, [key]: !prev[key] } as T)
        );
            
    const l1NoteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setL1Note(e.target.value);
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
                                                disabled={isRead}
                                                sx={{
                                                    m: 0.5,
                                                    pointerEvents: isRead ? 'none' : 'auto',
                                                    '&.Mui-disabled': {
                                                        color: theme => theme.palette.text.primary,     // keep your normal color
                                                        opacity: 1,                                     // keep full opacity
                                                    },
                                                }}
                                                slotProps={{
                                                    input: {
                                                        'aria-readonly': isRead,
                                                    }
                                                }}
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
                                                    disabled={isRead}
                                                    sx={{
                                                        m: 0.5,
                                                        pointerEvents: isRead ? 'none' : 'auto',
                                                        '&.Mui-disabled': {
                                                            color: theme => theme.palette.text.primary,     // keep your normal color
                                                            opacity: 1,                                     // keep full opacity
                                                        },
                                                    }}
                                                    slotProps={{
                                                        input: {
                                                            'aria-readonly': isRead,
                                                        }
                                                    }}
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
                                                sx={{
                                                    ml: -3,
                                                    mr: 4,
                                                    width: 200,
                                                    '& .MuiInputBase-input': theme => ({
                                                        color: isRead ? theme.palette.text.disabled : theme.palette.text.primary,
                                                    }),
                                                }}
                                                slotProps={{
                                                    input: {
                                                        readOnly: isRead,        // still shows as editable, but not user-writable
                                                        // you can also add placeholder, maxLength, aria-attributes, etc.
                                                        style: {
                                                            pointerEvents: isRead ? 'none' : 'auto',
                                                            caretColor: isRead ? 'transparent' : undefined,
                                                        }
                                                    },
                                                }}
                                            />
                                        )}
                                    </Stack>
                                    <Stack direction="row" spacing={0} alignItems="center">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={body.surfaceDefect}
                                                    onChange={toggle(body, setBody, 'surfaceDefect')}
                                                    disabled={isRead}
                                                    sx={{
                                                        m: 0.5,
                                                        pointerEvents: isRead ? 'none' : 'auto',
                                                        '&.Mui-disabled': {
                                                            color: theme => theme.palette.text.primary,     // keep your normal color
                                                            opacity: 1,                                     // keep full opacity
                                                        },
                                                    }}
                                                    slotProps={{
                                                        input: {
                                                            'aria-readonly': isRead,
                                                        }
                                                    }}
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
                                                sx={{
                                                    ml: -3,
                                                    mr: 4,
                                                    width: 200,
                                                    '& .MuiInputBase-input': theme => ({
                                                        color: isRead ? theme.palette.text.disabled : theme.palette.text.primary,
                                                    }),
                                                }}
                                                slotProps={{
                                                    input: {
                                                        readOnly: isRead,        // still shows as editable, but not user-writable
                                                        // you can also add placeholder, maxLength, aria-attributes, etc.
                                                        style: {
                                                            pointerEvents: isRead ? 'none' : 'auto',
                                                            caretColor: isRead ? 'transparent' : undefined,
                                                        },
                                                    },
                                                }}
                                            />
                                        )}
                                    </Stack>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={body.other}
                                                onChange={toggle(body, setBody, 'other')}
                                                disabled={isRead}
                                                sx={{
                                                    m: 0.5,
                                                    pointerEvents: isRead ? 'none' : 'auto',
                                                    '&.Mui-disabled': {
                                                        color: theme => theme.palette.text.primary,     // keep your normal color
                                                        opacity: 1,                                     // keep full opacity
                                                    },
                                                }}
                                                slotProps={{
                                                    input: {
                                                        'aria-readonly': isRead,
                                                    }
                                                }}
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
                                                    disabled={isRead}
                                                    sx={{
                                                        m: 0.5,
                                                        pointerEvents: isRead ? 'none' : 'auto',
                                                        '&.Mui-disabled': {
                                                            color: theme => theme.palette.text.primary,     // keep your normal color
                                                            opacity: 1,                                     // keep full opacity
                                                        },
                                                    }}
                                                    slotProps={{
                                                        input: {
                                                            'aria-readonly': isRead,
                                                        }
                                                    }}
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
                                                    disabled={isRead}
                                                    sx={{
                                                        m: 0.5,
                                                        pointerEvents: isRead ? 'none' : 'auto',
                                                        '&.Mui-disabled': {
                                                            color: theme => theme.palette.text.primary,     // keep your normal color
                                                            opacity: 1,                                     // keep full opacity
                                                        },
                                                    }}
                                                    slotProps={{
                                                        input: {
                                                            'aria-readonly': isRead,
                                                        }
                                                    }}
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
                                                    disabled={isRead}
                                                    sx={{
                                                        m: 0.5,
                                                        pointerEvents: isRead ? 'none' : 'auto',
                                                        '&.Mui-disabled': {
                                                            color: theme => theme.palette.text.primary,     // keep your normal color
                                                            opacity: 1,                                     // keep full opacity
                                                        },
                                                    }}
                                                    slotProps={{
                                                        input: {
                                                            'aria-readonly': isRead,
                                                        }
                                                    }}
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
                                                    disabled={isRead}
                                                    sx={{
                                                        m: 0.5,
                                                        pointerEvents: isRead ? 'none' : 'auto',
                                                        '&.Mui-disabled': {
                                                            color: theme => theme.palette.text.primary,     // keep your normal color
                                                            opacity: 1,                                     // keep full opacity
                                                        },
                                                    }}
                                                    slotProps={{
                                                        input: {
                                                            'aria-readonly': isRead,
                                                        }
                                                    }}
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
                                                    disabled={isRead}
                                                    sx={{
                                                        m: 0.5,
                                                        pointerEvents: isRead ? 'none' : 'auto',
                                                        '&.Mui-disabled': {
                                                            color: theme => theme.palette.text.primary,     // keep your normal color
                                                            opacity: 1,                                     // keep full opacity
                                                        },
                                                    }}
                                                    slotProps={{
                                                        input: {
                                                            'aria-readonly': isRead,
                                                        }
                                                    }}
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
                                                    disabled={isRead}
                                                    sx={{
                                                        m: 0.5,
                                                        pointerEvents: isRead ? 'none' : 'auto',
                                                        '&.Mui-disabled': {
                                                            color: theme => theme.palette.text.primary,     // keep your normal color
                                                            opacity: 1,                                     // keep full opacity
                                                        },
                                                    }}
                                                    slotProps={{
                                                        input: {
                                                            'aria-readonly': isRead,
                                                        }
                                                    }}
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
                                                    disabled={isRead}
                                                    sx={{
                                                        m: 0.5,
                                                        pointerEvents: isRead ? 'none' : 'auto',
                                                        '&.Mui-disabled': {
                                                            color: theme => theme.palette.text.primary,     // keep your normal color
                                                            opacity: 1,                                     // keep full opacity
                                                        },
                                                    }}
                                                    slotProps={{
                                                        input: {
                                                            'aria-readonly': isRead,
                                                        }
                                                    }}
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
                                                    disabled={isRead}
                                                    sx={{
                                                        m: 0.5,
                                                        pointerEvents: isRead ? 'none' : 'auto',
                                                        '&.Mui-disabled': {
                                                            color: theme => theme.palette.text.primary,     // keep your normal color
                                                            opacity: 1,                                     // keep full opacity
                                                        },
                                                    }}
                                                    slotProps={{
                                                        input: {
                                                            'aria-readonly': isRead,
                                                        }
                                                    }}
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
                                                disabled={isRead}
                                                sx={{
                                                    m: 0.5,
                                                    pointerEvents: isRead ? 'none' : 'auto',
                                                    '&.Mui-disabled': {
                                                        color: theme => theme.palette.text.primary,     // keep your normal color
                                                        opacity: 1,                                     // keep full opacity
                                                    },
                                                }}
                                                slotProps={{
                                                    input: {
                                                        'aria-readonly': isRead,
                                                    }
                                                }}
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
                                                disabled={isRead}
                                                sx={{
                                                    m: 0.5,
                                                    pointerEvents: isRead ? 'none' : 'auto',
                                                    '&.Mui-disabled': {
                                                        color: theme => theme.palette.text.primary,     // keep your normal color
                                                        opacity: 1,                                     // keep full opacity
                                                    },
                                                }}
                                                slotProps={{
                                                    input: {
                                                        'aria-readonly': isRead,
                                                    }
                                                }}
                                            />
                                        }
                                        label="Surface defect"
                                        sx={{ mr: 4 }}
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
                                                    input: {
                                                        readOnly: isRead,        // still shows as editable, but not user-writable
                                                        // you can also add placeholder, maxLength, aria-attributes, etc.
                                                        style: {
                                                            pointerEvents: isRead ? 'none' : 'auto',
                                                            caretColor: isRead ? 'transparent' : undefined,
                                                        }
                                                    },
                                                    inputLabel: {
                                                        sx: theme => ({
                                                            color: isRead ? theme.palette.text.disabled : theme.palette.text.secondary
                                                        })
                                                    }
                                                }}
                                                sx={{
                                                    width: 80,
                                                    mr: 0.5,
                                                    '& .MuiInputBase-input': theme => ({
                                                        color: isRead ? theme.palette.text.disabled : theme.palette.text.primary,
                                                    }),
                                                }}
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
                                                    input: {
                                                        readOnly: isRead,        // still shows as editable, but not user-writable
                                                        // you can also add placeholder, maxLength, aria-attributes, etc.
                                                        style: {
                                                            pointerEvents: isRead ? 'none' : 'auto',
                                                            caretColor: isRead ? 'transparent' : undefined,
                                                        }
                                                    },
                                                    inputLabel: {
                                                        sx: theme => ({
                                                            color: isRead ? theme.palette.text.disabled : theme.palette.text.secondary
                                                        })
                                                    }
                                                }}
                                                sx={{
                                                    width: 80,
                                                    mr: 0.5,
                                                    '& .MuiInputBase-input': theme => ({
                                                        color: isRead ? theme.palette.text.disabled : theme.palette.text.primary,
                                                    }),
                                                }}
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
                                                input: {
                                                    readOnly: isRead,        // still shows as editable, but not user-writable
                                                    // you can also add placeholder, maxLength, aria-attributes, etc.
                                                    style: {
                                                        pointerEvents: isRead ? 'none' : 'auto',
                                                        caretColor: isRead ? 'transparent' : undefined,
                                                    }
                                                },
                                                inputLabel: {
                                                    sx: theme => ({
                                                        color: isRead ? theme.palette.text.disabled : theme.palette.text.secondary
                                                    })
                                                }
                                            }}
                                            sx={{
                                                width: 80,
                                                ml: 2,
                                                mr: 0.5,
                                                '& .MuiInputBase-input': theme => ({
                                                    color: isRead ? theme.palette.text.disabled : theme.palette.text.primary,
                                                }),
                                            }}
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
                                                input: {
                                                    readOnly: isRead,        // still shows as editable, but not user-writable
                                                    // you can also add placeholder, maxLength, aria-attributes, etc.
                                                    style: {
                                                        pointerEvents: isRead ? 'none' : 'auto',
                                                        caretColor: isRead ? 'transparent' : undefined,
                                                    }
                                                },
                                                inputLabel: {
                                                    sx: theme => ({
                                                        color: isRead ? theme.palette.text.disabled : theme.palette.text.secondary
                                                    })
                                                }
                                            }}
                                            sx={{
                                                width: 80,
                                                mr: 0.5,
                                                '& .MuiInputBase-input': theme => ({
                                                    color: isRead ? theme.palette.text.disabled : theme.palette.text.primary,
                                                }),
                                            }}
                                        />
                                        <Typography variant='body1' sx={{ mr: 4 }}>A</Typography>
                                    </Stack>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={sp.other}
                                                onChange={toggle(sp, setSp, 'other')}
                                                disabled={isRead}
                                                sx={{
                                                    m: 0.5,
                                                    pointerEvents: isRead ? 'none' : 'auto',
                                                    '&.Mui-disabled': {
                                                        color: theme => theme.palette.text.primary,     // keep your normal color
                                                        opacity: 1,                                     // keep full opacity
                                                    },
                                                }}
                                                slotProps={{
                                                    input: {
                                                        'aria-readonly': isRead,
                                                    }
                                                }}
                                            />
                                        }
                                        label="Other"
                                    />
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
                                                    disabled={isRead}
                                                    sx={{
                                                        m: 0.5,
                                                        pointerEvents: isRead ? 'none' : 'auto',
                                                        '&.Mui-disabled': {
                                                            color: theme => theme.palette.text.primary,     // keep your normal color
                                                            opacity: 1,                                     // keep full opacity
                                                        },
                                                    }}
                                                    slotProps={{
                                                        input: {
                                                            'aria-readonly': isRead,
                                                        }
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
                                                    disabled={isRead}
                                                    sx={{
                                                        m: 0.5,
                                                        pointerEvents: isRead ? 'none' : 'auto',
                                                        '&.Mui-disabled': {
                                                            color: theme => theme.palette.text.primary,     // keep your normal color
                                                            opacity: 1,                                     // keep full opacity
                                                        },
                                                    }}
                                                    slotProps={{
                                                        input: {
                                                            'aria-readonly': isRead,
                                                        }
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
                                                    disabled={isRead}
                                                    sx={{
                                                        m: 0.5,
                                                        pointerEvents: isRead ? 'none' : 'auto',
                                                        '&.Mui-disabled': {
                                                            color: theme => theme.palette.text.primary,     // keep your normal color
                                                            opacity: 1,                                     // keep full opacity
                                                        },
                                                    }}
                                                    slotProps={{
                                                        input: {
                                                            'aria-readonly': isRead,
                                                        }
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
                                                    disabled={isRead}
                                                    sx={{
                                                        m: 0.5,
                                                        pointerEvents: isRead ? 'none' : 'auto',
                                                        '&.Mui-disabled': {
                                                            color: theme => theme.palette.text.primary,     // keep your normal color
                                                            opacity: 1,                                     // keep full opacity
                                                        },
                                                    }}
                                                    slotProps={{
                                                        input: {
                                                            'aria-readonly': isRead,
                                                        }
                                                    }}
                                                />
                                            }
                                            label="green"
                                            sx={{ mr: 4 }}
                                        />
                                    </Stack>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={led.other}
                                                onChange={toggle(led, setLed, 'other')}
                                                disabled={isRead}
                                                sx={{
                                                    m: 0.5,
                                                    pointerEvents: isRead ? 'none' : 'auto',
                                                    '&.Mui-disabled': {
                                                        color: theme => theme.palette.text.primary,     // keep your normal color
                                                        opacity: 1,                                     // keep full opacity
                                                    },
                                                }}
                                                slotProps={{
                                                    input: {
                                                        'aria-readonly': isRead,
                                                    }
                                                }}
                                            />
                                        }
                                        label="Other"
                                        sx={{ mr: 2 }}
                                    />
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
                                            {mfrCols.map((col) => (
                                                <TableCell key={col} align="center">
                                                    <Typography variant="caption" whiteSpace="pre-line">
                                                        {col}
                                                    </Typography>
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {mfrLabelsArr.map((row) => (
                                            <TableRow key={row}>
                                                <TableCell>
                                                    <strong>{row}</strong>
                                                </TableCell>
                                                {mfrCols.map((col) => (
                                                    <TableCell key={col} align="center">
                                                        {col === 'Other' ? (
                                                            <TextField
                                                                size="small"
                                                                value={mfr[row].otherText}
                                                                onChange={(e) =>
                                                                    setMfr((m) => ({
                                                                        ...m,
                                                                        [row]: {
                                                                        ...m[row],
                                                                        otherText: e.target.value,
                                                                        },
                                                                    }))
                                                                }
                                                                placeholder="…"
                                                                sx={{
                                                                    minWidth: "8rem",
                                                                    '& .MuiInputBase-input': theme => ({
                                                                        color: isRead ? theme.palette.text.disabled : theme.palette.text.primary,
                                                                    }),
                                                                }}
                                                                slotProps={{
                                                                    input: {
                                                                        readOnly: isRead,        // still shows as editable, but not user-writable
                                                                        // you can also add placeholder, maxLength, aria-attributes, etc.
                                                                        style: {
                                                                            pointerEvents: isRead ? 'none' : 'auto',
                                                                            caretColor: isRead ? 'transparent' : undefined,
                                                                        }
                                                                    },
                                                                }}
                                                            />
                                                        ) : (
                                                            <Checkbox
                                                                checked={mfr[row][col]}
                                                                onChange={() =>
                                                                    setMfr((m) => ({
                                                                        ...m,
                                                                        [row]: {
                                                                        ...m[row],
                                                                        [col]: !m[row][col],
                                                                        },
                                                                    }))
                                                                }
                                                                disabled={isRead}
                                                                sx={{
                                                                    m: 0.5,
                                                                    pointerEvents: isRead ? 'none' : 'auto',
                                                                    '&.Mui-disabled': {
                                                                        color: theme => theme.palette.text.primary,     // keep your normal color
                                                                        opacity: 1,                                     // keep full opacity
                                                                    },
                                                                }}
                                                                slotProps={{
                                                                    input: {
                                                                        'aria-readonly': isRead,
                                                                    }
                                                                }}
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
                                                disabled={isRead}
                                                sx={{
                                                    m: 0.5,
                                                    pointerEvents: isRead ? 'none' : 'auto',
                                                    '&.Mui-disabled': {
                                                        color: theme => theme.palette.text.primary,     // keep your normal color
                                                        opacity: 1,                                     // keep full opacity
                                                    },
                                                }}
                                                slotProps={{
                                                    input: {
                                                        'aria-readonly': isRead,
                                                    }
                                                }}
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
                                                disabled={isRead}
                                                sx={{
                                                    m: 0.5,
                                                    pointerEvents: isRead ? 'none' : 'auto',
                                                    '&.Mui-disabled': {
                                                        color: theme => theme.palette.text.primary,     // keep your normal color
                                                        opacity: 1,                                     // keep full opacity
                                                    },
                                                }}
                                                slotProps={{
                                                    input: {
                                                        'aria-readonly': isRead,
                                                    }
                                                }}
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
                        '& .MuiInputBase-input': theme => ({
                            color: isRead ? theme.palette.text.disabled : theme.palette.text.primary,
                        }),
                    }}
                    slotProps={{
                        input: {
                            readOnly: isRead,        // still shows as editable, but not user-writable
                            // you can also add placeholder, maxLength, aria-attributes, etc.
                            style: {
                                pointerEvents: isRead ? 'none' : 'auto',
                                caretColor: isRead ? 'transparent' : undefined,
                            }
                        },
                        inputLabel: {
                            sx: theme => ({
                                color: isRead ? theme.palette.text.disabled : theme.palette.text.secondary
                            })
                        }
                    }}
                />
            </Box>
        </Box>
        </>
    );
}
