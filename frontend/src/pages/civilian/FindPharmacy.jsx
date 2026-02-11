import React, { useState, useEffect } from 'react';
import { MapPin, Search, Star, ShieldCheck, TrendingUp, Info } from 'lucide-react';
import PharmacyMap from "../../components/civilian/PharmacyMap";
import '../../styles/civilian/FindPharmacy.css';

const FindPharmacy = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [pharmacies, setPharmacies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('best-rated'); // best-rated, top-selling, closest

    useEffect(() => {
        // Mocking location for now or using browser API
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                    fetchPharmacies(latitude, longitude);
                },
                (error) => {
                    console.error("Location error", error);
                    // Default Colombo
                    const defaultLat = 6.9271;
                    const defaultLng = 79.8612;
                    setUserLocation({ lat: defaultLat, lng: defaultLng });
                    fetchPharmacies(defaultLat, defaultLng);
                }
            );
        } else {
            const defaultLat = 6.9271;
            const defaultLng = 79.8612;
            setUserLocation({ lat: defaultLat, lng: defaultLng });
            fetchPharmacies(defaultLat, defaultLng);
        }
    }, []);

    const fetchPharmacies = async (lat, lng) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8080/api/pharmacies/nearby?lat=${lat}&lng=${lng}&radius=50`); // Increased radius
            if (response.ok) {
                const data = await response.json();
                // Map backend data to frontend expected format
                const mappedPharmacies = data.map(p => ({
                    id: p.id,
                    name: p.name,
                    rating: 0.0, // Backend logic for rating is currently minimal
                    reviews: 0,
                    badge: p.status === 'ACTIVE' ? 'Open' : 'Closed',
                    lat: p.latitude,
                    lng: p.longitude,
                    distance: p.distance
                }));
                setPharmacies(mappedPharmacies);
            } else {
                console.error("Failed to fetch pharmacies");
                setPharmacies([]);
            }
        } catch (error) {
            console.error("Error fetching pharmacies", error);
            setPharmacies([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="find-pharmacy-page">
            {/* Header */}
            <header className="fp-header">
                <h1 className="fp-title">Find Your Pharmacy</h1>
                <div className="fp-location-controls">
                    <div style={{ position: 'relative' }}>
                        <input type="text" placeholder="Your Location" className="fp-location-input" defaultValue="Colombo, Sri Lanka" />
                        <MapPin size={16} style={{ position: 'absolute', right: 10, top: 10, color: '#94a3b8' }} />
                    </div>
                    <button className="fp-btn-blue">View Details</button>
                </div>
            </header>

            {/* Main Content Layout */}
            <div className="fp-content-grid">

                {/* Left: Map */}
                <div className="fp-map-container">
                    {loading ? (
                        <div className="fp-map-placeholder">Loading Map...</div>
                    ) : (
                        <PharmacyMap
                            userLocation={userLocation}
                            pharmacies={pharmacies}
                            onSelectPharmacy={() => { }}
                        />
                    )}
                </div>

                {/* Right: Sidebar */}
                <div className="fp-sidebar">

                    {/* Filter & Sort Card */}
                    <div className="fp-card">
                        <h2 className="fp-card-title">Filter & Sort</h2>

                        <div className="fp-filters">
                            <div className="fp-filter-row">
                                <label className="fp-radio-option">
                                    <input
                                        type="radio"
                                        name="sort"
                                        checked={filter === 'best-rated'}
                                        onChange={() => setFilter('best-rated')}
                                    />
                                    Best Rated
                                </label>
                                <label className="fp-radio-option">
                                    <input
                                        type="radio"
                                        name="sort"
                                        checked={filter === 'top-selling'}
                                        onChange={() => setFilter('top-selling')}
                                    />
                                    Top Selling
                                </label>
                                <div className="fp-toggle">
                                    <label>
                                        <input type="checkbox" defaultChecked />
                                        <span className="fp-slider"></span>
                                    </label>
                                </div>
                            </div>

                            <div className="fp-filter-row">
                                <label className="fp-radio-option">
                                    <input
                                        type="radio"
                                        name="sort"
                                        checked={filter === 'closest'}
                                        onChange={() => setFilter('closest')}
                                    />
                                    Closest to You
                                </label>
                                <label className="fp-radio-option" style={{ opacity: 0.5 }}>
                                    <input type="radio" name="sort" disabled />
                                    Currently Open
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Recommended Pharmacies Card */}
                    <div className="fp-card">
                        <h2 className="fp-card-title">Recommended Pharmacies</h2>

                        <div className="fp-pharmacy-list">
                            {/* Pharmacy Item 1 */}
                            <div className="fp-pharmacy-item">
                                <div className="fp-pi-left">
                                    <div className="fp-pi-icon">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div className="fp-pi-info">
                                        <h4>Citywide Pharmacy</h4>
                                        <div className="fp-pi-rating">
                                            4.9 <Star size={12} fill="#eab308" strokeWidth={0} /> (210 reviews)
                                        </div>
                                    </div>
                                </div>
                                <span className="fp-badge fp-badge-yellow">Top Selling</span>
                            </div>

                            {/* Pharmacy Item 2 */}
                            <div className="fp-pharmacy-item">
                                <div className="fp-pi-left">
                                    <div className="fp-pi-icon">
                                        <TrendingUp size={20} />
                                    </div>
                                    <div className="fp-pi-info">
                                        <h4>HealthPoint Dispensary</h4>
                                        <div className="fp-pi-rating">
                                            4.9 <Star size={12} fill="#eab308" strokeWidth={0} /> (210 reviews)
                                        </div>
                                    </div>
                                </div>
                                <span className="fp-badge fp-badge-red">Best Rated</span>
                            </div>

                            {/* Pharmacy Item 3 */}
                            <div className="fp-pharmacy-item">
                                <div className="fp-pi-left">
                                    <div className="fp-pi-icon">
                                        <Info size={20} />
                                    </div>
                                    <div className="fp-pi-info">
                                        <h4>HealthPoint Dispensary</h4>
                                        <div className="fp-pi-rating">
                                            4.9 <Star size={12} fill="#eab308" strokeWidth={0} /> (210 reviews)
                                        </div>
                                    </div>
                                </div>
                                <button className="fp-btn-details">View Details</button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FindPharmacy;
