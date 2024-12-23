import React from "react";

const RegistrationForm = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "0", padding: "0" }}>

      {/* Registration Section */}
      <section style={{ textAlign: "center", margin: "20px" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>Get Yourself Registered</h2>
        <form style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          <input type="text" placeholder="Full Name" style={inputStyle} />
          <input type="email" placeholder="Enter Email Id" style={inputStyle} />
          <input type="tel" placeholder="Contact" style={inputStyle} />
          <input type="password" placeholder="Create Password" style={inputStyle} />
          <input type="password" placeholder="Confirm Password" style={inputStyle} />
          <input type="text" placeholder="Medical License Number" style={inputStyle} />
          <input type="text" placeholder="Clinic/Workplace Name" style={inputStyle} />
          <input type="text" placeholder="Street Address" style={{ ...inputStyle, width: "90%" }} />
          <input type="text" placeholder="City" style={inputStyle} />
          <input type="text" placeholder="State" style={inputStyle} />
          <input type="text" placeholder="ZipCode" style={inputStyle} />
          <input type="text" placeholder="India" style={{ ...inputStyle, width: "45%", backgroundColor: "#f0f0f0" }} disabled />
          <input type="text" placeholder="Specialization" style={inputStyle} />
          <input type="number" placeholder="Experience(Yrs)" style={inputStyle} />
          <input type="text" placeholder="Days Available" style={inputStyle} />
          <input type="text" placeholder="Clinic Timings" style={inputStyle} />
          <textarea placeholder="Write About Yourself Here......" style={{ ...inputStyle, height: "100px", width: "90%" }} />
          <input type="file" placeholder="Upload Photo for Profile" style={{ ...inputStyle, width: "90%" }} />
          <input type="url" placeholder="Enter website URL if Available" style={{ ...inputStyle, width: "90%" }} />
          <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "20px 0" }}>
            <button type="button" style={cancelBtnStyle}>Cancel</button>
            <button type="submit" style={submitBtnStyle}>Submit</button>
          </div>
        </form>
      </section>

    </div>
  );
};

// Inline Styles
const inputStyle = {
  width: "45%",
  padding: "10px",
  margin: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px"
};

const cancelBtnStyle = {
  backgroundColor: "red",
  color: "white",
  padding: "10px 20px",
  marginRight: "10px",
  cursor: "pointer",
  border: "none"
};

const submitBtnStyle = {
  backgroundColor: "#142850",
  color: "white",
  padding: 
  "10px 20px",
  cursor: "pointer",
  border: "none"
};

export default RegistrationForm;