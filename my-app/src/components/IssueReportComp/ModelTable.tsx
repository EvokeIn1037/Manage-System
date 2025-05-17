import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
    Box,
    Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface ModelTableProps {
    model: number;
    setModel: (item: number) => void;
    edit: boolean;
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

export default function ModelTable({ model, setModel, edit }: ModelTableProps) {
    const [isRead, setIsRead] = React.useState(!edit);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [buttonName, setButtonName] = React.useState("Model Selection");
    const [nameChanged, setNameChanged] = React.useState(false);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setNameChanged(true);
        setAnchorEl(null);
    };

    React.useEffect(() => {
        if (isRead === edit) setIsRead(!edit);
    })

    React.useEffect(() => {
        if (model != -1 && !nameChanged) {
            switch(model) {
                case 0:
                    setButtonName("SE Blue");
                    break;
                case 1:
                    setButtonName("SE White");
                    break;
                case 100:
                    setButtonName("SE Plus");
                    break;
            }
        }
    })

    const changeSEBlue = () => {
        setButtonName("SE Blue");
        setModel(0);
        handleClose();
    };
    const changeSEWhite = () => {
        setButtonName("SE White");
        setModel(1);
        handleClose();
    };
    const changeSEPlus = () => {
        setButtonName("SE Plus");
        setModel(100);
        handleClose();
    };

    return (
        <>
        <Box 
            sx={{ 
                display:      'flex',       // make it a flex container
                flexWrap:     'wrap',       // allow items to wrap onto new lines
                alignItems:   'center',     // vertical alignment within each row
            }}
        >
            <Typography variant='body1' sx={{ mr: 2 }}><strong>Model</strong></Typography>
            <Button
                id="model-selection-button"
                aria-controls={open ? 'model-selection-button' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                    bgcolor: 'background.default',
                    backgroundImage: 'none',
                    borderColor: 'primary.main',
                    boxShadow: theme => `0px 2px 6px ${theme.palette.grey[500]}`,
                    color: isRead ? 'text.disabled' : 'text.primary',      // ensure text is readable
                    '&:hover': {
                        bgcolor: 'primary.dark',          // darker on hover
                        backgroundImage: 'none',
                    },
                    // width: "100%",
                    height: "100%",
                    pointerEvents: isRead ? 'none' : 'auto',
                    caretColor: isRead ? 'transparent' : undefined,
                }}
            >
                {buttonName}
            </Button>
            <StyledMenu
                id="model-selection-button"
                slotProps={{
                    list: {
                        'aria-labelledby': 'model-selection-button',
                        // any other MenuListProps go here
                    },
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={changeSEBlue} sx={{ pl: '2rem' }} disableRipple>
                    Se Blue
                </MenuItem>
                <MenuItem onClick={changeSEWhite} sx={{ pl: '2rem' }} disableRipple>
                    SE White
                </MenuItem>
                <MenuItem onClick={changeSEPlus} sx={{ pl: '2rem' }} disableRipple>
                    SE Plus
                </MenuItem>
            </StyledMenu>
        </Box>
        </>
    );
}
