import { ref, getDownloadURL, uploadBytesResumable, deleteObject   } from "firebase/storage";
import { collection, arrayUnion, arrayRemove, increment, deleteDoc, doc, setDoc, getDocs, getDoc, updateDoc, deleteField } from "firebase/firestore";
import { AUTH, DATABASE, STORAGE } from '../config/Firebase';
import React, { useEffect, useState} from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { TabRouter } from "@react-navigation/native";


export function handleInput5(key,value,stateSetter){
    //const key = target.name
   // const value = target.value

  
    try{
        stateSetter((old) =>{
            return {...old, [key]:value}
         })       
    }catch{
        if(!stateSetter){
            console.log('need stateSetter')
        }
    }
    
}


export async function addUserInfoToDatabase(data,user){
    

    const docRef = doc(DATABASE, "Users", `${user.email}${user.uid}`) 
    await setDoc(docRef, data, { merge: true });   
     
}

    async function updateuserDataArray(data, from, remove = true){
    const docRef = doc(DATABASE, "Users", `${user.email}${user.uid}`) 
    
    if (remove ==  false){
        await updateDoc(docRef, {
            [from]: arrayUnion(data)
        });
     }else{
        await updateDoc(docRef, {
            [from]: arrayRemove(data)
        });
     }


     
}

export function getSignedInUser(setUser,SetData){

const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {
        setUser(user)
       fetchData(SetData, user)

    } else {
        // User is signed out
        // ...
    }
    });
}

async function deleteUserData(user, cartItem){
    const userData = doc(DATABASE, 'Users', `${user.email}${user.uid}`);
    // Remove the 'capital' field from the document
    await updateDoc(userData, {
        [`Cart.${cartItem}`]: deleteField()
    });

}






async function decreaseCartAmount(user, price){
    const docRef = doc(DATABASE, "Users", `${user.email}${user.uid}`)
    const data = {CartPrices: (price && price != 0)? increment(-price):increment(0) }
    
    // Remove the 'capital' field from the document
    await setDoc(docRef, data, { merge: true });

}

async function fetchProducts(setProducts){
    const querySnapshot = await getDocs(collection(DATABASE, "Products"));
    querySnapshot.forEach((doc) => {
        setProducts((old) => {return({
            ...old,[doc.id]: doc.data()
        })})

    });
}
async function fetchData(setUserData, user){
    const docRef = doc(DATABASE, 'Users', `${user.email}${user.uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        setUserData(docSnap.data());
    } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    }


}

export {fetchProducts, fetchData, deleteUserData, updateuserDataArray, decreaseCartAmount}