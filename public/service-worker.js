self.addEventListener("push", (event) => {
  const payload = event.data?.text() ?? "no payload";

  event.waitUntil(
    self.registration.showNotification("Test notification", {
      body: payload,
    }),
  );
});
