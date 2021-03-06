const firebase = require("@firebase/testing");
const fs = require("fs");

const projectId = "cse405";
const firebasePort = 8080;

const rules = fs.readFileSync("firestore.rules", "utf-8");

describe("firebase rules test", () => {
    it("non-authenticated users can access nothing", async () => {
        const app = firebase.initializeTestApp({ projectId: projectId, auth: null });
        const db = app.firestore();
        const aliceRef = db.collection("users").doc("alice");
        await firebase.assertFails(aliceRef.get());
    })
    it("authenticated users can access nothing", async () => {
        const app = firebase.initializeTestApp({ projectId: projectId, auth: {uid: "alice"} });
        const db = app.firestore();
        const aliceRef = db.collection("users").doc("alice");
        await firebase.assertSucceeds(aliceRef.get());
    })
    it("authenticated users can not access other user docs", async () => {
        const app = firebase.initializeTestApp({ projectId: projectId, auth: {uid: "alice"} });
        const db = app.firestore();
        const bobRef = db.collection("users").doc("bob");
        await firebase.assertFails(bobRef.get());
    })
})
