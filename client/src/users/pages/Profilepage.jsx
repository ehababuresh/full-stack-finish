
// export default ProfilePage;
import React, { useEffect, useState } from "react";
import { useUser } from "../providers/UserProvider";
import ROUTES from "../../routes/routesModel";
import { Navigate } from "react-router-dom";
import { fetchUserInfo, saveUserInfo } from "../../cards/services/userApiService";
import useAxios from "../../hooks/useAxios";
// Import the UserForm component
import UserForm from "../components/UserForm";
import { green, red } from "@mui/material/colors";

import { useSnack } from "../../providers/SnackbarProvider";
import signupSchema from "../models/joi-schema/signupSchema";



const ProfilePage = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    // Default data or data fetched from your backend
    first: "",
    middle: "",
    last: "",
    phone: "",
    email: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
    isBusiness: false,
    url: "",
    alt: "",
    description: ""
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  useAxios();

  const snack = useSnack();
  

  useEffect(() => {
    if (!user?._id) {
      return;
    }

    fetchUserInfo(user._id)
      .then((res) => {
        const { name, address, image } = res;

        setFormData({
          first: name.first,
          middle: name.middle,
          last: name.last,
          phone: res.phone,
          email: res.email,
          state: address.state,
          country: address.country,
          city: address.city,
          street: address.street,
          houseNumber: address.houseNumber,
          zip: address.zip,
          isBusiness: res.isBusiness,
          url: image.url,
          alt: image.alt,
          description: res.description || ""
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user?._id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    saveUserInfo(user._id, {
      name: {
        first: formData.first,
        middle: formData.middle,
        last: formData.last
      },
      phone: formData.phone,
      address: {
        state: formData.state,
        country: formData.country,
        city: formData.city,
        street: formData.street,
        houseNumber: Number(formData.houseNumber),
        zip: formData.zip
      },
      image: {
        url: formData.url || "",
        alt: formData.alt || ""
      },
      description: formData.description
    })
      .then((res) => {
        const { normalizedUser } = res;
        const { name, address, image } = normalizedUser;

        setFormData({
          first: name.first,
          middle: name.middle,
          last: name.last,
          phone: res.phone,
          email: res.email,
          state: address.state,
          country: address.country,
          city: address.city,
          street: address.street,
          houseNumber: address.houseNumber,
          zip: address.zip,
          isBusiness: res.isBusiness,
          url: image.url,
          alt: image.alt,
          
          description: res.description || ""
        });

        setSuccessMessage(<span style={{color: 'blue', fontSize: '30px' }}>Profile updated successfully!</span>);
        snack ("success" , "Profile updated successfully! ");
        
      })
      .catch((err) => {
        setErrorMessage(<span style={{color: 'red', fontSize: '30px' }}>Failed to update profile</span>);
        console.error(err);
      });
  };

  const handleReset = (event) => {
    event.preventDefault();
    setFormData({
      first: "",
      middle: "",
      last: "",
      phone: "",
      email: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
      isBusiness: "",
      url: "",
      alt: "",
      description: ""
    });
  };

  const handleFormChange = (event) => {
    // Handle form change here
    // console.log("Form changed!");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  
  if (!user) return <Navigate replace to={ROUTES.ROOT} />;
  return (
    <div>
      {/* UserForm component */}
      <UserForm
        onSubmit={handleSubmit}
        onReset={handleReset}
        onFormChange={handleFormChange}
        title="User Profile Form"
        errors={{}}
        data={formData}
        onInputChange={handleInputChange}
        setData={setFormData}
      />

      {/* Display success message */}
      {successMessage && (
        <div className="message success-message">
          {successMessage}
        </div>
      )}

      {/* Display error message */}
      {errorMessage && (
        <div className="message error-message">
          {errorMessage}
        </div>
      )}

      {/* UserProfile component */}
      {/* <UserProfile data={formData} /> */}
    </div>
  );
};

export default ProfilePage;
