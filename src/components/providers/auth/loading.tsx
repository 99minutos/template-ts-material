import { Cached } from '@mui/icons-material';

export function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center content-center w-full h-screen">
      <img src="/logo.svg" alt="Permissions" className="w-auto h-16" />
      <Cached className="animate-spin text-primary" />
    </div>
  );
}
