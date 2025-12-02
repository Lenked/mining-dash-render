import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  RefreshCw, 
  Car, 
  Bike, 
  Settings, 
  Trash2, 
  Cloud, 
  Wifi, 
  User, 
  AlertCircle, 
  Bell 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Vehicle {
  id: string;
  name: string;
  status: "moving" | "offline" | "stopped";
  lastUpdate: string;
}

const mockVehicles: Vehicle[] = [
  { id: "LTMT001", name: "LTMT...", status: "moving", lastUpdate: "in an h..." },
  { id: "LTMT002", name: "LTMT...", status: "offline", lastUpdate: "in an h..." },
  { id: "LTMT003", name: "LTMT...", status: "stopped", lastUpdate: "in an h..." },
  { id: "P43782", name: "P43782", status: "moving", lastUpdate: "a few s..." },
  { id: "CH001", name: "CH 0...", status: "offline", lastUpdate: "a few s..." },
];

export const VehicleList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVehicles, setSelectedVehicles] = useState<Set<string>>(new Set());

  const filteredVehicles = mockVehicles.filter(vehicle =>
    vehicle.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleVehicle = (id: string) => {
    const newSelected = new Set(selectedVehicles);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedVehicles(newSelected);
  };

  return (
    <div className="h-full flex flex-col bg-card border-r">
      {/* Search Bar */}
      <div className="p-4 border-b bg-background/50">
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button size="icon" variant="outline">
            <RefreshCw className="h-4 w-4 text-white" />
          </Button>
          <Button size="icon" variant="outline">
            <Bike className="h-4 w-4 text-white" />
          </Button>
          <Button size="icon" variant="outline">
            <Car className="h-4 w-4 text-white" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Checkbox id="all-vehicles" />
          <label htmlFor="all-vehicles" className="cursor-pointer">
            Vos véhicules
          </label>
          <Button size="icon" variant="ghost" className="ml-auto h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Vehicle List */}
      <div className="flex-1 overflow-y-auto">
        {filteredVehicles.map((vehicle) => (
          <Card
            key={vehicle.id}
            className={cn(
              "m-2 p-3 cursor-pointer transition-all hover:shadow-md",
              selectedVehicles.has(vehicle.id) && "ring-2 ring-primary"
            )}
            onClick={() => toggleVehicle(vehicle.id)}
          >
            <div className="flex items-center gap-2 mb-2">
              <Checkbox 
                checked={selectedVehicles.has(vehicle.id)}
                onClick={(e) => e.stopPropagation()}
              />
              <span className="font-medium">{vehicle.name}</span>
              <span className="text-xs text-muted-foreground ml-auto">
                {vehicle.lastUpdate}
              </span>
            </div>
            
            <div className="flex items-center gap-1 ml-6">
              <Button size="icon" variant="ghost" className="h-6 w-6">
                <Settings className="h-3 w-3" />
              </Button>
              <Button size="icon" variant="ghost" className="h-6 w-6">
                <Trash2 className="h-3 w-3" />
              </Button>
              <Button size="icon" variant="ghost" className="h-6 w-6">
                <Settings className="h-3 w-3" />
              </Button>
              <Button size="icon" variant="ghost" className="h-6 w-6">
                <Cloud className="h-3 w-3" />
              </Button>
              <Button size="icon" variant="ghost" className="h-6 w-6">
                <Wifi className="h-3 w-3" />
              </Button>
              <Button size="icon" variant="ghost" className="h-6 w-6">
                <User className="h-3 w-3" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className={cn(
                  "h-6 w-6",
                  vehicle.status === "offline" && "text-destructive"
                )}
              >
                <AlertCircle className="h-3 w-3" />
              </Button>
              <Button size="icon" variant="ghost" className="h-6 w-6 text-success">
                <Bell className="h-3 w-3" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
