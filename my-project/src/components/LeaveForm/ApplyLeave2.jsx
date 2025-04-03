import React, { useState, useEffect } from "react";
import LeaveDetailsForm from "./LeaveDetailsForm";
import AlternateArrangementsTable from "./AlternateArrangementsTable";
import { submitLeaveApplication, fetchTeacherInfo, fetchTeacherLeave ,setAuthToken} from '../../api/api';
import { saveFormDataToSession, getFormDataFromSession, saveLecturesToLocal, getLecturesFromLocal, clearAllStoredData } from "../../utils/dataUtils";

const ApplyLeave2 = () => {
  const [formData, setFormData] = useState(getFormDataFromSession() || {
    applicantName: "",
    postHeld: "",
    numberOfDays: "",
    natureOfLeave: "",
    reason: "",
    startDate: "",
    endDate: "",
    leaveAddress: "",
    teacherRegistrationId: "",
    phoneNumber: "",
    imageURL: "", // New field to store the uploaded image URL
  });

  const [lectures, setLectures] = useState(getLecturesFromLocal() || []);
  const [errors, setErrors] = useState({});
  const [remainingLeaves, setRemainingLeaves] = useState({});
  const token = localStorage.getItem("l_token");
  setAuthToken(token); // Set the token for API requests

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherId = await fetchTeacherInfo();
        setFormData(prevFormData => ({
          ...prevFormData,
          teacherRegistrationId: teacherId
        }));
        saveFormDataToSession({
          ...formData,
          teacherRegistrationId: teacherId
        });

        const leaveTypes = await fetchTeacherLeave();
        setRemainingLeaves(leaveTypes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    saveLecturesToLocal(lectures);
  }, [lectures]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.applicantName) newErrors.applicantName = "Applicant name is required.";
    if (!formData.postHeld) newErrors.postHeld = "Post held is required.";
    if (!formData.numberOfDays || formData.numberOfDays <= 0) newErrors.numberOfDays = "Number of days is required and must be greater than 0.";
    if (!formData.natureOfLeave) newErrors.natureOfLeave = "Nature of leave is required.";
    if (!formData.startDate) newErrors.startDate = "Start date is required.";
    if (!formData.endDate) newErrors.endDate = "End date is required.";
    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = "End date must be after start date.";
    }

    if (formData.natureOfLeave === "MEDICAL_LEAVE" && (new Date(formData.startDate) >= new Date() || new Date(formData.endDate) >= new Date())) {
      newErrors.startDate = "Medical leave should have past dates.";
      newErrors.endDate = "Medical leave should have past dates.";
    }

    if (formData.natureOfLeave && remainingLeaves[formData.natureOfLeave] && formData.numberOfDays > remainingLeaves[formData.natureOfLeave]) {
      newErrors.numberOfDays = `You only have ${remainingLeaves[formData.natureOfLeave]} ${formData.natureOfLeave} remaining.`;
    }

    if (!formData.leaveAddress) newErrors.leaveAddress = "Leave address is required.";
    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = "Valid phone number is required.";
    if (!formData.reason) newErrors.reason = "Reason is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (url) => {
    setFormData({ ...formData, imageURL: url }); // Update imageURL when the file is uploaded
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const requestData = {
      teacherRegistrationId: formData.teacherRegistrationId,
      applicantName: formData.applicantName,
      post: formData.postHeld,
      numberOfDays: Number(formData.numberOfDays),
      startDate: formData.startDate,
      endDate: formData.endDate,
      natureOfLeave: formData.natureOfLeave,
      reason: formData.reason,
      leaveAddress: formData.leaveAddress,
      phoneNumber: formData.phoneNumber,
      imageURL: formData.imageURL, // Include the image URL in the request
      alternateArrangements: formData.natureOfLeave !== "MEDICAL_LEAVE" ? lectures.map((lecture) => ({
        date: lecture.date,
        startTime: lecture.startTime,
        endTime: lecture.endTime,
        division: lecture.division,
        subject: lecture.subject,
        originalTeacherId: formData.teacherRegistrationId,
        substituteTeacherId: lecture.facultyId,
      })) : [],
    };

    try {
      const response = await submitLeaveApplication(requestData);
      console.log("Server Response:", response);
      clearAllStoredData();
      setFormData({
        applicantName: "",
        postHeld: "",
        numberOfDays: "",
        natureOfLeave: "",
        reason: "",
        startDate: "",
        endDate: "",
        leaveAddress: "",
        phoneNumber: "",
        imageURL: "", // Clear imageURL after submission
      });
      setLectures([]);
      alert("Leave application submitted successfully!");
      window.location.reload(); // or use navigate("/some-path") if using react-router
    } catch (error) {
      console.error("Error submitting leave application:", error);
      alert("Error submitting leave application. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <LeaveDetailsForm
        formData={formData}
        handleInputChange={handleInputChange}
        errors={errors}
        handleFileUpload={handleFileUpload} // Pass the function to handle file upload
      />
      {/* Only render AlternateArrangementsTable if natureOfLeave is not "MEDICAL_LEAVE" */}
      {formData.natureOfLeave !== "MEDICAL_LEAVE" && (
        <AlternateArrangementsTable
          lectures={lectures}
          handleLectureChange={(index, field, value) => {
            const updatedLectures = [...lectures];
            updatedLectures[index][field] = value;
            setLectures(updatedLectures);
          }}
          addLectureRow={() => {
            setLectures([
              ...lectures,
              { date: "", startTime: "", endTime: "", division: "", subject: "", facultyId: "", requested: false },
            ]);
          }}
        />
      )}
      <div className="text-center mt-2">
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
};

export default ApplyLeave2;
