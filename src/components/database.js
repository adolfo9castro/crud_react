
import { initializeApp } from "firebase/app";

import { getFirestore, collection, getDocs, addDoc, setDoc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB2wSeV26z0DjUAhZ9kGhrWBBfg32qiXYk",
  authDomain: "crud-823ba.firebaseapp.com",
  projectId: "crud-823ba",
  storageBucket: "crud-823ba.appspot.com",
  messagingSenderId: "333296747544",
  appId: "1:333296747544:web:57aa669ac6f2c2631baf6d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const getCollection = async () => {
  const result = {
    statusResponse: false,
    data: null,
    error: null
  }
  try {
    const queryCollection = collection(db, "tasks")
    const getTasks = await getDocs(queryCollection)
    const taskList = getTasks.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    result.statusResponse = true
    result.data = taskList
  } catch (error) {
    result.error = error
  }
  return result
}

const addDocument = async (data) => {
  const result = {
    statusResponse: false,
    data: null,
    error: null
  }  
  try {
    const queryCollection = collection(db, "tasks")
    const response = await addDoc(queryCollection, data)
    console.log(response);
  } catch (error) {
    result.error = error
    console.log(error);
  }
  return result
}

const updateDocument = async (data) => {
  const result = {
    statusResponse: false,
    data: null,
    error: null
  }  
  try {
    const queryCollection = collection(db, "tasks")
    const response = await setDoc(queryCollection, data)
    console.log(response);
  } catch (error) {
    result.error = error
    console.log(error);
  }
  return result
}

const deleteDocument = async (data) => {
  const result = {
    statusResponse: false,
    data: null,
    error: null
  }  
  try {
    const queryCollection = collection(db, "tasks")
    const response = await deleteDoc(queryCollection, data)
    console.log(response);
  } catch (error) {
    result.error = error
    console.log(error);
  }
  return result
}

export { 
  getCollection, 
  addDocument, 
  updateDocument,
  deleteDocument 
} 