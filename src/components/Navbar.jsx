import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar";
import { useFirebase } from "../context/Firebase";
import { FaHome, FaUser, FaPlus } from 'react-icons/fa';
const MyNavbar=()=>{
    const firebase=useFirebase();
 return(
    <div>
        <Navbar bg="dark" variant="dark">
        <Container>
         <Navbar.Brand style ={{color:"lightblue"}}href="#home"> <FaHome/> GiveNGet</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link style ={{color:"yellow"}} href="/">Home</Nav.Link>
            <Nav.Link style ={{color:"orange"}} href="/login">LogIn</Nav.Link>
            <Nav.Link style ={{color:"lime"}} href="/register">Register</Nav.Link>
            <Nav.Link style={{color:"lightblue"}} href="/book/list">Add Listing</Nav.Link>
            <Nav.Link style={{color:"lightblue"}} href="/book/orders  ">Orders</Nav.Link>
            <Nav.Link style={{color:"lightblue"}} href=""><FaUser/>{firebase.titled}</Nav.Link>

           </Nav>
        </Container>
    </Navbar>
    </div>
    // <div>
    //   <Navbar bg="dark" variant="dark">
    //     <Container>
    //       <Navbar.Brand href="#home">GiveNGet</Navbar.Brand>
    //       <Nav className="me-auto">
    //         <Nav.Link href="/">Home</Nav.Link>
    //         <Nav.Link href="/register">LogIn</Nav.Link>
    //         <Nav.Link href="/login">Register</Nav.Link>
    //         <Nav.Link href="/book/list">Add Listing</Nav.Link>
    //       </Nav>
    //       {/* Non-NavLink Element */}
    //       <div className="ml-auto">
    //         <span className="non-navlink">Your Element</span>
    //       </div>
    //     </Container>
    //   </Navbar>
    // </div>
 )
};
export default MyNavbar;