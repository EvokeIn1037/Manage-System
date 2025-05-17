export type BodyState = {
    dirty: boolean;
    missing: boolean;
    missingText: string;
    surfaceDefect: boolean;
    surfaceDefectText: string;
    other: boolean;
};

export type PwState = {
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

export type SpState = {
    surfaceDefect: boolean;
    volL: string;
    volR: string;
    amp: string;
    battVol: string;
    other: boolean;
};

export type LedState = {
    leftRed: boolean;
    leftGreen: boolean;
    rightRed: boolean;
    rightGreen: boolean;
    other: boolean;
};

export type MfrCol =
    | 'PW on not spin'
    | 'Noisy or shaking'
    | 'Twitching'
    | 'Spin then stop'
    | 'Stuck'
    | 'Broken plastic parts'
    | 'Other';
export type MfrLabel = 'MF' | 'MRR' | 'MRL';
export type MfrRow = Record<MfrCol, boolean> & { otherText: string };
export type MfrState = Record<MfrLabel, MfrRow>;

export type ReadingKey = 'UR' | 'UL' | 'ANG';
type Reading = { no: boolean; unstable: boolean, other: boolean };
export type ReadingsState = Record<ReadingKey, Reading>;

export const techLabels = ['Comp', 'PCB', 'Wire', 'Batt'] as const;
export type TechLabel = typeof techLabels[number];
export const techFields = ['PW', 'SP', 'MF', 'MRR', 'MRL', 'LEDR', 'LEDL', 'UR', 'LR', 'ANG'] as const;
export type TechField = typeof techFields[number];
export type TechState = Record<TechLabel, Record<TechField, boolean>>;

export interface L2Cause {
  MF: Record<'Rotor' | 'Stator' | 'Bearing' | 'Gearbox', boolean>;
  MRR: Record<'Rotor' | 'Stator' | 'Bearing', boolean>;
  MRL: Record<'Rotor' | 'Stator' | 'Bearing', boolean>;
  PCB: { waterDamage: boolean; PW_X1_U5: boolean; PW_J3: boolean; M_X3_U14: boolean; ANG_U6: boolean };
}
export interface CauseState {
  L1: Record<TechLabel, boolean>;
  L2: L2Cause;
}
