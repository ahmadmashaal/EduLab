import { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "../components/cards/CourseCard";
// import Hero from "../components/Hero";

const Index = ({ courses }) => {
  return (
    <>
      <img
        src = "heroImg.jpg"
        alt = "hero"
        className = "hero pb-3"
      />
      <div className = "mx-auto py-5 px-5 ">
        <h6>التعلم من أكثر <br/>من ٢٠٠،٠٠٠ دورة</h6>
      </div>
      {/* <Hero /> */}
      <div className="container-fluid">
        <div className="row">
          {courses.map((course) => (
            <div key={course._id} className="col-md-4">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/courses`);
  return {
    props: {
      courses: data,
    },
  };
}

export default Index;
