
import { initializeApp } from "firebase/app";

import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp,
  orderBy,
  query,
  doc
} from 'firebase/firestore';

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
  
    const queryCollection = query(collection(db, "tasks"), orderBy("createAt", "asc"))
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
    data.createAt = serverTimestamp()
    const response = await addDoc(queryCollection, data)
    result.data = response
    result.statusResponse = true
  } catch (error) {
    result.error = error
  }
  return result
}

const updateDocument = async (id, data) => {
  const result = {
    statusResponse: false,
    data: null,
    error: null
  }  
  try {
    data.updateAt = serverTimestamp()
    const queryCollection = doc(db, "tasks", id)
    const response = await updateDoc(queryCollection, data)
    result.data = response
    result.statusResponse = true
  } catch (error) {
    result.error = error
    
  }
  return result
}

const deleteDocument = async (id) => {
  const result = {
    statusResponse: false,
    data: null,
    error: null
  }  
  try {
    const docToDelete = doc(db, "tasks", id)
    const response = await deleteDoc(docToDelete)
    console.log(response)
    result.data = response
    result.statusResponse = true
  } catch (error) {
    result.error = error
    
  }
  return result
}

export { 
  getCollection, 
  addDocument, 
  updateDocument,
  deleteDocument 
} 