import React, { useState } from "react";
import { MapPin, Navigation, X, ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "@/context/LocationContext";

const SAVED_ADDRESSES = [
  { label: "Home", area: "Wadi", address: "Wadi, Nagpur, Maharashtra" },
  { label: "Office", area: "Manewada", address: "Manewada Road, Nagpur, Maharashtra" },
];

const NEARBY_AREAS = [
  "Wadi", "Manewada", "Besa", "Pipla", "Hudkeshwar",
  "Sonegaon", "Kharbi", "Nandanvan", "Tarodi", "Borgaon",
];

const LocationPicker: React.FC = () => {
  const { location, isLoading, error, fetchCurrentLocation, setManualAddress, isLocationPickerOpen, setLocationPickerOpen } = useLocation();
  const [manualInput, setManualInput] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = (value: string) => {
    setManualInput(value);
    if (value.length > 1) {
      setSearchResults(
        NEARBY_AREAS.filter((a) => a.toLowerCase().includes(value.toLowerCase()))
      );
    } else {
      setSearchResults([]);
    }
  };

  const selectArea = (area: string) => {
    setManualAddress(`${area}, Nagpur, Maharashtra`, area);
    setManualInput("");
    setSearchResults([]);
  };

  const handleManualSubmit = () => {
    if (manualInput.trim()) {
      setManualAddress(`${manualInput.trim()}, Nagpur, Maharashtra`, manualInput.trim());
      setManualInput("");
      setSearchResults([]);
    }
  };

  return (
    <Sheet open={isLocationPickerOpen} onOpenChange={setLocationPickerOpen}>
      <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto">
        <SheetHeader className="pb-2">
          <SheetTitle className="text-base font-bold text-foreground">Choose Delivery Location</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 mt-2">
          {/* GPS Button */}
          <Button
            onClick={fetchCurrentLocation}
            disabled={isLoading}
            variant="outline"
            className="w-full justify-start gap-3 h-12 border-primary/30 text-primary"
          >
            <Navigation size={18} className={isLoading ? "animate-spin" : ""} />
            <div className="text-left">
              <p className="text-sm font-semibold">{isLoading ? "Detecting location..." : "Use Current Location"}</p>
              <p className="text-[10px] text-muted-foreground">Via GPS</p>
            </div>
          </Button>

          {error && (
            <p className="text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</p>
          )}

          {!location.isWithinRadius && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
              <p className="text-xs text-amber-800 font-medium">⚠️ You're outside our 5km delivery radius from Wadi, Nagpur.</p>
              <p className="text-[10px] text-amber-600 mt-0.5">Delivery might not be available at this location.</p>
            </div>
          )}

          {/* Manual Search */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1.5">SEARCH MANUALLY</p>
            <div className="flex gap-2">
              <Input
                value={manualInput}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Enter area, locality..."
                className="text-sm"
                onKeyDown={(e) => e.key === "Enter" && handleManualSubmit()}
              />
              {manualInput && (
                <Button size="sm" onClick={handleManualSubmit} className="shrink-0">
                  Add
                </Button>
              )}
            </div>

            {searchResults.length > 0 && (
              <div className="mt-2 border rounded-xl overflow-hidden">
                {searchResults.map((area) => (
                  <button
                    key={area}
                    onClick={() => selectArea(area)}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm hover:bg-muted transition-colors border-b last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-muted-foreground" />
                      <span>{area}, Nagpur</span>
                    </div>
                    <ChevronRight size={14} className="text-muted-foreground" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Saved Addresses */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1.5">SAVED ADDRESSES</p>
            <div className="space-y-2">
              {SAVED_ADDRESSES.map((addr) => (
                <button
                  key={addr.label}
                  onClick={() => setManualAddress(addr.address, addr.area)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-colors ${
                    location.address === addr.address ? "border-primary bg-primary/5" : "hover:bg-muted"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin size={14} className="text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold">{addr.label}</p>
                    <p className="text-[10px] text-muted-foreground">{addr.address}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Nearby Areas */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1.5">NEARBY AREAS (WADI, NAGPUR)</p>
            <div className="flex flex-wrap gap-2">
              {NEARBY_AREAS.map((area) => (
                <button
                  key={area}
                  onClick={() => selectArea(area)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    location.area === area ? "bg-primary text-primary-foreground border-primary" : "bg-muted hover:bg-muted/80 border-border"
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default LocationPicker;
