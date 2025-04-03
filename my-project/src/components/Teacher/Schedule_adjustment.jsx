import React, { useEffect, useState } from "react";
import {getAlternateArrangements,acceptSubstituteRequest,rejectSubstituteRequest,setAuthToken} from '../../api/api'
// import { AuthContext } from "../../context/AuthContext";

function Schedule_adjustment() {
  //  const { token } = React.useContext(AuthContext);
  //  console.log("Schedule_adjustment" , token);
  const [arrangements, setArrangements] = useState([]); // Store multiple requests

  const token = localStorage.getItem('l_token');
  setAuthToken(token);
  // Fetch arrangements on component mount
  useEffect(() => {
    const fetchArrangements = async () => {
      try {
        var response = await getAlternateArrangements();
        setArrangements(response.data || []); // Ensure it's an array
      } catch (error) {
        console.error("Error fetching alternate arrangements", error);
      }
    };

    fetchArrangements();
  }, []);

  const handleApprove = async (id)=>{
    try{
      console.log("ID",id)
      var approve_response = await acceptSubstituteRequest(id);
      console.log(approve_response)
      var response = await getAlternateArrangements();
      setArrangements(response.data || []);

    }
    catch(error){
      console.log(error);
      return;
    }
  }

  const handleReject = async (id)=>{
    try{
      console.log("ID",id)
      var reject_response = await rejectSubstituteRequest(id);
      console.log(reject_response)
    }
    catch(error){
      console.log(error);
      var response = await getAlternateArrangements();
      setArrangements(response.data || []);
      return;
    }
  }

  return (
    <div className="container mt-4">
    <h2 className="text-center mb-4">Pending Requests</h2>

    {arrangements.length > 0 ? (
      arrangements.map((data) => (
        <div key={data.id} className="card mb-3 shadow-sm">
          <div className="card-body">
            <h5><strong>Sender ID:</strong> {data.senderTeacherRegistrationId || "Unknown"}</h5>
            <p><strong>Message:</strong> {data.message}</p>

            <h6>Lecture Details</h6>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td><strong>Date</strong></td>
                  <td>{data.details.date}</td>
                </tr>
                <tr>
                  <td><strong>Time</strong></td>
                  <td>{data.details.startTime} to {data.details.endTime}</td>
                </tr>
                <tr>
                  <td><strong>Division</strong></td>
                  <td>{data.details.division || "N/A"}</td>
                </tr>
                <tr>
                  <td><strong>Subject</strong></td>
                  <td>{data.details.subject}</td>
                </tr>
              </tbody>
            </table>

            {/* Buttons */}
            <div className="d-flex gap-3 ">
              <button className="btn btn-success" onClick={()=>handleApprove(data.id)}>Approve</button>
              <button className="btn btn-danger" onClick={()=>handleReject(data.id)}>Reject</button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center">No pending leave requests.</p>
    )}
  </div>
  )
}

export default Schedule_adjustment