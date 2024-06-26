import axios from 'axios';
import alerts from '@data/alerts/alerts';
import alert_single from '@data/alerts/alert_single';

export async function getNotifications(){
    return alerts
}
export async function getSingleNotification(id){
    return alert_single.find(alert => alert.id === id);
}