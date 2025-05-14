import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { GridRowsProp } from '@mui/x-data-grid';

interface SearchProps {
  searchMode: number;
  rows: GridRowsProp;
  rowsShown: GridRowsProp;
  setRowsShown: React.Dispatch<React.SetStateAction<GridRowsProp>>;
}

export default function Search({ searchMode, rows, rowsShown, setRowsShown }: SearchProps) {
  const [placeHolderContent, setPlaceHolderContent] = React.useState("Search…");
  const [nowMode, setNowMode] = React.useState(0);

  React.useEffect(() => {
    if (searchMode != nowMode) {
      switch(searchMode) {
        case 1:
          setPlaceHolderContent("Search Serial Number");
          break;
        case 2:
          setPlaceHolderContent("Search Order Number");
          break;
      };
      setNowMode(searchMode);
    }
  });
  
  return (
    <FormControl sx={{ width: { xs: '100%', md: '100%' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder={placeHolderContent}
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}
