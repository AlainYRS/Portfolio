import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs, addDoc, deleteDoc } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_PORTFOLIO_apiKey,
  authDomain: process.env.NEXT_PUBLIC_PORTFOLIO_authDomain,
  projectId: process.env.NEXT_PUBLIC_PORTFOLIO_projectId,
  storageBucket: process.env.NEXT_PUBLIC_PORTFOLIO_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_PORTFOLIO_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_PORTFOLIO_appId,
  measurementId: process.env.NEXT_PUBLIC_PORTFOLIO_measurementId
};

const Firebase = initializeApp(firebaseConfig);
const Auth = getAuth(Firebase);
const Storage = getStorage(Firebase);
const Firestore = getFirestore(Firebase);

const ResumesColl = collection(Firestore, 'resumes');
getDocs(ResumesColl)
.then((snapshot)=>{
  let docData = [];
  snapshot.docs.forEach((doc)=>{
    docData.push({...doc.data(), id: doc.id});
  })
})
// .catch((err)=>{
//   console.log(err.message);
// })

const ISPathwayNPOColl = collection(Firestore, 'international_students_pathway_npo');
getDocs(ISPathwayNPOColl)
.then((snapshot)=>{
  let docData = [];
  snapshot.docs.map((doc)=>{
    docData.push({...doc.data(), id: doc.id});
  })
  // .catch((err)=>{
  //   console.log(err.message);
  // })
})

export { Firebase, Auth, Storage, Firestore, ResumesColl, ISPathwayNPOColl };

// Portfolio project
// NEXT_PUBLIC_PORTFOLIO_apiKey
// NEXT_PUBLIC_PORTFOLIO_authDomain
// NEXT_PUBLIC_PORTFOLIO_projectId
// NEXT_PUBLIC_PORTFOLIO_storageBucket
// NEXT_PUBLIC_PORTFOLIO_messagingSenderId
// NEXT_PUBLIC_PORTFOLIO_appId
// NEXT_PUBLIC_PORTFOLIO_measurementId

// ayrs Project
// NEXT_PUBLIC_apiKey
// NEXT_PUBLIC_authDomain
// NEXT_PUBLIC_projectId
// NEXT_PUBLIC_storageBucket
// NEXT_PUBLIC_messagingSenderId
// NEXT_PUBLIC_appId
// NEXT_PUBLIC_measurementId