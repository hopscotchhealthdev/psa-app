import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
const firebase = admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });



exports.deleteVideos = functions.firestore.document(`/users/{userId}/videos/{videoId}`).onDelete((snapshot, context) => {
	  const data :any = snapshot.data();
		console.log(data);
		const bucket = firebase.storage().bucket();
		if(data.videoId){
			bucket.file(`videos/${data.videoId}`).delete().then((success) => {
				deleteOutputFile();
			}).catch((err) => {
				deleteOutputFile();
			});
		}
		function deleteOutputFile() {
			if(data.outputVideoId){
				bucket.file(`videos/output/${data.outputVideoId}`).delete().then((success) => {
				return;
				}).catch((err) => {
					return;				
				});

			}
    }
})