import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Check, Filter } from 'lucide-react';
import { notificationService, type Notification, Role, NotificationType } from '@/services/notificationService';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function NotificationCenter() {
    const navigate = useNavigate();
    const [role] = useState<Role>(Role.ADMIN); // Hardcoded for now, should come from auth context
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [filterType, setFilterType] = useState<NotificationType | 'ALL'>('ALL');
    const [filterRead, setFilterRead] = useState<'ALL' | 'READ' | 'UNREAD'>('UNREAD');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadNotifications();
    }, [role]);

    const loadNotifications = async () => {
        try {
            const data = await notificationService.getNotifications(role);
            setNotifications(data);
        } catch (error) {
            console.error('Failed to load notifications', error);
        } finally {
            setLoading(false);
        }
    };

    const getFilteredNotifications = () => {
        return notifications.filter(n => {
            const typeMatch = filterType === 'ALL' || n.notificationType === filterType;
            const readMatch = filterRead === 'ALL' ||
                (filterRead === 'READ' && n.read) ||
                (filterRead === 'UNREAD' && !n.read);
            return typeMatch && readMatch;
        });
    };

    const typeCounts = {
        PHARMACY: notifications.filter(n => n.notificationType === NotificationType.PHARMACY && !n.read).length,
        ADMIN: notifications.filter(n => n.notificationType === NotificationType.ADMIN && !n.read).length,
        CIVILIAN: notifications.filter(n => n.notificationType === NotificationType.CIVILIAN && !n.read).length,
        SYSTEM: notifications.filter(n => n.notificationType === NotificationType.SYSTEM && !n.read).length,
    };

    const getTypeColor = (type: NotificationType) => {
        switch (type) {
            case NotificationType.SYSTEM: return 'bg-red-100 text-red-800 border-red-200'; // Critical
            case NotificationType.PHARMACY: return 'bg-blue-100 text-blue-800 border-blue-200';
            case NotificationType.CIVILIAN: return 'bg-green-100 text-green-800 border-green-200';
            case NotificationType.ADMIN: return 'bg-purple-100 text-purple-800 border-purple-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="container mx-auto p-6 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Notification Center</h1>
                    <p className="text-muted-foreground mt-2">Manage and track system events.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={loadNotifications}><Filter className="w-4 h-4 mr-2" /> Refresh</Button>
                </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[NotificationType.PHARMACY, NotificationType.ADMIN, NotificationType.CIVILIAN, NotificationType.SYSTEM].map((type) => (
                    <Card
                        key={type}
                        className={cn(
                            "cursor-pointer transition-all hover:shadow-md border-l-4",
                            filterType === type ? "ring-2 ring-primary" : "",
                            type === NotificationType.SYSTEM ? "border-l-red-500" :
                                type === NotificationType.PHARMACY ? "border-l-blue-500" :
                                    type === NotificationType.CIVILIAN ? "border-l-green-500" :
                                        "border-l-purple-500"
                        )}
                        onClick={() => setFilterType(filterType === type ? 'ALL' : type)}
                    >
                        <CardHeader className="py-4">
                            <CardDescription className="uppercase text-xs font-bold">{type}</CardDescription>
                            <CardTitle className="text-2xl">{typeCounts[type]}</CardTitle>
                        </CardHeader>
                    </Card>
                ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-12 gap-6">
                {/* Sidebar Filters */}
                <div className="col-span-12 md:col-span-3 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Filter Status</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-2">
                            <Button
                                variant={filterRead === 'UNREAD' ? 'default' : 'ghost'}
                                className="justify-start"
                                onClick={() => setFilterRead('UNREAD')}
                            >
                                <Bell className="w-4 h-4 mr-2" /> Unread
                            </Button>
                            <Button
                                variant={filterRead === 'READ' ? 'default' : 'ghost'}
                                className="justify-start"
                                onClick={() => setFilterRead('READ')}
                            >
                                <Check className="w-4 h-4 mr-2" /> Read
                            </Button>
                            <Button
                                variant={filterRead === 'ALL' ? 'default' : 'ghost'}
                                className="justify-start"
                                onClick={() => setFilterRead('ALL')}
                            >
                                All Notifications
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Notification List */}
                <div className="col-span-12 md:col-span-9">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>
                                Showing {getFilteredNotifications().length} notifications
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {loading ? (
                                    <div className="text-center py-8 text-muted-foreground">Loading notifications...</div>
                                ) : getFilteredNotifications().length === 0 ? (
                                    <div className="text-center py-8 text-muted-foreground">No notifications found.</div>
                                ) : (
                                    getFilteredNotifications().map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={cn(
                                                "flex items-start justify-between p-4 rounded-lg border transition-colors",
                                                notification.read ? "bg-background opacity-70" : "bg-accent/10 border-l-4 border-l-primary"
                                            )}
                                        >
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline" className={getTypeColor(notification.notificationType)}>
                                                        {notification.notificationType}
                                                    </Badge>
                                                    <span className="text-xs text-muted-foreground">
                                                        {formatDate(notification.createdAt)}
                                                    </span>
                                                </div>
                                                <h4 className={cn("font-medium", !notification.read && "text-foreground font-bold")}>
                                                    {notification.title}
                                                </h4>
                                                <p className="text-sm text-muted-foreground line-clamp-1">
                                                    {notification.message}
                                                </p>
                                            </div>
                                            <Button size="sm" onClick={() => navigate(`/notifications/${notification.id}`)}>
                                                View
                                            </Button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
