import React from "react";

const LeaveDetailsForm = ({ formData, handleInputChange }) => {
  return (
    <div className="row">
      {/* Name & Post */}
      <div className="col-md-6 mb-3">
        <label className="form-label">1) Name of the Applicant:</label>
        <input
          type="text"
          name="applicantName"
          className="form-control"
          value={formData.applicantName}
          onChange={handleInputChange}
        />
      </div>
      <div className="col-md-6 mb-3">
        <label className="form-label">2) Post Held:</label>
        <input
          type="text"
          name="postHeld"
          className="form-control"
          value={formData.postHeld}
          onChange={handleInputChange}
        />
      </div>

      {/* Leave Days & Nature */}
      <div className="col-md-6 mb-3">
        <label className="form-label">3) No of Days of Leave Required:</label>
        <input
          type="number"
          name="numberOfDays"
          className="form-control"
          value={formData.numberOfDays}
          onChange={handleInputChange}
        />
      </div>
      <div className="col-md-6 mb-3">
        <label className="form-label">4) Nature of Leave:</label>
        <select
          name="natureOfLeave"
          className="form-select"
          value={formData.natureOfLeave}
          onChange={handleInputChange}
        >
          <option>Casual Leave</option>
          <option>Medical Leave</option>
          <option>Earned Leave</option>
          <option>"C" Off</option>
          <option>LWP</option>
        </select>
      </div>

      {/* Leave Period */}
      <div className="col-md-6 mb-3">
        <label className="form-label">5) Period of Leave (From):</label>
        <input
          type="date"
          name="startDate"
          className="form-control"
          value={formData.startDate}
          onChange={handleInputChange}
        />
      </div>
      <div className="col-md-6 mb-3">
        <label className="form-label">To:</label>
        <input
          type="date"
          name="endDate"
          className="form-control"
          value={formData.endDate}
          onChange={handleInputChange}
        />
      </div>

      {/* Address & Reason */}
      <div className="col-md-6 mb-3">
        <label className="form-label">6) Leave Address:</label>
        <input
          type="text"
          name="leaveAddress"
          className="form-control"
          value={formData.leaveAddress}
          onChange={handleInputChange}
        />
      </div>
      <div className="col-md-6 mb-3">
        <label className="form-label">7) Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          className="form-control"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
      </div>
      <div className="col-md-12 mb-3">
        <label className="form-label">8) Reason:</label>
        <textarea
          name="reason"
          className="form-control"
          value={formData.reason}
          onChange={handleInputChange}
        ></textarea>
      </div>
    </div>
  );
};

export default LeaveDetailsForm;
