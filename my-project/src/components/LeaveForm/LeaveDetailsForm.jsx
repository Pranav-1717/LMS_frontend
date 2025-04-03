import React, { useState, useEffect } from "react";
import { saveFormDataToSession, getFormDataFromSession } from "../../utils/dataUtils";
import { uploadFile, setAuthToken } from "../../api/api"; // Adjust the import path as necessary

const LeaveDetailsForm = ({ formData, handleInputChange, errors, handleFileUpload }) => {
  const [localFormData, setLocalFormData] = useState(getFormDataFromSession() || formData);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("l_token");
  setAuthToken(token); // Set the token for API requests

  useEffect(() => {
    const dataFromSession = getFormDataFromSession();
    const updatedData = dataFromSession || formData;
    
    setLocalFormData(updatedData); // Only set once based on session data or formData
    setShowFileUpload(updatedData.natureOfLeave === "MEDICAL_LEAVE");
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...localFormData, [name]: value };
    setLocalFormData(updatedData);
    handleInputChange(e);
    saveFormDataToSession(updatedData);

    if (name === "natureOfLeave") {
      setShowFileUpload(value === "MEDICAL_LEAVE");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Update file state when file is selected
  };

  const handleUploadClick = async () => {
    if (!file) return alert("Please select a file to upload.");
    
    const formData = new FormData();
    formData.append("file", file);  // File is uploaded with the key 'file'
  
    try {
      // Make sure to use the right method (POST or PUT) and endpoint
      const response = await uploadFile(formData); // Send formData containing the file
      console.log("File upload response:", response); // Log the response for debugging
      console.log("File upload response data:", response.data); // Log the response data for debugging
      
      if (response) {
        alert("File uploaded successfully!");
        
        // Now update localFormData with the uploaded file URL
        setLocalFormData((prevData) => ({
          ...prevData,
          imageURL: response.data,  // Assuming the response contains the file URL
        }));
        
        // Call the parent function to update the parent formData state
        handleFileUpload(response.data);
        
      } else {
        alert("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }
  };

  return (
    <div className="container mt-4 p-2">
      <div className="text-center mb-4">
        <h4 className="fw-bold text-primary">PUNE INSTITUTE OF COMPUTER TECHNOLOGY</h4>
        <h6 className="mb-0 text-primary">DHANKAWADI, PUNE - 411 043</h6>
        <h5 className="fw-bold mt-2">LEAVE APPLICATION</h5>
        <hr />
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">1) Name of the Applicant:</label>
          <input
            type="text"
            name="applicantName"
            className="form-control"
            value={localFormData.applicantName || ""}
            onChange={handleChange}
          />
          {errors.applicantName && <p className="text-danger">{errors.applicantName}</p>}
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">2) Post Held:</label>
          <input
            type="text"
            name="postHeld"
            className="form-control"
            value={localFormData.postHeld || ""}
            onChange={handleChange}
          />
          {errors.postHeld && <p className="text-danger">{errors.postHeld}</p>}
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">3) No of Days of Leave Required:</label>
          <input
            type="number"
            name="numberOfDays"
            className="form-control"
            value={localFormData.numberOfDays || ""}
            onChange={handleChange}
          />
          {errors.numberOfDays && <p className="text-danger">{errors.numberOfDays}</p>}
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">4) Nature of Leave:</label>
          <select
            name="natureOfLeave"
            className="form-select"
            value={localFormData.natureOfLeave || ""}
            onChange={handleChange}
          >
            <option value="">Select Leave Type</option>
            <option>COMMON_LEAVE</option>
            <option>MEDICAL_LEAVE</option>
            <option>EARNED_LEAVE</option>
            <option>C_OFF_LEAVE</option>
            <option>LWP_LEAVE</option>
          </select>
          {errors.natureOfLeave && <p className="text-danger">{errors.natureOfLeave}</p>}
        </div>

        {showFileUpload && (
          <div className="col-md-6 mb-3">
            <label className="form-label">Upload Medical Certificate:</label>
            <input
              type="file"
              name="file"
              className="form-control"
              onChange={handleFileChange}
            />
            <button type="button" className="btn btn-secondary mt-2" onClick={handleUploadClick}>
              Upload File
            </button>
            {errors.file && <p className="text-danger">{errors.file}</p>}
          </div>
        )}

        <div className="col-md-6 mb-3">
          <label className="form-label">5) Period of Leave (From):</label>
          <input
            type="date"
            name="startDate"
            className="form-control"
            value={localFormData.startDate || ""}
            onChange={handleChange}
          />
          {errors.startDate && <p className="text-danger">{errors.startDate}</p>}
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">To:</label>
          <input
            type="date"
            name="endDate"
            className="form-control"
            value={localFormData.endDate || ""}
            onChange={handleChange}
          />
          {errors.endDate && <p className="text-danger">{errors.endDate}</p>}
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">6) Leave Address:</label>
          <input
            type="text"
            name="leaveAddress"
            className="form-control"
            value={localFormData.leaveAddress || ""}
            onChange={handleChange}
          />
          {errors.leaveAddress && <p className="text-danger">{errors.leaveAddress}</p>}
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">7) Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            className="form-control"
            value={localFormData.phoneNumber || ""}
            onChange={handleChange}
          />
          {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber}</p>}
        </div>
        <div className="col-md-12 mb-3">
          <label className="form-label">8) Reason:</label>
          <textarea
            name="reason"
            className="form-control"
            value={localFormData.reason || ""}
            onChange={handleChange}
          ></textarea>
          {errors.reason && <p className="text-danger">{errors.reason}</p>}
        </div>
      </div>
    </div>
  );
};

export default LeaveDetailsForm;
