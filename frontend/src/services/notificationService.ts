import axios from 'axios';

const API_URL = 'http://localhost:8080/api/notifications';

// Types defining the shape of our data
export enum Role {
    ADMIN = 'ADMIN',
    SUPER_ADMIN = 'SUPER_ADMIN'
}

export enum NotificationType {
    PHARMACY = 'PHARMACY',
    CIVILIAN = 'CIVILIAN',
    ADMIN = 'ADMIN',
    SYSTEM = 'SYSTEM'
}

export enum RelatedEntityType {
    PHARMACY = 'PHARMACY',
    CIVILIAN = 'CIVILIAN',
    MEDICINE = 'MEDICINE',
    ADMIN = 'ADMIN',
    NONE = 'NONE'
}

export interface Notification {
    id: number;
    userType: string | null;
    userId: number | null;
    notificationType: NotificationType;
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
    targetRole: Role;
    relatedEntityId: number | null;
    relatedEntityType: RelatedEntityType;
    readAt: string | null;
}

export const notificationService = {
    getNotifications: async (role: Role) => {
        const response = await axios.get<Notification[]>(API_URL, {
            params: { role }
        });
        return response.data;
    },

    getNotification: async (id: number) => {
        const response = await axios.get<Notification>(`${API_URL}/${id}`);
        return response.data;
    },

    markAsRead: async (id: number) => {
        await axios.put(`${API_URL}/${id}/read`);
    }
};
