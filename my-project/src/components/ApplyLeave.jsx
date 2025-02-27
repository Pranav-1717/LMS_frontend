import React, { useState } from "react";
import "../css/applyleave.css";

function ApplyLeave() {
  const [lectures, setLectures] = useState([]);
  const [availableFaculty, setAvailableFaculty] = useState({});
  const [status, setStatus] = useState({});
  const [requestsSent, setRequestsSent] = useState({});

  const addLectureRow = () => {
    setLectures([
      ...lectures,
      { date: "", time: "", subject: "", faculty: "", status: "Pending" },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedLectures = [...lectures];
    updatedLectures[index][field] = value;
    setLectures(updatedLectures);
  };

  const fetchAvailableFaculty = async (index) => {
    const { date, time, subject } = lectures[index];
    if (!date || !time || !subject) return;

    try {
      const response = await fetch(
        `/api/getAvailableFaculty?date=${date}&time=${time}&subject=${subject}`
      );
      const data = await response.json();
      setAvailableFaculty((prev) => ({ ...prev, [index]: data.faculty }));
    } catch (error) {
      console.error("Error fetching available faculty:", error);
    }
  };

  const sendRequest = async (index) => {
    const { faculty } = lectures[index];
    if (!faculty) return;

    try {
      const response = await fetch(`/api/sendRequest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lectures[index]),
      });
      const data = await response.json();
      setStatus((prev) => ({ ...prev, [index]: data.status }));
      setRequestsSent((prev) => ({ ...prev, [index]: true }));
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  const cancelRequest = (index) => {
    setRequestsSent((prev) => ({ ...prev, [index]: false }));
    setStatus((prev) => ({ ...prev, [index]: "Pending" }));
  };

  const allRequestsAccepted = Object.values(status).every(
    (s) => s === "Accepted"
  );

  return (
    <section className="bg-light apply-leave-container height-100vh">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-12">
            <div className="bg-white shadow-lg p-4 rounded">
              <h2 className="text-center fw-bold mb-3">
                PUNE INSTITUTE OF COMPUTER TECHNOLOGY <br />
                DHANKAWADI, PUNE - 411 043.
              </h2>
              <h3 className="text-center text-primary">LEAVE APPLICATION</h3>
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      1) Name of the Applicant:
                    </label>
                    <input
                      type="text"
                      name="applicantName"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">2) Post Held:</label>
                    <input
                      type="text"
                      name="postHeld"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      3) No of Days of Leave Required:
                    </label>
                    <input
                      type="number"
                      name="leaveDays"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">5) Nature of Leave:</label>
                    <select name="natureOfLeave" className="form-select">
                      <option>Casual Leave</option>
                      <option>Medical Leave</option>
                      <option>Earned Leave</option>
                      <option>"C" Off</option>
                      <option>LWP</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      4) Period of Leave (From):
                    </label>
                    <input
                      type="date"
                      name="leaveFrom"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">To:</label>
                    <input
                      type="date"
                      name="leaveTo"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">6) Reason:</label>
                  <textarea name="reason" className="form-control"></textarea>
                </div>

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
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lectures.map((lec, index) => (
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
                              type="time"
                              value={lec.startTime}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "startTime",
                                  e.target.value
                                )
                              }
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              type="time"
                              value={lec.endTime}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "endTime",
                                  e.target.value
                                )
                              }
                              className="form-control"
                            />
                          </td>
                          <td style={{ width: "10%" }}>
                            <input
                              type="text"
                              value={lec.class}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "class",
                                  e.target.value
                                )
                              }
                              className="form-control"
                            />
                          </td>
                          <td style={{ width: "15%" }}>
                            <input
                              type="text"
                              value={lec.subject}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "subject",
                                  e.target.value
                                )
                              }
                              className="form-control"
                            />
                          </td>
                          <td>
                            <select
                              className="form-select"
                              value={lec.faculty}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "faculty",
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Select Faculty</option>
                              {availableFaculty[index]?.map((f) => (
                                <option key={f} value={f}>
                                  {f}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-primary me-2"
                              onClick={() => sendRequest(index)}
                            >
                              Request
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm "
                              onClick={() => {
                                setLectures(
                                  lectures.filter((_, i) => i !== index)
                                );
                              }}
                            >
                              <span>❌</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={addLectureRow}
                >
                  Add Lecture
                </button>
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
}

export default ApplyLeave;
