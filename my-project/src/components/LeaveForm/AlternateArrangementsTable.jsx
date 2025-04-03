import React, { useContext, useEffect, useState } from "react";
import {
  fetchAvailableTeachers,
  sendRequestToTeacher,
  setAuthToken,
  fetchTeacherInfo,
} from "../../api/api";
import {
  saveLecturesToLocal,
  getLecturesFromLocal,
} from "../../utils/dataUtils"; // File writing utilities

const AlternateArrangementsTable = ({
  lectures,
  handleLectureChange,
  addLectureRow,
}) => {
  const token = localStorage.getItem("l_token");
  console.log("Token in AlternateArrangementsTable", token)
  const check = async()=>{
    const senderId = await fetchTeacherInfo();
    console.log("Sender id",senderId)
  }
  check();

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const [availableTeachers, setAvailableTeachers] = useState({});
  const [storedLectures, setStoredLectures] = useState(
    getLecturesFromLocal() || []
  );

  // Load previous lectures on mount
  useEffect(() => {
    setStoredLectures(getLecturesFromLocal() || []);
  }, []);

  // Save changes to local storage
  useEffect(() => {
    saveLecturesToLocal(storedLectures);
  }, [storedLectures]);

  const removeLectureRow = (index) => {
    // Filter out the selected lecture
    const updatedLectures = storedLectures.filter((_, i) => i !== index);
    setStoredLectures(updatedLectures);
    saveLecturesToLocal(updatedLectures); // Update localStorage
  };

  // Fetch available teachers when Date, StartTime & EndTime are entered
  const fetchTeachers = async (index) => {
    const { date, startTime, endTime } = storedLectures[index];
    if (!date || !startTime || !endTime) return;

    try {
      const data = await fetchAvailableTeachers(date, startTime, endTime);
      console.log("Available teachers data", data);
      if (data && Array.isArray(data.data)) {
        const teachers = data.data.map((teacher) => ({
          id: teacher.teacherRegistrationId,
          name: teacher.name,
        }));

        setAvailableTeachers((prev) => ({
          ...prev,
          [index]: teachers,
        }));
      } else {
        console.error("No available teachers found", data);
      }
    } catch (error) {
      console.error("API Request Failed:", error);
    }
  };

  // Handle input change & call fetchTeachers when all fields are filled
  const handleInputChange = (index, field, value) => {
    const updatedLectures = [...storedLectures];
    updatedLectures[index] = {
      ...updatedLectures[index],
      [field]: value, // Ensure the specific field is updated
    };
    setStoredLectures(updatedLectures); // Update state
    handleLectureChange(index, field, value); // Propagate changes

    if (
      updatedLectures[index].date &&
      updatedLectures[index].startTime &&
      updatedLectures[index].endTime
    ) {
      fetchTeachers(index);
    }
  };

  // Send request to a teacher & store the request
  const handleRequest = async (index) => {
    const senderId = await fetchTeacherInfo();
    console.log("Sender id", senderId);
    const receiverId = storedLectures[index].facultyId;

    // Validation: Check if all fields are filled
    const { date, startTime, endTime, division, subject } = storedLectures[index];
    if (!date || !startTime || !endTime || !division || !subject || !receiverId) {
      alert("Error: Please fill in all the fields before sending the request.");
      return;
    }

    const requestData = {
      senderTeacherRegistrationId: senderId,
      receiverTeacherRegistrationId: receiverId,
      message: "Please take my lecture for the given slot",
      details: {
        date,
        startTime,
        endTime,
        division,
        subject,
      },
    };

    await sendRequestToTeacher(requestData);

    // Mark request as sent
    const updatedLectures = [...storedLectures];
    updatedLectures[index].requested = true;
    setStoredLectures(updatedLectures);
  };

  return (
    <div>
      <h4 className="text-center text-primary">
        Alternate Arrangement for Classes / Practicals
      </h4>
      <div className="table-responsive p-2">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Division</th>
              <th>Subject</th>
              <th>Faculty</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {storedLectures.map((lec, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="date"
                    value={lec.date}
                    onChange={(e) =>
                      handleInputChange(index, "date", e.target.value)
                    }
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="HH:mm:ss"
                    value={lec.startTime}
                    onChange={(e) =>
                      handleInputChange(index, "startTime", e.target.value)
                    }
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="HH:mm:ss"
                    value={lec.endTime}
                    onChange={(e) =>
                      handleInputChange(index, "endTime", e.target.value)
                    }
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={lec.division}
                    onChange={(e) =>
                      handleInputChange(index, "division", e.target.value)
                    }
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={lec.subject}
                    onChange={(e) =>
                      handleInputChange(index, "subject", e.target.value)
                    }
                    className="form-control"
                  />
                </td>
                <td>
                  <select
                    className="form-select"
                    value={lec.facultyId}
                    onChange={(e) =>
                      handleInputChange(index, "facultyId", e.target.value)
                    }
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
                    {!lec.requested ? (
                      <>
                        <button
                          type="button"
                          className="btn btn-sm btn-primary mx-1"
                          onClick={() => handleRequest(index)}
                        >
                          Request
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm  mx-1"
                          onClick={() => removeLectureRow(index)}
                        >
                          ❌
                        </button>
                      </>
                    ) : (
                      <span className="text-success">✔ Sent</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        className="btn btn-success mt-2"
        onClick={() => {
          addLectureRow();
          setStoredLectures([
            ...storedLectures,
            {
              date: "",
              startTime: "",
              endTime: "",
              class: "",
              subject: "",
              facultyId: "",
              requested: false,
            },
          ]);
        }}
      >
        Add Lecture
      </button>
    </div>
  );
};

export default AlternateArrangementsTable;
