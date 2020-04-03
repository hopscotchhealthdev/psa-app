import { db } from "../services/firebase";

export function readUserData(uid) {
  let res = [];

  db.collection("users")
    .doc(uid)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });

  return res;
}

export function getUserVideos(uid) {
  return db
    .collection("users")
    .doc(uid)
    .collection("videos");
}

export function getVideo(uid, videoId) {
  return db
    .collection("users")
    .doc(uid)
    .collection("videos")
    .doc(videoId)
}