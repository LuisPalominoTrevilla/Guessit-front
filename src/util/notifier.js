import { NotificationManager } from 'react-notifications';

export default {

    createNotification(type, title, text, time = 3000) {
        switch (type) {
            case 'info':
                NotificationManager.info(text, title, time);
                break;
            case 'success':
                NotificationManager.success(text, title, time);
                break;
            case 'warning':
                NotificationManager.warning(text, title, time);
                break;
            case 'error':
                NotificationManager.error(text, title, time);
                break;
            default:
                return;
        }
    }
}