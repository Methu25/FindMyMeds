import { useState, useEffect } from 'react'
import Layout from '../../components/pharmacy/Layout'

export default function SystemSettings() {
    const [settings, setSettings] = useState({
        notificationsEnabled: true,
        inventoryAlerts: true,
        expiryAlerts: true,
        systemMessages: true,
        theme: 'Light',
        defaultHomepage: 'Dashboard'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/pharmacy/settings');
                if (response.ok) {
                    const data = await response.json();
                    setSettings(data);
                }
            } catch (error) {
                console.error('Failed to fetch settings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/pharmacy/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });
            if (response.ok) {
                alert('Settings saved successfully');
            }
        } catch (error) {
            alert('Failed to save settings');
        }
    };

    if (loading) return <Layout title="System Settings"><div className="p-8">Loading...</div></Layout>;

    return (
        <Layout title="System Settings">
            <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-sm border">
                    <h3 className="text-xl font-semibold mb-6">Notification Settings</h3>
                    {[
                        { label: 'New Reservations', key: 'notificationsEnabled' },
                        { label: 'Inventory Alerts', key: 'inventoryAlerts' },
                        { label: 'Expiry Alerts', key: 'expiryAlerts' },
                        { label: 'System Messages', key: 'systemMessages' }
                    ].map(({ label, key }) => (
                        <label key={key} className="flex items-center justify-between py-4">
                            <span>{label}</span>
                            <input
                                type="checkbox"
                                checked={settings[key]}
                                onChange={(e) => setSettings({ ...settings, [key]: e.target.checked })}
                                className="w-6 h-6 text-primary rounded"
                            />
                        </label>
                    ))}
                    <button onClick={handleSave} className="mt-8 w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition">Save</button>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-sm border">
                    <h3 className="text-xl font-semibold mb-6">Display Preferences</h3>
                    <div className="space-y-6">
                        <div>
                            <label className="block mb-2">Theme</label>
                            <select
                                className="w-full border rounded-lg px-5 py-3"
                                value={settings.theme}
                                onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                            >
                                <option value="Light">Light</option>
                                <option value="Dark">Dark</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2">Default Homepage</label>
                            <select
                                className="w-full border rounded-lg px-5 py-3"
                                value={settings.defaultHomepage}
                                onChange={(e) => setSettings({ ...settings, defaultHomepage: e.target.value })}
                            >
                                <option value="Dashboard">Dashboard</option>
                                <option value="Reservations">Reservations</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={handleSave} className="mt-8 w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition">Save</button>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-sm border">
                    <h3 className="text-xl font-semibold mb-6">Data & Privacy</h3>
                    <button className="w-full bg-primary text-white py-3 rounded-lg mb-4">Export History</button>
                    <button className="w-full border border-red-500 text-red-600 py-3 rounded-lg">Clear Notifications</button>
                </div>
            </div>
        </Layout>
    )
}
