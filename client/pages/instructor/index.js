import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../components/routes/InstructorRoute";
import { Avatar, Tooltip } from "antd";
import Link from "next/link";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const InstructorIndex = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        const { data } = await axios.get("/api/instructor-courses");
        setCourses(data);
    };

    const myStyle = { marginTop: "-15px", fontSize: "10px" };

    return (
        <InstructorRoute>
            <h1 className="p-5 mb-4 bg-light rounded-3 text-center square">لوحة تحكم المدرب</h1>
                {/* <pre>{JSON.stringify(courses, null, 4)}</pre> */}

                {courses &&
                    courses.map((course) => (
                        <>
                            <div className="media pt-2">
                                <Avatar
                                size={80}
                                src={course.image ? course.image.Location : "/course.png"}
                                />

                            <div className="media-body pl-2">
                                <div className="row">
                                    <div className="col">
                                        <Link
                                            href={`/instructor/course/view/${course.slug}`}
                                            className="pointer mt-2 text-primary"
                                        >
                                            <h5 className="pt-2">{course.name}</h5>
                                        </Link>
                                        <p style={{ marginTop: "-10px" }}>
                                            {course.lessons.length} الدروس
                                        </p>

                                        {course.lessons.length < 5 ? (
                                        <p style={myStyle} className="text-warning">
                                            مطلوب 5 دروس على الأقل لنشر الدورة
                                        </p>
                                        ) : course.published ? (
                                        <p style={myStyle} className="text-success">
                                            دورتك على الإنترنت
                                        </p>
                                        ) : (
                                        <p style={myStyle} className="text-success">
                                            دورتك التدريبية جاهزة للنشر
                                        </p>
                                        )}
                                    </div>

                                    <div className="col-md-3 mt-3 text-center">
                                        {course.published ? (
                                            <Tooltip title="Published">
                                                <CheckCircleOutlined className="h5 pointer text-success" />
                                            </Tooltip>
                                        ) : (
                                            <Tooltip title="Unpublished">
                                                <CloseCircleOutlined className="h5 pointer text-warning" />
                                            </Tooltip>
                                        )}
                                    </div>
                                </div>
                            </div>
                            </div>
                        </>
                ))}
        </InstructorRoute>
    );
};

export default InstructorIndex;
