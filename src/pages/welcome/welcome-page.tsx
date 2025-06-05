import { Box, TextField } from '@mui/material';

import WelcomeSection from '@/sections/welcome/welcome-section';

export default function WelcomePage() {
  return (
    <Box className="py-4">
      <div>
        <WelcomeSection />
      </div>

      <div>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </div>
    </Box>
  );
}
