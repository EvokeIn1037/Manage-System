import React, { FC } from 'react';
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
  Typography
} from '@mui/material';
import Grid from '@mui/material/Grid';

// type HeaderState = {
//   initial: string;
//   date: string;
//   sn: string;
//   model: { seBlue: boolean; seWhite: boolean; sePlus: boolean };
// };

type BodyState = {
  dirty: boolean;
  missing: boolean;
  surfaceDefect: boolean;
  surfaceDefectText: string;
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
};

type SpState = {
  surfaceDefect: boolean;
  vol: string;
  amp: string;
  battVol: string;
};

type LedState = {
  leftRed: boolean;
  leftGreen: boolean;
  rightRed: boolean;
  rightGreen: boolean;
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
type Reading = { no: boolean; unstable: boolean };
type ReadingsState = Record<ReadingKey, Reading>;

const techLabels = ['Comp', 'PCB', 'Wire', 'Batt'] as const;
type TechLabel = typeof techLabels[number];
const techFields = ['PW', 'SP', 'MF', 'MRR', 'MRL', 'LEDR', 'LEDL', 'UR', 'LR', 'ANG'] as const;
type TechField = typeof techFields[number];
type TechState = Record<TechLabel, Record<TechField, boolean>>;

interface L2Cause {
  MF: Record<'Rotor' | 'Stator' | 'Bearing' | 'Gearbox', boolean>;
  MRR: Record<'Rotor' | 'Stator' | 'Bearing', boolean>;
  MRL: Record<'Rotor' | 'Stator' | 'Bearing', boolean>;
  PCB: { waterDamage: boolean };
  PW: { X1_U5: boolean; J3: boolean };
  M: { X3_U14: boolean };
  ANG: { U6: boolean };
}
interface CauseState {
  L1: Record<TechLabel, boolean>;
  L2: L2Cause;
}

const BettaIssueReport: FC = () => {
  // const [header, setHeader] = React.useState<HeaderState>({
  //   initial: '',
  //   date: '',
  //   sn: '',
  //   model: { seBlue: false, seWhite: false, sePlus: false },
  // });

  const [body, setBody] = React.useState<BodyState>({
    dirty: false,
    missing: false,
    surfaceDefect: false,
    surfaceDefectText: '',
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
  });

  const [sp, setSp] = React.useState<SpState>({
    surfaceDefect: false,
    vol: '',
    amp: '',
    battVol: '',
  });

  const [led, setLed] = React.useState<LedState>({
    leftRed: false,
    leftGreen: false,
    rightRed: false,
    rightGreen: false,
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
    UR: { no: false, unstable: false },
    UL: { no: false, unstable: false },
    ANG: { no: false, unstable: false },
  });

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
      PCB: { waterDamage: false },
      PW: { X1_U5: false, J3: false },
      M: { X3_U14: false },
      ANG: { U6: false },
    },
  });

  const toggle =
    <T, K extends keyof T>(
      _state: T,
      setter: React.Dispatch<React.SetStateAction<T>>,
      key: K
    ) =>
    () =>
      setter((prev) => ({ ...prev, [key]: !prev[key] } as T));

  return (
    <Box p={2}>
      {/* 1) Header
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3}>
          <TextField
            label="Tester Initial"
            size="small"
            fullWidth
            value={header.initial}
            onChange={(e) =>
              setHeader((h) => ({ ...h, initial: e.target.value }))
            }
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Date (MM/DD)"
            size="small"
            fullWidth
            value={header.date}
            onChange={(e) =>
              setHeader((h) => ({ ...h, date: e.target.value }))
            }
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="SN"
            size="small"
            fullWidth
            value={header.sn}
            onChange={(e) =>
              setHeader((h) => ({ ...h, sn: e.target.value }))
            }
          />
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={header.model.seBlue}
                onChange={() =>
                  setHeader((h) => ({
                    ...h,
                    model: { ...h.model, seBlue: !h.model.seBlue },
                  }))
                }
              />
            }
            label="SE Blue"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={header.model.seWhite}
                onChange={() =>
                  setHeader((h) => ({
                    ...h,
                    model: { ...h.model, seWhite: !h.model.seWhite },
                  }))
                }
              />
            }
            label="SE White"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={header.model.sePlus}
                onChange={() =>
                  setHeader((h) => ({
                    ...h,
                    model: { ...h.model, sePlus: !h.model.sePlus },
                  }))
                }
              />
            }
            label="SE Plus"
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} /> */}

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
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={body.dirty}
                      onChange={toggle(body, setBody, 'dirty')}
                    />
                  }
                  label="Dirty"
                  sx={{ mr: 1 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={body.missing}
                      onChange={toggle(body, setBody, 'missing')}
                    />
                  }
                  label="Missing parts"
                  sx={{ mr: 1 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={body.surfaceDefect}
                      onChange={toggle(body, setBody, 'surfaceDefect')}
                    />
                  }
                  label="Surface defect"
                  sx={{ mr: 1 }}
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
                    sx={{ ml: 1, width: 200 }}
                  />
                )}
              </TableCell>
            </TableRow>

            {/* PW */}
            <TableRow>
              <TableCell>
                <strong>PW</strong>
              </TableCell>
              <TableCell>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={pw.notOn}
                      onChange={toggle(pw, setPw, 'notOn')}
                    />
                  }
                  label="Not On"
                  sx={{ mr: 2 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={pw.notOff}
                      onChange={toggle(pw, setPw, 'notOff')}
                    />
                  }
                  label="Not Off"
                  sx={{ mr: 2 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={pw.ledFlashRG}
                      onChange={toggle(pw, setPw, 'ledFlashRG')}
                    />
                  }
                  label="LED flash RG"
                  sx={{ mr: 2 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={pw.ledSolidR}
                      onChange={toggle(pw, setPw, 'ledSolidR')}
                    />
                  }
                  label="LED solid R"
                  sx={{ mr: 2 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={pw.chargingNo}
                      onChange={toggle(pw, setPw, 'chargingNo')}
                    />
                  }
                  label="Charging no"
                  sx={{ mr: 2 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={pw.chargingSlow}
                      onChange={toggle(pw, setPw, 'chargingSlow')}
                    />
                  }
                  label="Charging slow"
                  sx={{ mr: 2 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={pw.tipDirty}
                      onChange={toggle(pw, setPw, 'tipDirty')}
                    />
                  }
                  label="SE+ tip dirty"
                  sx={{ mr: 2 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={pw.tipBroken}
                      onChange={toggle(pw, setPw, 'tipBroken')}
                    />
                  }
                  label="SE+ tip broken"
                />
              </TableCell>
            </TableRow>

            {/* SP */}
            <TableRow>
              <TableCell>
                <strong>SP</strong>
              </TableCell>
              <TableCell>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={sp.surfaceDefect}
                      onChange={toggle(sp, setSp, 'surfaceDefect')}
                    />
                  }
                  label="Surface defect"
                  sx={{ mr: 2 }}
                />
                <TextField
                  size="small"
                  label="SP Vol"
                  value={sp.vol}
                  onChange={(e) =>
                    setSp((s) => ({ ...s, vol: e.target.value }))
                  }
                  sx={{ width: 80, mr: 2 }}
                />
                <TextField
                  size="small"
                  label="SP Amp"
                  value={sp.amp}
                  onChange={(e) =>
                    setSp((s) => ({ ...s, amp: e.target.value }))
                  }
                  sx={{ width: 80, mr: 2 }}
                />
                <TextField
                  size="small"
                  label="Batt Vol"
                  value={sp.battVol}
                  onChange={(e) =>
                    setSp((s) => ({ ...s, battVol: e.target.value }))
                  }
                  sx={{ width: 80 }}
                />
              </TableCell>
            </TableRow>

            {/* LED */}
            <TableRow>
              <TableCell>
                <strong>LED</strong>
              </TableCell>
              <TableCell>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={led.leftRed}
                      onChange={toggle(led, setLed, 'leftRed')}
                    />
                  }
                  label="Left off red"
                  sx={{ mr: 1 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={led.leftGreen}
                      onChange={toggle(led, setLed, 'leftGreen')}
                    />
                  }
                  label="green"
                  sx={{ mr: 4 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={led.rightRed}
                      onChange={toggle(led, setLed, 'rightRed')}
                    />
                  }
                  label="Right off red"
                  sx={{ mr: 1 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={led.rightGreen}
                      onChange={toggle(led, setLed, 'rightGreen')}
                    />
                  }
                  label="green"
                  sx={{ mr: 2 }}
                />
                <Typography variant="caption" color="textSecondary">
                  *Not caused by power issue
                </Typography>
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

      <Box my={3} />

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
                <TableCell>{row}</TableCell>
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
      <Grid container spacing={2}>
        {/* L1
        <Grid item xs={6}>
          <Typography>
            <strong>L1 Cause</strong>
          </Typography>
          {techLabels.map((row) => (
            <FormControlLabel
              key={row}
              control={
                <Checkbox
                  checked={cause.L1[row]}
                  onChange={() =>
                    setCause((c) => ({
                      ...c,
                      L1: { ...c.L1, [row]: !c.L1[row] },
                    }))
                  }
                />
              }
              label={row}
            />
          ))}
        </Grid> */}

        {/* L2 */}
        <Grid item xs={6}>
          <Typography>
            <strong>L2 Cause</strong>
            <br />
            <small>*may be determined by senior technicians</small>
          </Typography>
          {Object.entries(cause.L2).map(([grp, opts]) => (
            <Box key={grp} mb={1}>
              <Typography variant="subtitle2">{grp}</Typography>
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
                  sx={{ mr: 1 }}
                />
              ))}
            </Box>
          ))}
        </Grid>
      </Grid>

      <Box mt={2}>
        <TextField label="Note" fullWidth multiline rows={3} />
      </Box>
    </Box>
  );
};

export default BettaIssueReport;
