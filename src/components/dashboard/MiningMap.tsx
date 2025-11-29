import { MapPin, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function MiningMap() {
  return (
    <div className="relative h-full min-h-[300px] bg-gradient-to-br from-blue-200 via-green-100 to-yellow-100 rounded-lg overflow-hidden">
      {/* Map markers */}
      <div className="absolute top-[20%] left-[15%]">
        <MapPin className="w-6 h-6 text-destructive fill-destructive animate-pulse" />
      </div>
      <div className="absolute top-[35%] left-[25%]">
        <MapPin className="w-6 h-6 text-destructive fill-destructive animate-pulse" />
      </div>
      <div className="absolute top-[45%] right-[30%]">
        <MapPin className="w-6 h-6 text-destructive fill-destructive animate-pulse" />
      </div>
      <div className="absolute bottom-[25%] left-[40%]">
        <MapPin className="w-6 h-6 text-destructive fill-destructive animate-pulse" />
      </div>

      {/* Info badges */}
      <div className="absolute top-4 right-4">
        <Badge className="bg-accent text-accent-foreground">
          <Navigation className="w-3 h-3 mr-1" />
          Internet User
        </Badge>
      </div>
      
      <div className="absolute bottom-4 right-4 bg-secondary/80 backdrop-blur-sm px-4 py-2 rounded-lg">
        <p className="text-xs text-muted-foreground">Total Read Columns</p>
      </div>

      <div className="absolute bottom-4 left-4 bg-destructive/80 backdrop-blur-sm px-4 py-2 rounded-lg">
        <p className="text-xs text-destructive-foreground font-semibold">Asia order</p>
      </div>
    </div>
  );
}
