import { InputBase, styled } from '@mui/material';

const BootstrapInput = styled(InputBase)(() => ({
  '& .MuiInputBase-input': {
    minWidth: '42px !important',
    padding: '10px 26px 10px 12px',
  },
}));

export default BootstrapInput;
