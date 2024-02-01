import React,{useEffect,useState} from "react";
import {useFirebase} from "../context/Firebase";
import BookCard from "../components/Card"
const OrderPage=()=>{
    const firebase=useFirebase();
    const [books,setbooks]=useState([]);
    useEffect(()=>{
    if(firebase.isLoggedin)
    firebase.fetch_my_books(firebase.user.uid).then((books)=>setbooks(books.docs));
    },[firebase]);
    if(!firebase.isLoggedin)return <h1>Please Log In</h1>
    console.log(books)
    return<div>
    {
       books.map((book)=><BookCard link={`/book/orders/${book.id}`} key={book.id} id={book.id} {...book.data()}/>)
    }
    </div>
}
export default OrderPage;