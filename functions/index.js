const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const Busboy = require('busboy');
const fs = require("fs");
const path = require("path");
const os = require("os");

// const gcconfig = {
//   projectId: "portfoliomate-e14a8",
//   keyFilename: "portfoliomate-e14a8-firebase-adminsdk-qzwvt-05bb51dcde.json"
// };

// const gcs = require("@google-cloud/storage")(gcconfig);

admin.initializeApp();
const gcs = admin.storage();

exports.createStakeHolder = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Headers", "Content-Type");
  const package = request.body;
  admin
    .firestore()
    .collection("Stake Holder")
    .doc(package.id).set(package)
    .then(() => {
      response.json(package);
    })
    .catch((error) => {
      response.status(500).json({
        error: error.code,
      });
    });
});

exports.updateStakeHolder = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Headers", "Content-Type");
  const package = request.body;
  admin
    .firestore()
    .collection("Stake Holder")
    .doc(package.id).update(package)
    .then(() => {
      response.json(package);
    })
    .catch((error) => {
      response.status(500).json({
        error: error.code,
      });
    });
});

exports.getStakeHolders = functions.https
  .onRequest((request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    const stakeHolder = request.body;
    var toBeReturned = [];
    if (stakeHolder.id) {
      admin
        .firestore()
        .collection("Stake Holder")
        .where("id", "==", stakeHolder.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const order = doc.data();
            toBeReturned.push(order);
          });
          response.json(toBeReturned);
        })
        .catch((error) => {
          response.status(500).json({
            error: error.code,
          });
        });
    }
    else if (stakeHolder.type) {
      admin
        .firestore()
        .collection("Stake Holder")
        .where("type", "==", stakeHolder.type)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const order = doc.data();
            toBeReturned.push(order);
          });
          response.json(toBeReturned);
        })
        .catch((error) => {
          response.status(500).json({
            error: error.code,
          });
        });
    }
    else {
      admin
        .firestore()
        .collection("Stake Holder")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const order = doc.data();
            toBeReturned.push(order);
          });
          response.json(toBeReturned);
        })
        .catch((error) => {
          response.status(500).json({
            error: error.code,
          });
        });
    }
  });

exports.startEngagement = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Headers", "Content-Type");
  const package = request.body;
  admin
    .firestore()
    .collection("Engagement")
    .doc(package.id).set(package)
    .then(() => {
      response.json(package);
    })
    .catch((error) => {
      response.status(500).json({
        error: error.code,
      });
    });
});

exports.updateEngagement = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Headers", "Content-Type");
  const package = request.body;
  admin
    .firestore()
    .collection("Engagement")
    .doc(package.id).update(package)
    .then(() => {
      response.json(package);
    })
    .catch((error) => {
      response.status(500).json({
        error: error.code,
      });
    });
});

exports.getEngagementByStakeHolders = functions.https
  .onRequest((request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    const stakeHolder = request.body;
    admin
      .firestore()
      .collection("Engagement")
      .where("stakeHolderFrom", "==", stakeHolder.stakeHolderFrom)
      .where("stakeHolderFor", "==", stakeHolder.stakeHolderFor)
      .get()
      .then((querySnapshot) => {
        const orders = [];
        querySnapshot.forEach((doc) => {
          const order = doc.data();
          orders.push(order);
        });
        response.json(orders);
      })
      .catch((error) => {
        response.status(500).json({
          error: error.code,
        });
      });
  });

exports.getEngagementById = functions.https
  .onRequest((request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    const stakeHolder = request.body;
    admin
      .firestore()
      .collection("Engagement")
      .where("id", "==", stakeHolder.id)
      .get()
      .then((querySnapshot) => {
        const orders = [];
        querySnapshot.forEach((doc) => {
          const order = doc.data();
          orders.push(order);
        });
        response.json(orders);
      })
      .catch((error) => {
        response.status(500).json({
          error: error.code,
        });
      });
  });

exports.getEngagementByType = functions.https
  .onRequest((request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    const stakeHolder = request.body;
    admin
      .firestore()
      .collection("Engagement")
      .where("type", "==", stakeHolder.type)
      .get()
      .then((querySnapshot) => {
        const orders = [];
        querySnapshot.forEach((doc) => {
          const order = doc.data();
          orders.push(order);
        });
        response.json(orders);
      })
      .catch((error) => {
        response.status(500).json({
          error: error.code,
        });
      });
  });

