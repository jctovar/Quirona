import { Flower2 } from "lucide-react";

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center shadow-quirona">
        <Flower2 className="w-6 h-6 text-white" />
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        QUIRONA
      </span>
    </div>
  );
};
