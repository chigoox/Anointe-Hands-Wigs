import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { AUTH, DATABASE } from '../config/Firebase';
import React, { useState} from 'react'

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
    const docRef = doc(DATABASE, "users", `${data.name} ${user.uid}`) 
    await setDoc(docRef, data);   
     
}

