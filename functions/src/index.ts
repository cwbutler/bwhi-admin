import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// https://firebase.google.com/docs/functions/typescript

// Creating a pubsub function with name `scheduledNotifications`,
// memory `512MB` and schedule for 1 minute
exports.scheduledNotifications = functions.runWith({memory: "512MB"})
  .pubsub.schedule("* * * * *").onRun(async () => {
    // Current Timestamp
    const now = admin.firestore.Timestamp.now();
    // Notification tasks to send
    const tasks = await admin.firestore().collection("/notifications")
      .where("scheduledTime", "<=", now)
      .where("sent", "==", false)
      .where("cancel", "==", false)
      .get();
    // Jobs to execute
    const jobs: any = [];

    console.log("Num of notifications to send: ", tasks.docs.length);

    // Create jobss from task
    tasks.forEach(async (snapshot) => {
      const {body, title, data, type, imageUrl} = snapshot.data();
      console.log("Sending notification: ",
        {body, title, data, type, imageUrl});

      // using firebase-admin messaging function to send notification
      // to our subscribed topic i.e. `all` with required `data`/payload
      const job = await admin.messaging().send({
        notification: {title, body, imageUrl},
        topic: type,
        data,
      });

      if (job.length != 0) {
        console.log("Notification Sent");
        // updating firestore notification document's `sent` to true.
        admin.firestore().collection("/notifications")
          .doc(snapshot.id).update({"sent": true});
      }

      console.log(`Message sent:: ${job}`);
      jobs.push(job);
    });

    console.log("Jobs: ", tasks, jobs);
  });
