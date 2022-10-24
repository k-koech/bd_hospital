import { Outlet, Link } from "react-router-dom";
import Footer from "../footer/Footer";
import "./Layout.css";
import AddBloodGroup from "./blood_group/AddBloodGroup";
import { MdOutlineBloodtype } from "react-icons/md";
import {BiDonateBlood} from "react-icons/bi";

export default function Layout() 
{

  return (
    <>
    <div className="container layout">
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent pt-3">
        <a className="navbar-brand text-danger" href="/"><h1><BiDonateBlood/></h1></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto">
                <li className="nav-item active mx-1">
                    <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item active mx-1">
                    <Link className="nav-link" to="/hospitals">Hospitals</Link>
                </li>          
                
            </ul>

            <div className="navbar-nav ml-auto">
                <li className="nav-item active">
                    <button className="btn btn-outline-danger" data-toggle="modal" data-target="#addBloodGroupModal"><MdOutlineBloodtype/>Add Blood Group</button>
                    <AddBloodGroup/>
                </li>
            </div>
            
        </div>
    </nav>

        <div className="content-body ">
            <Outlet />
            
        </div>
        
    </div>
    <Footer/>
    </>
  )

};
