import React, { useState, useEffect } from 'react';
import PharmacyMap from "../../components/civilian/PharmacyMap";
import PharmacyList from "../../components/civilian/PharmacyList";

const FindPharmacy = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [pharmacies, setPharmacies] = useState([]);
    const [selectedPharmacy, setSelectedPharmacy] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                    fetchPharmacies(latitude, longitude);
                },
                (error) => {
                    console.error("Error getting location", error);
                    // Default to Colombo
                    const defaultLat = 6.9271;
                    const defaultLng = 79.8612;
                    setUserLocation({ lat: defaultLat, lng: defaultLng });
                    fetchPharmacies(defaultLat, defaultLng);
                }
            );
        } else {
            // Fallback to Colombo if geolocation is not supported
            const defaultLat = 6.9271;
            const defaultLng = 79.8612;
            setUserLocation({ lat: defaultLat, lng: defaultLng });
            fetchPharmacies(defaultLat, defaultLng);
        }
    }, []);

    const fetchPharmacies = async (lat, lng) => {
        try {
            const response = await fetch(`http://localhost:8080/api/pharmacies/nearby?lat=${lat}&lng=${lng}&radius=15`);
            if (response.ok) {
                const data = await response.json();
                setPharmacies(data);
            }
        } catch (error) {
            console.error("Error fetching pharmacies", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full p-8 overflow-hidden">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Find Your Pharmacy</h1>
                <p className="text-gray-500 mt-1">Locate pharmacies near you and see recommendations.</p>
            </div>

            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* Left Section: Map */}
                <div className="flex-[2] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative z-0">
                    {loading ? (
                        <div className="flex items-center justify-center h-full text-gray-400">Loading map...</div>
                    ) : (
                        <PharmacyMap
                            userLocation={userLocation}
                            pharmacies={pharmacies}
                            onSelectPharmacy={setSelectedPharmacy}
                        />
                    )}
                </div>

                {/* Right Section: Recommended List */}
                <div className="flex-1 h-full overflow-hidden">
                    <PharmacyList
                        pharmacies={pharmacies}
                        onSelect={setSelectedPharmacy}
                    />
                </div>
            </div>
        </div>
    );
};

export default FindPharmacy;
