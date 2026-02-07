import { DateTime } from 'luxon';

/**
 * Checks if the current time is within the allowed sending window.
 * Window: 07:00 - 23:00 US Central Time (America/Chicago).
 */
export function isWithinSendingWindow(): boolean {
    const now = DateTime.now().setZone('America/Chicago');
    const hour = now.hour;

    // 7 AM to 11 PM (inclusive of 22:59)
    return hour >= 7 && hour < 23;
}

export function getCurrentCentralTime(): string {
    return DateTime.now().setZone('America/Chicago').toISO() || '';
}
