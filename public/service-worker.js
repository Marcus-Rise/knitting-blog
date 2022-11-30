self.addEventListener("push", (event) => {
  const payload = event.data?.text() ?? "no payload";

  event.waitUntil(
    self.registration.showNotification("Test notification", {
      body: payload,
    }),
  );
});

self.addEventListener("install", (event) => {
  // The promise that skipWaiting() returns can be safely ignored.
  self.skipWaiting();

  // Perform any other actions required for your
  // service worker to install, potentially inside
  // of event.waitUntil();
});
