import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { LucideIcon } from "lucide-react";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
}

export const ModuleCard = ({ title, description, icon: Icon, onClick }: ModuleCardProps) => {
  return (
    <Card className="group hover:shadow-quirona transition-quirona cursor-pointer border-2 hover:border-primary">
      <CardHeader>
        <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-quirona">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={onClick}
          className="w-full gradient-primary transition-quirona hover:opacity-90"
        >
          Comenzar módulo
        </Button>
      </CardContent>
    </Card>
  );
};
