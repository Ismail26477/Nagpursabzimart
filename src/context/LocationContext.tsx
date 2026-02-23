import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface LocationData {
  lat: number;
  lng: number;
  address: string;
  area: string;
  city: string;
  isWithinRadius: boolean;
}

interface LocationContextType {
  location: LocationData;
  isLoading: boolean;
  error: string | null;
  fetchCurrentLocation: () => void;
  setManualAddress: (address: string, area: string) => void;
  isLocationPickerOpen: boolean;
  setLocationPickerOpen: (open: boolean) => void;
}

// Wadi, Nagpur center coordinates
const STORE_CENTER = { lat: 21.1167, lng: 79.0500 };
const DELIVERY_RADIUS_KM = 5;

const DEFAULT_LOCATION: LocationData = {
  lat: STORE_CENTER.lat,
  lng: STORE_CENTER.lng,
  address: "Wadi, Nagpur, Maharashtra",
  area: "Wadi",
  city: "Nagpur",
  isWithinRadius: true,
};

const STORAGE_KEY = "veggy-location";

function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function checkRadius(lat: number, lng: number): boolean {
  return getDistance(lat, lng, STORE_CENTER.lat, STORE_CENTER.lng) <= DELIVERY_RADIUS_KM;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<LocationData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_LOCATION;
    } catch {
      return DEFAULT_LOCATION;
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLocationPickerOpen, setLocationPickerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(location));
  }, [location]);

  const fetchCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const withinRadius = checkRadius(latitude, longitude);

        // Reverse geocode using free API
        let addressResolved = false;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
            { headers: { "Accept-Language": "en" } }
          );
          if (res.ok) {
            const data = await res.json();
            const addr = data.address || {};
            const area = addr.suburb || addr.neighbourhood || addr.village || addr.town || addr.county || "Unknown Area";
            const city = addr.city || addr.state_district || addr.state || "Nagpur";
            const road = addr.road || "";
            const fullAddress = road
              ? `${road}, ${area}, ${city}, ${addr.state || "Maharashtra"}`
              : `${area}, ${city}, ${addr.state || "Maharashtra"}`;

            setLocation({
              lat: latitude,
              lng: longitude,
              address: fullAddress,
              area,
              city,
              isWithinRadius: withinRadius,
            });
            addressResolved = true;
          }
        } catch {
          // Reverse geocoding failed
        }
        if (!addressResolved) {
          // Fallback: use a readable default instead of coordinates
          const nearestArea = withinRadius ? "Wadi" : "Current Location";
          setLocation({
            lat: latitude,
            lng: longitude,
            address: withinRadius ? "Wadi, Nagpur, Maharashtra" : `Near ${latitude.toFixed(4)}°N, ${longitude.toFixed(4)}°E, Nagpur`,
            area: nearestArea,
            city: "Nagpur",
            isWithinRadius: withinRadius,
          });
        }
        setIsLoading(false);
        setLocationPickerOpen(false);
      },
      (err) => {
        setError(
          err.code === 1
            ? "Location permission denied. Please enable location access."
            : "Unable to fetch location. Try again."
        );
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const setManualAddress = useCallback((address: string, area: string) => {
    setLocation({
      lat: STORE_CENTER.lat,
      lng: STORE_CENTER.lng,
      address,
      area,
      city: "Nagpur",
      isWithinRadius: true, // Manual addresses assumed within range for Wadi/Nagpur
    });
    setLocationPickerOpen(false);
  }, []);

  return (
    <LocationContext.Provider
      value={{ location, isLoading, error, fetchCurrentLocation, setManualAddress, isLocationPickerOpen, setLocationPickerOpen }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocation must be used within LocationProvider");
  return ctx;
};
