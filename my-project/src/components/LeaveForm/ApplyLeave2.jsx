import React, { useState } from "react";
import LeaveDetailsForm from "./LeaveDetailsForm";
import AlternateArrangementsTable from "./AlternateArrangementsTable";
import { submitLeaveApplication } from "../../api/api"; // Import API function

const ApplyLeave2 = () => {
  const [formData, setFormData] = useState({
    applicantName: "",
    postHeld: "",
    numberOfDays: "",
    natureOfLeave: "",
    reason: "",
    startDate: "",
    endDate: "",
    leaveAddress:"",
    phoneNumber:"",
  });

  const [lectures, setLectures] = useState([]);

  // Handle input changes for leave details
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle input changes for alternate arrangements
  const handleLectureChange = (index, field, value) => {
    const updatedLectures = [...lectures];
    updatedLectures[index][field] = value;
    setLectures(updatedLectures);
  };

  // Add a new lecture row
  const addLectureRow = () => {
    setLectures((prevLectures) => [
      ...prevLectures,
      { date: "", startTime: "", endTime: "", division: "", subject: "", substituteTeacherId: "" }
    ]);
  };

  // Remove a lecture row
  const removeLectureRow = (index) => {
    setLectures(lectures.filter((_, i) => i !== index));
  };

  // Submit full leave application
  const handleSubmit = async (e) => {
    e.preventDefault();

    const teacherId = localStorage.getItem("teacherId"); // Get teacher ID from local storage

    const finalData = {
      teacherRegistrationId: teacherId,
      applicantName: formData.applicantName,
      post: formData.postHeld,
      numberOfDays: formData.numberOfDays,
      startDate: formData.startDate,
      endDate: formData.endDate,
      natureOfLeave: formData.natureOfLeave,
      reason: formData.reason,
      leaveAddress:formData.leaveAddress ,
      phoneNumber:formData.phoneNumber ,
      alternateArrangements: lectures.map((lec) => ({
        date: lec.date,
        startTime: lec.startTime,
        endTime: lec.endTime,
        division: lec.division,
        subject: lec.subject,
        substituteTeacherId: lec.substituteTeacherId,
      })),
    };

    console.log("Final data:" ,finalData);
    // const response = await submitLeaveApplication(finalData);
    console.log("Leave application response:", response);
  };

  return (
    <section className="apply-leave-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-12">
            <div className="bg-white shadow-lg p-4 rounded">
              <h2 className="text-center fw-bold mb-3">
                PUNE INSTITUTE OF COMPUTER TECHNOLOGY <br />
                DHANKAWADI, PUNE - 411 043.
              </h2>
              <h3 className="text-center text-primary">LEAVE APPLICATION</h3>

              <form onSubmit={handleSubmit}>
                {/* Leave Details Section */}
                <LeaveDetailsForm formData={formData} handleInputChange={handleInputChange} />

                {/* Alternate Arrangements Table */}
                <AlternateArrangementsTable
                  lectures={lectures}
                  handleLectureChange={handleLectureChange}
                  addLectureRow={addLectureRow}
                  removeLectureRow={removeLectureRow}
                />

                {/* Submit Button */}
                <div className="text-center mt-3">
                  <button type="submit" className="btn btn-primary">
                    Submit Application
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplyLeave2;
