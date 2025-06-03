import { useAuth0 } from '@auth0/auth0-react';
import { ArrowBack } from '@mui/icons-material';
import { Box, Button } from '@mui/material';

export function Auth0WithoutPermission() {
  const session = useAuth0();
  return (
    <Box className="flex flex-col items-center justify-center content-center w-full h-screen">
      <img src="/logo.svg" alt="Permissions" className="w-64 h-48" />

      <h2 className="text-xl font-bold text-[#12344A]">oops! Lo siento, no tienes acceso</h2>

      <p className="text-[#12344A] text-center mt-2 mb-2">
        La página a la que intentas acceder tiene acceso restringido.
        <br />
        Si eres un empleado de 99minutos por favor iniciar sesión con tu cuenta oficial.
      </p>

      <Button
        href="/"
        startIcon={<ArrowBack />}
        className="w-[128px] uppercase"
        onClick={() =>
          session.logout({
            logoutParams: { returnTo: window.location.origin },
          })
        }
      >
        Salir
      </Button>
    </Box>
  );
}
