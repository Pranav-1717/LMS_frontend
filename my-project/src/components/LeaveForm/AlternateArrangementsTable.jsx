import React, { useContext, useEffect, useState } from "react";
import { fetchAvailableTeachers, sendRequestToTeacher,setAuthToken } from "../../api/api";
// import { AuthContext } from "../../context/AuthContext";

const AlternateArrangementsTable = ({
  lectures,
  handleLectureChange,
  addLectureRow,
  removeLectureRow,
}) => {

  // const {token} = useContext(AuthContext);
  const token = localStorage.getItem('l_token')

  useEffect(()=>{
    setAuthToken(token);
  },[token])
  const [availableTeachers, setAvailableTeachers] = useState({});

  // Fetch available teachers when Date, StartTime & EndTime are entered
  const fetchTeachers = async (index) => {
    const { date, startTime, endTime } = lectures[index];
  
    if (!date || !startTime || !endTime ) return;
  
    const formattedDate = date.split("/").join("-");
  
    console.log("Sending API Request:", formattedDate, startTime, endTime);
  
    try {
      const data = await fetchAvailableTeachers(formattedDate, startTime, endTime);
  
      console.log("Full API Response:", data); // LOGGING API RESPONSE
  
      if (data && Array.isArray(data.data)) {
        const teachers = data.data.map((teacher) => ({
          id: teacher.teacherRegistrationId,
          name: teacher.name,
        }));
  
        console.log("Extracted Teachers:", teachers); // LOGGING Extracted Data
  
        setAvailableTeachers((prev) => ({
          ...prev,
          [index]: teachers,
        }));
      } else {
        console.error("No available teachers found or wrong response format", data);
      }
    } catch (error) {
      console.error("API Request Failed:", error);
    }
  };
  
  //  Handle input change & call fetchTeachers when all fields are filled
  const handleInputChange = (index, field, value) => {
    const updatedLectures = [...lectures];
    updatedLectures[index][field] = value;

    handleLectureChange(index, field, value);

    if (updatedLectures[index].date && updatedLectures[index].startTime && updatedLectures[index].endTime) {
      fetchTeachers(index);
    }
  };

  //  Send request to another teacher
  const handleRequest = async (index) => {
    const senderId = "C2K221121"; //localStorage.getItem("teacherId");
    const receiverId = lectures[index].facultyId;
    if (!receiverId) return;

    const requestData = {
      senderTeacherRegistrationId: senderId,
      receiverTeacherRegistrationId: receiverId,
      message: "Please take my lecture for the given slot",
      details: {
        date: lectures[index].date,
        startTime: lectures[index].startTime,
        endTime: lectures[index].endTime,
        class: lectures[index].class,
        subject: lectures[index].subject,
      },
    };

    await sendRequestToTeacher(requestData);
  };

  return (
    <div>
      <h3 className="text-center text-primary">
        Alternate Arrangement for Classes / Practicals
      </h3>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Class</th>
              <th>Subject</th>
              <th>Faculty</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {lectures.map((lec, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="date"
                    value={lec.date}
                    onChange={(e) => handleInputChange(index, "date", e.target.value)}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="HH:mm:ss"
                    value={lec.startTime}
                    onChange={(e) => handleInputChange(index, "startTime", e.target.value)}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="HH:mm:ss"
                    value={lec.endTime}
                    onChange={(e) => handleInputChange(index, "endTime", e.target.value)}
                    className="form-control"
                  />
                </td>
                <td style={{ width: "10%" }}>
                  <input
                    type="text"
                    value={lec.class}
                    onChange={(e) => handleInputChange(index, "class", e.target.value)}
                    className="form-control"
                  />
                </td>
                <td style={{ width: "15%" }}>
                  <input
                    type="text"
                    value={lec.subject}
                    onChange={(e) => handleInputChange(index, "subject", e.target.value)}
                    className="form-control"
                  />
                </td>
                <td>
                  <select
                    className="form-select"
                    value={lec.facultyId}
                    onChange={(e) => handleInputChange(index, "facultyId", e.target.value)}
                  >
                    <option value="">Select Faculty</option>
                    {availableTeachers[index]?.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.name}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="text-center">
                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-sm btn-primary mx-1"
                      onClick={() => handleRequest(index)}
                    >
                      Request
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm"
                      onClick={() => removeLectureRow(index)}
                    >
                      <span>❌</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        className="btn btn-success mt-3"
        onClick={addLectureRow}
      >
        Add Lecture
      </button>
    </div>
  );
};

export default AlternateArrangementsTable;
