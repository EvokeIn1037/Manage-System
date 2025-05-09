import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

interface BasicDateRangePickerProps {
  start: (Dayjs | null);
  end: (Dayjs | null);
  cnt: number;
  setStart: (item: (Dayjs | null)) => void;
  setEnd: (item: (Dayjs | null)) => void;
  setDate: (item: boolean) => void;
  setCnt: React.Dispatch<React.SetStateAction<number>>;
}

export default function BasicDateRangePicker({ start, end, cnt, setStart, setEnd, setDate, setCnt }: BasicDateRangePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <DatePicker
          // label="Start date"
          value={start}
          onChange={(newVal) => {
            let nowStart = newVal;
            let nowEnd = end;
            if (nowStart && nowEnd && nowStart.isAfter(nowEnd, 'day')) {
              let tmp = nowStart;
              nowStart = nowEnd;
              nowEnd = tmp;
              setEnd(nowEnd);
            }
            setCnt(cnt + 1);
            setStart(nowStart);
            if ((cnt + 1) > 1 && (cnt + 1) % 2 === 0) setDate(true);
          }}
          slots={{ textField: TextField }}
          slotProps={{
            textField: { size: 'small', variant: 'outlined' },
            openPickerButton: { size: 'small' },
            openPickerIcon: { fontSize: 'small' },
            previousIconButton: { size: 'small' },
            leftArrowIcon: { fontSize: 'small' },
            nextIconButton: { size: 'small' },
            rightArrowIcon: { fontSize: 'small' },
            toolbar: { hidden: false },
          }}
        />
        <DatePicker
          // label="End date"
          value={end}
          minDate={start ?? undefined}
          onChange={(newVal) => {
            let nowStart = start;
            let nowEnd = newVal;
            if (nowStart && nowEnd && nowStart.isAfter(nowEnd, 'day')) {
              let tmp = nowStart;
              nowStart = nowEnd;
              nowEnd = tmp;
              setStart(nowStart);
            }
            setCnt(cnt + 1);
            setEnd(nowEnd);
            if ((cnt + 1) > 1 && (cnt + 1) % 2 === 0) setDate(true);
          }}
          slots={{ textField: TextField }}
          slotProps={{
            textField: { size: 'small', variant: 'outlined' },
            openPickerButton: { size: 'small' },
            openPickerIcon: { fontSize: 'small' },
            previousIconButton: { size: 'small' },
            leftArrowIcon: { fontSize: 'small' },
            nextIconButton: { size: 'small' },
            rightArrowIcon: { fontSize: 'small' },
            toolbar: { hidden: false },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
}
