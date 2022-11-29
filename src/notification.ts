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

const requestPermission = async (): Promise<void> => {
  if (Notification.permission !== "granted") {
    console.debug("request notify permission");

    await Notification.requestPermission();
  }
};

const register = async (): Promise<PushSubscription | void> => {
  if (Notification.permission === "granted") {
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
  }
};

const sendNotification = async (subscription: PushSubscription): Promise<void> => {
  if (Notification.permission === "granted") {
    await fetch("/api/notification", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        subscription,
        // delay: 10,
        // ttl: 10,
      }),
    });
  }
};

export { requestPermission, register, sendNotification };
