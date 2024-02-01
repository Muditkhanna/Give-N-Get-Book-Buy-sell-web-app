import { useContext,useImperativeHandle,useState } from "react";
import { createContext,useEffect } from "react";

import {
    getAuth,createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
} from "firebase/auth";

import { initializeApp } from "firebase/app";

import {getFirestore,collection,addDoc,getDocs,doc,getDoc,query,where} from "firebase/firestore"
import {getStorage,ref,uploadBytes,getDownloadURL} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBXQ91jhCIpz5bCy_P0z0NYzY7kXGs9gis",
  authDomain: "kitabook-9760f.firebaseapp.com",
  projectId: "kitabook-9760f",
  storageBucket: "kitabook-9760f.appspot.com",
  messagingSenderId: "949870333813",
  appId: "1:949870333813:web:160aa75e2ff26aadbb4d3c"
};

//custom hook useFirebase
export const useFirebase=()=>useContext(FirebaseContext);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const FirebaseContext=createContext(null);

//make instance of auth
const Auth=getAuth(app);

//firestore instance
const firestore=getFirestore(app);
//google provider instance
const googleProvider=new GoogleAuthProvider();
//storage instance
const storage=getStorage(app);

export const FirebaseProvider=(props)=>{

const [user,setuser]=useState(null);

useEffect(()=>{
    onAuthStateChanged(Auth,(user)=>{
        if(user)setuser(user);
        else setuser(null);
    });
},[]);

    //sign up user
    const sign_up_email_password=async(name,email,password)=>{
     await addDoc(collection("users"),{
        username:name
     })
     return createUserWithEmailAndPassword(Auth,email,password);
    }
    //sign in user
    const sign_in_email_password=async(email,password)=>{
     return await signInWithEmailAndPassword(Auth,email,password)
    }
   //sign in with Google
   const sign_in_Google=()=>signInWithPopup(Auth,googleProvider);
   
   const isLoggedin=user?true:false;
 const titled=( user!=null)?user.displayName:"";
   const handle_new_listing=async(name,isbn,price,coverimg)=>{
     
    const myimgref=ref(storage,`uploads/images/${Date.now()}-${coverimg.name}`)
     const uploadresult=await uploadBytes(myimgref,coverimg);
     await addDoc(collection(firestore,'books'),{
        name,
        isbn,
        price,
        imageURL:uploadresult.ref.fullPath,
        userID:user.uid,
        userEmail:user.email,
        displayName:user.displayName,
        photoURL:user.photoURL,
     })
    }
    console.log(firebaseConfig)
    const list_all_books=()=>{
     return getDocs(collection(firestore,"books"))
    }
    const getimgURL=(path)=>{
        return getDownloadURL(ref(storage,path));
    }
    const get_book_by_id=async(id)=>{
      const docRef=doc(firestore,'books',id);
      const result=await getDoc(docRef);
      return result;
    }
    const place_order=async(bookId,qty)=>{
        const collectionref=collection(firestore,'books',bookId,"orders");
        const result=await addDoc(collectionref,{
          userID:user.uid,
          userEmail:user.email,
          displayName:user.displayName,
          photoURL:user.photoURL,
          qty:Number(qty),
          orderdate:Date.now().toLocaleString()
        });
        return result;
    }
    const fetch_my_books=async(userId)=>{
        
        const collref=collection(firestore,"books");
        const q=query(collref,where("userID","==",userId));
        const result= await getDocs(q);
        return result;
    }
    const get_orders=async(bookId)=>{
        const collectionReff=collection(firestore,"books",bookId,'orders');
        const result=await getDocs(collectionReff);
        return result;
    }
   return(
        <FirebaseContext.Provider value={{sign_up_email_password
        ,sign_in_email_password,
        sign_in_Google,isLoggedin,
        handle_new_listing,
        list_all_books,
        getimgURL,
        get_book_by_id,
        titled,
        place_order,
        fetch_my_books,
        get_orders,
        user,
        }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}