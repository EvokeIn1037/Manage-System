import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
// import ArchiveIcon from '@mui/icons-material/Archive';
// import FileCopyIcon from '@mui/icons-material/FileCopy';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BasicDateRangePicker from './BasicDateRangePicker';
import dayjs, { Dayjs } from 'dayjs';

interface DateSelectionProps {
  todayDate: Date;
  dateTrig: number;
  setDateTrig: (item: number) => void;
  setStartDate: (item: string) => void;
  setEndDate: (item: string) => void;
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(25, 25, 25)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(80, 80, 80, 0.05) 0px 0px 0px 1px, rgba(80, 80, 80, 0.1) 0px 10px 15px -3px, rgba(80, 80, 80, 80.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));

function formatYMD(date: Date): string {
  const YYYY = date.getFullYear();
  const MM   = String(date.getMonth() + 1).padStart(2, '0');
  const DD   = String(date.getDate()     ).padStart(2, '0');
  return `${YYYY}-${MM}-${DD}`;
}

function getPrevMonthRange(todayStr: string): { firstDay: string; lastDay: string } {
  // 1️⃣ Parse input
  const [y, m] = todayStr.split('-').map(Number);

  // 2️⃣ Start at the 1st of this month
  //    monthIndex = m-1 since JS Date months are 0-11
  const firstOfThisMonth = new Date(y, m - 1, 1);
  
  // 3️⃣ Back up one day → last day of previous month
  const lastOfPrevMonth = new Date(firstOfThisMonth);
  lastOfPrevMonth.setDate(0);
  
  // 4️⃣ First day of that month
  const firstOfPrevMonth = new Date(lastOfPrevMonth.getFullYear(), lastOfPrevMonth.getMonth(), 1);
  
  // 5️⃣ Formatter to "YYYY-MM-DD"
  const formatYMD = (date: Date) => {
    const YYYY = date.getFullYear();
    const MM   = String(date.getMonth() + 1).padStart(2, '0');
    const DD   = String(date.getDate()     ).padStart(2, '0');
    return `${YYYY}-${MM}-${DD}`;
  };
  
  return {
    firstDay: formatYMD(firstOfPrevMonth),
    lastDay:  formatYMD(lastOfPrevMonth),
  };
}

export default function DateSelectionMenu({ todayDate, dateTrig, setDateTrig, setStartDate, setEndDate }: DateSelectionProps) {
  const [cusStartDate, setCusStartDate] = React.useState<Dayjs | null>(dayjs());
  const [cusEndDate, setCusEndDate]     = React.useState<Dayjs | null>(dayjs().add(1, 'day'));
  const [cusDate, setCusDate]     = React.useState(false);
  const [cnt, setCnt] = React.useState(0);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [buttonName, setButtonName] = React.useState("Date Selection");
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setCusDate(false);
    setAnchorEl(null);
  };

  const changeToday = () => {
    const yesterdayDate = new Date(todayDate.getTime() - 24 * 60 * 60 * 1000);
    setStartDate(formatYMD(yesterdayDate));
    setEndDate(formatYMD(todayDate));

    const tmp = (dateTrig + 1) % 100;
    setDateTrig(tmp);

    setButtonName("Today");
    handleClose();
  };

  const changeYesterday = () => {
    const yesterdayDate = new Date(todayDate.getTime() - 24 * 60 * 60 * 1000);
    const beforeYesterdayDate = new Date(todayDate.getTime() - 48 * 60 * 60 * 1000);
    setStartDate(formatYMD(beforeYesterdayDate));
    setEndDate(formatYMD(yesterdayDate));

    const tmp = (dateTrig + 1) % 100;
    setDateTrig(tmp);
    
    setButtonName("Yesterday");
    handleClose();
  };

  const changeLast7Days = () => {
    const weekDate = new Date(todayDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    setStartDate(formatYMD(weekDate));
    setEndDate(formatYMD(todayDate));

    const tmp = (dateTrig + 1) % 100;
    setDateTrig(tmp);
    
    setButtonName("Last 7 Days");
    handleClose();
  };

  const changeLast30Days = () => {
    const yesterdayDate = new Date(todayDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    setStartDate(formatYMD(yesterdayDate));
    setEndDate(formatYMD(todayDate));

    const tmp = (dateTrig + 1) % 100;
    setDateTrig(tmp);
    
    setButtonName("Last 30 Days");
    handleClose();
  };

  const changeThisMonth = () => {
    const todayStr = formatYMD(todayDate);
    const beginMonthStr = todayStr.slice(0, 8) + "01";
    setStartDate(beginMonthStr);
    setEndDate(formatYMD(todayDate));

    const tmp = (dateTrig + 1) % 100;
    setDateTrig(tmp);
    
    setButtonName("This Month");
    handleClose();
  };

  const changeLastMonth = () => {
    const { firstDay, lastDay } = getPrevMonthRange(formatYMD(todayDate));
    setStartDate(firstDay);
    setEndDate(lastDay);

    const tmp = (dateTrig + 1) % 100;
    setDateTrig(tmp);
    
    setButtonName("Last Month");
    handleClose();
  };

  React.useEffect(() => {
    if (cusDate && cusStartDate && cusEndDate) {
      const start = formatYMD(cusStartDate.toDate());
      const end   = formatYMD(cusEndDate.toDate());
  
      setStartDate(start);
      setEndDate(end);
      setButtonName(start + " ~ " + end);
      const tmp = (dateTrig + 1) % 100;
      setDateTrig(tmp);
  
      // reset local controls
      handleClose();
    }
  }, [cusDate, cusStartDate, cusEndDate]);

  return (
    <div>
      <Button
        id="date-selection-button"
        aria-controls={open ? 'date-selection-button' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
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
        {buttonName}
      </Button>
      <StyledMenu
        id="date-selection-button"
        slotProps={{
          list: {
            'aria-labelledby': 'date-selection-button',
            // any other MenuListProps go here
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={changeToday} sx={{ pl: '2rem' }} disableRipple>
          Today
        </MenuItem>
        <MenuItem onClick={changeYesterday} sx={{ pl: '2rem' }} disableRipple>
          Yesterday
        </MenuItem>
        <MenuItem onClick={changeLast7Days} sx={{ pl: '2rem' }} disableRipple>
          Last 7 Days
        </MenuItem>
        <MenuItem onClick={changeLast30Days} sx={{ pl: '2rem' }} disableRipple>
          Last 30 Days
        </MenuItem>
        <MenuItem onClick={changeThisMonth} sx={{ pl: '2rem' }} disableRipple>
          This Month
        </MenuItem>
        <MenuItem onClick={changeLastMonth} sx={{ pl: '2rem' }} disableRipple>
          Last Month
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem disableRipple>
          <BasicDateRangePicker start={cusStartDate} end={cusEndDate} cnt={cnt} setStart={setCusStartDate} setEnd={setCusEndDate} setDate={setCusDate} setCnt={setCnt} />
        </MenuItem>
      </StyledMenu>
    </div>
  );
}