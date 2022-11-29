import type { NextApiHandler } from "next";
import webPush from "web-push";

const vapid = {
  publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? "",
  privateKey: process.env.VAPID_PRIVATE_KEY ?? "",
};

const NotificationHandler: NextApiHandler = (req, res) => {
  if (!vapid.publicKey || !vapid.privateKey) {
    return res.status(500).json("You must set the VAPID keys");
  }

  webPush.setVapidDetails("https://kntitting.com", vapid.publicKey, vapid.privateKey);

  const { subscription, payload, ttl, delay } = req.body;

  setTimeout(() => {
    webPush
      .sendNotification(subscription, payload, {
        TTL: ttl,
      })
      .then(() => {
        res.status(201).end();
      })
      .catch((error) => {
        console.error(error);

        res.status(500);
        res.setHeader("Content-Type", "application/json");
        res.send(
          JSON.stringify({
            error: {
              id: "unable-to-send-messages",
              message:
                `We were unable to send messages to all subscriptions : ` + `'${error.message}'`,
            },
          }),
        );
      });
  }, delay * 1000);
};

export default NotificationHandler;
