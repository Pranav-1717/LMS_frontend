// Save leave form data to sessionStorage (clears on browser close)
export const saveFormDataToSession = (formData) => {
    sessionStorage.setItem("leaveFormData", JSON.stringify(formData));
  };
  
  // Retrieve leave form data from sessionStorage
  export const getFormDataFromSession = () => {
    const storedData = sessionStorage.getItem("leaveFormData");
    return storedData ? JSON.parse(storedData) : null;
  };
  
  // Save alternate arrangements to localStorage (persists after refresh)
  export const saveLecturesToLocal = (lectures) => {
    localStorage.setItem("alternateLectures", JSON.stringify(lectures));
  };
  
  // Retrieve alternate arrangements from localStorage
  export const getLecturesFromLocal = () => {
    const storedLectures = localStorage.getItem("alternateLectures");
    return storedLectures ? JSON.parse(storedLectures) : [];
  };
  
  // Clear both sessionStorage & localStorage on form submission
  export const clearAllStoredData = () => {
    sessionStorage.removeItem("leaveFormData");
    localStorage.removeItem("alternateLectures");
  };
  