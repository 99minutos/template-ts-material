import { ArrowBack } from '@mui/icons-material';
import { Box, Button } from '@mui/material';

export default function Page404() {
  return (
    <Box className="flex flex-1 h-full w-full justify-center items-center flex-col space-y-4">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl text-gray-600">El sitio que busca no existe o no está disponible.</h2>
      <Button href="/" startIcon={<ArrowBack />}>
        Regresar
      </Button>
    </Box>
  );
}
