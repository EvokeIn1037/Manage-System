import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import EditIcon from '@mui/icons-material/Edit';
// import Divider from '@mui/material/Divider';
// import ArchiveIcon from '@mui/icons-material/Archive';
// import FileCopyIcon from '@mui/icons-material/FileCopy';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface SearchColProps {
//   searchMode: number;
  setSearchMode: (item: number) => void;
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

export default function SearchColMenu({ setSearchMode }: SearchColProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [buttonName, setButtonName] = React.useState("Select Search");
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeSN = () => {
    setSearchMode(1);

    setButtonName("Serial Number");
    handleClose();
  };

  const changeON = () => {
    setSearchMode(2);
    
    setButtonName("Order Number");
    handleClose();
  };

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
          color: 'primary.contrastText',      // ensure text is readable
          '&:hover': {
            bgcolor: 'primary.dark',          // darker on hover
          },
          // width: "100%",
          height: "100%"
        }}
      >
        {buttonName}
      </Button>
      <StyledMenu
        id="date-selection-button"
        MenuListProps={{
          'aria-labelledby': 'date-selection-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={changeSN} disableRipple>
          Serial Number
        </MenuItem>
        <MenuItem onClick={changeON} disableRipple>
          Order Number
        </MenuItem>
      </StyledMenu>
    </div>
  );
}