import * as admin from "firebase-admin";
import * as serviceAccount from "./serviceAccountKey.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: 'gs://mypet-d1ea5.appspot.com',
});

export const bucket = admin.storage().bucket();