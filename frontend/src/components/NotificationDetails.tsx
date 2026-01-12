import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import { notificationService, type Notification, NotificationType } from '@/services/notificationService';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function NotificationDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [notification, setNotification] = useState<Notification | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            loadNotification(parseInt(id));
        }
    }, [id]);

    const loadNotification = async (notificationId: number) => {
        try {
            const data = await notificationService.getNotification(notificationId);
            setNotification(data);
        } catch (error) {
            console.error('Failed to load notification', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async () => {
        if (notification && !notification.read) {
            try {
                await notificationService.markAsRead(notification.id);
                // Refresh local state
                setNotification({ ...notification, read: true, readAt: new Date().toISOString() });
            } catch (error) {
                console.error('Failed to mark as read', error);
            }
        }
    };

    const getTypeColor = (type: NotificationType) => {
        switch (type) {
            case NotificationType.SYSTEM: return 'bg-red-100 text-red-800 border-red-200';
            case NotificationType.PHARMACY: return 'bg-blue-100 text-blue-800 border-blue-200';
            case NotificationType.CIVILIAN: return 'bg-green-100 text-green-800 border-green-200';
            case NotificationType.ADMIN: return 'bg-purple-100 text-purple-800 border-purple-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!notification) return <div className="p-8 text-center text-red-500">Notification not found</div>;

    return (
        <div className="container mx-auto p-6 max-w-3xl">
            <Button variant="ghost" className="mb-6" onClick={() => navigate('/notifications')}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Notifications
            </Button>

            <Card className="border-t-4 border-t-primary shadow-lg">
                <CardHeader className="space-y-4">
                    <div className="flex items-start justify-between">
                        <Badge variant="outline" className={cn("px-3 py-1 text-sm", getTypeColor(notification.notificationType))}>
                            {notification.notificationType}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="w-4 h-4 mr-1" />
                            {new Date(notification.createdAt).toLocaleString()}
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-bold text-foreground">{notification.title}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="bg-muted/30 p-6 rounded-lg border">
                        <p className="text-lg leading-relaxed whitespace-pre-wrap">{notification.message}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                        <div>
                            <span className="font-semibold text-muted-foreground block">Related Entity Type</span>
                            <span>{notification.relatedEntityType}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-muted-foreground block">Related Entity ID</span>
                            <span>{notification.relatedEntityId || 'N/A'}</span>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between bg-muted/20 p-6">
                    <div className="flex items-center">
                        {notification.read ? (
                            <div className="flex items-center text-green-600 font-medium">
                                <CheckCircle className="w-5 h-5 mr-2" />
                                Read on {new Date(notification.readAt!).toLocaleString()}
                            </div>
                        ) : (
                            <span className="text-amber-600 font-medium flex items-center">
                                <div className="w-2 h-2 rounded-full bg-amber-600 mr-2 animate-pulse" />
                                Unread
                            </span>
                        )}
                    </div>

                    {!notification.read && (
                        <Button onClick={handleMarkAsRead} size="lg">
                            Mark as Read
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
