import { Loader2 } from "lucide-react"; // or any spinner icon

export function Loader({ show }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sx">
      <Loader2 className="h-8 w-8 animate-spin text-white" />
    </div>
  );
}
