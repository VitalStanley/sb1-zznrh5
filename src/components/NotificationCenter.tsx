import React from 'react';
import { Bell, X, AlertTriangle, TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface Notification {
  id: string;
  type: 'signal' | 'alert' | 'indicator';
  title: string;
  message: string;
  timestamp: Date;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
}

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = React.useState(0);

  React.useEffect(() => {
    // Simuler les notifications entrantes
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: ['signal', 'alert', 'indicator'][Math.floor(Math.random() * 3)] as Notification['type'],
          title: 'Nouveau Signal Détecté',
          message: 'Le RSI de BTC/USD entre en zone de surachat (>70)',
          timestamp: new Date(),
          priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as Notification['priority'],
          read: false
        };

        setNotifications(prev => [newNotification, ...prev].slice(0, 50));
        setUnreadCount(prev => prev + 1);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    setUnreadCount(0);
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => {
      const notif = prev.find(n => n.id === id);
      if (notif && !notif.read) {
        setUnreadCount(count => count - 1);
      }
      return prev.filter(n => n.id !== id);
    });
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'signal':
        return <TrendingUp className="h-5 w-5" />;
      case 'alert':
        return <AlertTriangle className="h-5 w-5" />;
      case 'indicator':
        return <Activity className="h-5 w-5" />;
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(true)}
        className="relative bg-slate-800 hover:bg-slate-700 rounded-full p-3 shadow-lg transition-colors"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm">
          <div className="fixed top-4 right-4 w-full max-w-md bg-slate-800 rounded-xl shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h2 className="text-lg font-bold">Notifications</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-slate-400 hover:text-slate-300"
                >
                  Tout marquer comme lu
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-slate-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="max-h-[80vh] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-slate-400">
                  <Bell className="h-8 w-8 mx-auto mb-3" />
                  <p>Aucune notification</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-700">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-slate-700/50 transition-colors ${
                        !notification.read ? 'bg-slate-700/25' : ''
                      }`}
                    >
                      <div className="flex items-start">
                        <div className={`p-2 rounded-lg mr-3 ${
                          notification.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                          notification.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{notification.title}</h3>
                          <p className="text-sm text-slate-400 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-slate-500">
                              {notification.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-slate-400 hover:text-slate-300 p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}