//   var object={
//     type="",
//     id="",
//     enagement_between=[],
//     enegements_of=""
// }
exports.getEngagement = functions.https
  .onRequest((request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    var toBeReturned = [];
    const engagement = request.body;
    if (engagement.id) {
      admin
        .firestore()
        .collection("Engagement")
        .where("id", "==", engagement.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const order = doc.data();
            toBeReturned.push(order);
          });
          response.json(toBeReturned);
        })
        .catch((error) => {
          response.status(500).json({
            error: error.code,
          });
        });
    }
    else if (engagement.type) {
      admin
        .firestore()
        .collection("Engagement")
        .where("type", "==", engagement.type)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const order = doc.data();
            toBeReturned.push(order);
          });
          response.json(toBeReturned);
        })
        .catch((error) => {
          response.status(500).json({
            error: error.code,
          });
        });
    }
    else if (engagement.engagement_with.length == 2) {
      admin
        .firestore()
        .collection("Engagement")
        .where("engagement_with", "array-contains", engagement.engagement_with[0])
        .where("engagement_with", "array-contains", engagement.engagement_with[1])
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const order = doc.data();
            toBeReturned.push(order);
          });
          response.json(toBeReturned);
        })
        .catch((error) => {
          response.status(500).json({
            error: error.code,
          });
        });
    }
    else if (engagement.engagement_with.length == 3) {
      admin
        .firestore()
        .collection("Engagement")
        .where("engagement_with", "array-contains", engagement.engagement_with[0])
        .where("engagement_with", "array-contains", engagement.engagement_with[1])
        .where("engagement_with", "array-contains", engagement.engagement_with[2])
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const order = doc.data();
            toBeReturned.push(order);
          });
          response.json(toBeReturned);
        })
        .catch((error) => {
          response.status(500).json({
            error: error.code,
          });
        });
    }
    else if (engagement.engagement_with.length == 4) {
      admin
        .firestore()
        .collection("Engagement")
        .where("engagement_with", "array-contains", engagement.engagement_with[0])
        .where("engagement_with", "array-contains", engagement.engagement_with[1])
        .where("engagement_with", "array-contains", engagement.engagement_with[2])
        .where("engagement_with", "array-contains", engagement.engagement_with[3])
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const order = doc.data();
            toBeReturned.push(order);
          });
          response.json(toBeReturned);
        })
        .catch((error) => {
          response.status(500).json({
            error: error.code,
          });
        });
    }
    else if (engagement.engagement_of) {
      admin
        .firestore()
        .collection("Engagement")
        .where("engagement_with", "array-contains", engagement.engagement_of)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const order = doc.data();
            toBeReturned.push(order);
          });
          response.json(toBeReturned);
        })
        .catch((error) => {
          response.status(500).json({
            error: error.code,
          });
        });
    }
  });

//Task
exports.createTask = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Headers", "Content-Type");
  const package = request.body;
  admin
    .firestore()
    .collection("Task")
    .doc(package.id).set(package)
    .then(() => {
      response.json(package);
    })
    .catch((error) => {
      response.status(500).json({
        error: error.code,
      });
    });
});
exports.updateTask = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Headers", "Content-Type");
  const package = request.body;
  admin
    .firestore()
    .collection("Task")
    .doc(package.id).update(package)
    .then(() => {
      response.json(package);
    })
    .catch((error) => {
      response.status(500).json({
        error: error.code,
      });
    });
});

exports.getTask = functions.https
  .onRequest((request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    admin
      .firestore()
      .collection("Task")
      .get()
      .then((querySnapshot) => {
        const orders = [];
        querySnapshot.forEach((doc) => {
          const order = doc.data();
          orders.push(order);
        });
        response.json(orders);
      })
      .catch((error) => {
        response.status(500).json({
          error: error.code,
        });
      });
  });

exports.uploadFile = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== "POST") {
      return res.status(500).json({
        message: "Not allowed"
      });
    }
    const bb = Busboy({ headers: req.headers });
    let uploadData = null;
    var url = ''
    bb.on("file", (fieldname, file, filename, encoding, mimetype) => {
      url = "https://firebasestorage.googleapis.com/v0/b/portfoliomate-e14a8.appspot.com/o/"+filename.filename+"?alt=media"
      console.log(url);
      const filepath = path.join(os.tmpdir(), filename.filename);
      uploadData = { file: filepath, type: mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });

    bb.on("finish", () => {
      const bucket = gcs.bucket("gs://portfoliomate-e14a8.appspot.com");
      bucket
        .upload(uploadData.file, {
          uploadType: "media",
          metadata: {
            metadata: {
              contentType: uploadData.type
            }
          }
        })
        .then(() => {
          res.status(200).json({
            image : url
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
   bb.end(req.rawBody);
  });
})

exports.getAllEngagements = functions.https
  .onRequest((request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    admin
      .firestore()
      .collection("Engagement")
      .get()
      .then((querySnapshot) => {
        const orders = [];
        querySnapshot.forEach((doc) => {
          const order = doc.data();
          orders.push(order);
        });
        response.json(orders);
      })
      .catch((error) => {
        response.status(500).json({
          error: error.code,
        });
      });
  });
