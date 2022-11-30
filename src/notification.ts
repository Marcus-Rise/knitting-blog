const urlBase64ToUint8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const isNotificationPermissionGranted = (): boolean => Notification.permission === "granted";

const requestPermission = async (): Promise<NotificationPermission> => {
  console.debug("request notify permission");

  return Notification.requestPermission();
};

const register = async (): Promise<PushSubscription> => {
  const registration = await navigator.serviceWorker.register("service-worker.js");

  const subscription = await registration.pushManager.getSubscription();

  if (subscription) {
    return subscription;
  }

  const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? "";

  const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

  return registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedVapidKey,
  });
};

const sendNotification = async (subscription: PushSubscription): Promise<void> => {
  await fetch("/api/notification", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      subscription,
      body: "Test",
      delay: 10,
      // ttl: 10,
    }),
  });
};

export { isNotificationPermissionGranted, requestPermission, register, sendNotification };
