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

const techLabels = ['Comp', 'PCB', 'Wire', 'Batt'] as const;
type TechLabel = typeof techLabels[number];
const techFields = ['PW', 'SP', 'MF', 'MRR', 'MRL', 'LEDR', 'LEDL', 'UR', 'LR', 'ANG'] as const;
type TechField = typeof techFields[number];
type TechState = Record<TechLabel, Record<TechField, boolean>>;

interface L2Cause {
  MF: Record<'Rotor' | 'Stator' | 'Bearing' | 'Gearbox', boolean>;
  MRR: Record<'Rotor' | 'Stator' | 'Bearing', boolean>;
  MRL: Record<'Rotor' | 'Stator' | 'Bearing', boolean>;
  PCB: { waterDamage: boolean; PW_X1_U5: boolean; PW_J3: boolean; M_X3_U14: boolean; ANG_U6: boolean };
}
interface CauseState {
  L1: Record<TechLabel, boolean>;
  L2: L2Cause;
}

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
                                            />
                                        }
                                        label={opt}
                                        sx={{ mr: 2 }}
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