// Notification utility for browser notifications
export interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  requireInteraction?: boolean;
}

export class NotificationManager {
  private static instance: NotificationManager;
  private permission: NotificationPermission = 'default';

  private constructor() {}

  static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager();
    }
    return NotificationManager.instance;
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return 'denied';
    }

    if (this.permission === 'granted') {
      return 'granted';
    }

    this.permission = await Notification.requestPermission();
    return this.permission;
  }

  async showNotification(options: NotificationOptions): Promise<void> {
    if (this.permission !== 'granted') {
      const permission = await this.requestPermission();
      if (permission !== 'granted') {
        throw new Error('Notification permission denied');
      }
    }

    const notification = new Notification(options.title, {
      body: options.body,
      icon: options.icon || '/favicon.ico',
      badge: options.badge,
      tag: options.tag,
      requireInteraction: options.requireInteraction || false,
    });

    // Auto-close after 5 seconds if not requiring interaction
    if (!options.requireInteraction) {
      setTimeout(() => {
        notification.close();
      }, 5000);
    }

    return Promise.resolve();
  }

  async showEmergencyAlert(title: string, message: string, location?: string): Promise<void> {
    await this.showNotification({
      title,
      body: `${message}${location ? ` - Location: ${location}` : ''}`,
      icon: '/favicon.ico',
      tag: 'emergency',
      requireInteraction: true,
    });
  }

  async showWeatherAlert(severity: 'warning' | 'danger', message: string): Promise<void> {
    const title = severity === 'danger' ? '🚨 Severe Weather Alert' : '⚠️ Weather Warning';
    await this.showNotification({
      title,
      body: message,
      icon: '/favicon.ico',
      tag: 'weather',
      requireInteraction: severity === 'danger'
    });
  }

  async showResourceUpdate(message: string, type: string): Promise<void> {
    await this.showNotification({
      title: '📦 Resource Update',
      body: `${type}: ${message}`,
      icon: '/favicon.ico',
      tag: 'resource'
    });
  }

  async showSafetyTip(tip: string): Promise<void> {
    await this.showNotification({
      title: '🛡️ Safety Tip',
      body: tip,
      icon: '/favicon.ico',
      tag: 'safety'
    });
  }
}

// Export singleton instance
export const notificationManager = NotificationManager.getInstance();

// Demo function to show different types of notifications
export const demoNotifications = async () => {
  const manager = NotificationManager.getInstance();

  try {
    // Emergency alert demo
    await manager.showEmergencyAlert(
      '🚨 Flood Warning',
      'Heavy rainfall expected in your area. Please move to higher ground.',
      'Downtown Area'
    );

    // Weather alert demo
    setTimeout(async () => {
      await manager.showWeatherAlert(
        'warning',
        'Moderate flooding possible in low-lying areas. Stay alert.'
      );
    }, 2000);

    // Resource update demo
    setTimeout(async () => {
      await manager.showResourceUpdate(
        'New shelter opened at Community Center',
        'Shelter'
      );
    }, 4000);

    // Safety tip demo
    setTimeout(async () => {
      await manager.showSafetyTip(
        'Keep emergency supplies ready including water, food, and first aid kit.'
      );
    }, 6000);

  } catch (error) {
    console.error('Error showing demo notifications:', error);
  }
};
