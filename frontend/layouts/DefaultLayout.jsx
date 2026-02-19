import { Outlet } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";

export function DefaultLayout(){
    return(
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}