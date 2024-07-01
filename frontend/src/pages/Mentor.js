import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import MentorCard from "../components/Mentor/MentorCard";
import MentorSearch from "../components/MentorSearch";

function Mentor() {
    const [selected,setSelected]=useState("All")
    const [mentors,setMentors]=useState([]);
    const [filteredMentors,setFilteredMentors]=useState([]);


    useEffect(()=>{
        axios.post("http://localhost:5000/mentor/get",{
        }).then((res) => {
            // console.log(res.data);
            setMentors(res.data);
        }).catch((err) => {
            console.log(err);
        });
    },[]);
    useEffect(()=>{
      if (selected !== "All"){
      axios.post("http://localhost:5000/mentor/get",{
        skills:selected
      }).then((res) => {
          setMentors(res.data);;
      }).catch((err) => {
          console.log(err);
      });
      }
      else{
        axios.post("http://localhost:5000/mentor/get",{
        }).then((res) => {
            setMentors(res.data);
        }).catch((err) => {
            console.log(err);
        });
      }
    },[selected])

    useEffect(()=>{
      setFilteredMentors(mentors);
    },[mentors])

    // console.log(filteredMentors);
  return (
    <>
      <div className=" h-[100vh] bg-gray-50">
      <div className="flex flex-col justify-start  mx-[10vw] mb-5">
          <div className="border border-grey-800 rounded-xl bg-white pb-5 mt-5">
            <MentorSearch mentors={mentors} setFilteredMentors={setFilteredMentors}></MentorSearch>
          </div>
          <Navbar selected={selected} setSelected= {setSelected}/>
        </div>
        <div className="flex justify-center px-16 gap-4 flex-wrap mx-[7vw]">
          {
            filteredMentors.map((mentor,index)=>{
              // console.log(mentor);
              return <><MentorCard key={index} cardData={mentor}></MentorCard></>
            })
          }
        </div>
        </div>
    </>
      
  )
}

export default Mentor
