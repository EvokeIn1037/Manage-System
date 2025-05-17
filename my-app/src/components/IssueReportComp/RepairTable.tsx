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
import Grid from '@mui/material/Grid2';
import { techLabels, techFields } from './../../dataDef/IssueReport/ReportDataType';
import { TechLabel, TechField, TechState } from './../../dataDef/IssueReport/ReportDataType';
import { L2Cause, CauseState } from './../../dataDef/IssueReport/ReportDataType';

export default function RepairReportTable() {
    const [tech, setTech] = React.useState<TechState>(() =>
        techLabels.reduce((acc, row) => {
            acc[row] = techFields.reduce((r, f) => {
                r[f] = false;
                return r;
            }, {} as Record<TechField, boolean>);
          return acc;
        }, {} as TechState)
    );
    
    const [cause, setCause] = React.useState<CauseState>({
        L1: techLabels.reduce((acc, row) => {
            acc[row] = false;
            return acc;
        }, {} as Record<TechLabel, boolean>),
        L2: {
            MF: { Rotor: false, Stator: false, Bearing: false, Gearbox: false },
            MRR: { Rotor: false, Stator: false, Bearing: false },
            MRL: { Rotor: false, Stator: false, Bearing: false },
            PCB: { waterDamage: false, PW_X1_U5: false, PW_J3: false, M_X3_U14: false, ANG_U6: false },
        },
    });
    
    const [l2Note, setL2Note] = React.useState("");

    const l2NoteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setL2Note(e.target.value);
    };

    return (
        <>
        <Box p={2} sx={{ width: "100%", maxWidth: "100%" }}>
            {/* 3) Technician findings */}
            <Typography variant="h6">Issues found by Technician</Typography>
            <TableContainer component={Paper} variant="outlined" sx={{ mt: 1 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <strong>Issue / Component</strong>
                            </TableCell>
                            {techFields.map((f) => (
                                <TableCell key={f} align="center">
                                <strong>{f}</strong>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {techLabels.map((row) => (
                            <TableRow key={row}>
                                <TableCell><strong>{row}</strong></TableCell>
                                {techFields.map((f) => (
                                    <TableCell key={f} align="center">
                                        <Checkbox
                                            checked={tech[row][f]}
                                            onChange={() =>
                                                setTech((t) => ({
                                                ...t,
                                                [row]: { ...t[row], [f]: !t[row][f] },
                                                }))
                                            }
                                            sx={{ m: 0.5 }}
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box my={3} />

            {/* 4) Causes */}
            <Grid>
                {/* L2 */}
                <Typography variant='h6'>L2 Cause</Typography>
                <Typography>
                    <small>*may be determined by senior technicians</small>
                </Typography>
                <TableContainer component={Paper} variant="outlined" sx={{ mt: 1, p: 2 }}>
                    {Object.entries(cause.L2).map(([grp, opts]) => (
                        <Box key={grp} mb={1}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="subtitle2">
                                    <strong>{grp}</strong>
                                </Typography>
                                {Object.entries(opts).map(([opt, val]) => (
                                    <FormControlLabel
                                        key={opt}
                                        control={
                                            <Checkbox
                                                checked={val as boolean}
                                                onChange={() =>
                                                    setCause((c) => ({
                                                        ...c,
                                                        L2: {
                                                            ...c.L2,
                                                            [grp]: {
                                                            ...c.L2[grp as keyof L2Cause],
                                                            [opt]: !val,
                                                            },
                                                        },
                                                    }))
                                                }
                                                sx={{ m: 0.5 }}
                                            />
                                        }
                                        label={opt}
                                        sx={{ '&&': { ml: 1, mr: 3 } }}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    ))}
                </TableContainer>
            </Grid>

            <Box mt={2}>
                <TextField
                    label="Note"
                    fullWidth
                    multiline
                    rows={3}
                    onChange={l2NoteChange}
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
        </Box>
        </>
    );
}