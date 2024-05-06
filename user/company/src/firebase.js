import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: 'AIzaSyBTnc9o98kiDEl1XUjreonPQTkWxv9RcE8',
  authDomain: 'usaid-project2024.firebaseapp.com',
  projectId: 'usaid-project2024',
  storageBucket: 'usaid-project2024.appspot.com',
  messagingSenderId: '382907194971',
  appId: '1:382907194971:web:ea52ea26d61baf9e6be97e',
  measurementId: 'G-K3VWJ1SZ6M',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { storage, auth, provider };
