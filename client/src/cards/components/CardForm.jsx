
import React, { useState } from "react";
import { func, object, string } from "prop-types";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import { TextareaAutosize, IconButton, List, ListItem } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useUser } from "../../users/providers/UserProvider";
const CardForm = ({
  onSubmit,
  onReset,
  errors,
  onFormChange,
  onInputChange,
  data,
  title,
  userId,
}) => {
  const [imageFile, setImageFile] = useState(null);
  const { user } = useUser();

  const isAdmin = user?.isAdmin;
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const textareaStyle = {
    width: '100%',
    marginTop: '2rem',
    padding: '1rem', 
    fontSize: '16px', 
    lineHeight: '1.5', 
    border: '1px solid #ccc',
    resize: 'vertical'
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new FormData object and append the selected image file to it
    const formData = new FormData();
    formData.append("image", imageFile);

    // ... Other form data ...

    // Attach the image to your form data
    const imageData = {
      ...data,
      imageUrl: imageFile ? URL.createObjectURL(imageFile) : data.imageUrl,
    };

    onSubmit(formData, imageData);
  };

  if (!isAdmin) {
    return <CardPreview data={data} />
  }

  return (
    <Form
      onSubmit={handleSubmit}
      onReset={onReset}
      errors={errors}
      onChange={onFormChange}
      styles={{ maxWidth: "800px" }}
      title={title}
    >
      <Input
        name="title"
        label="Full Name"
        error={errors.title}
        onChange={onInputChange}
        data={data}
        sm={6}
      />

      <Input
        name="subtitle"
        label="Role"
        error={errors.subtitle}
        onChange={onInputChange}
        data={data}
        sm={6}
      />

        <Input
          name="phone"
          label="phone"
          type="phone"
          error={errors.phone}
          onChange={onInputChange}
          data={data}
          sm={6}
        />

      <Input
        name="email"
        label="email"
        type="email"
        error={errors.email}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
          <Input
            name="webUrl"
            label="תגובות"
            error={errors.webUrl}
            onChange={onInputChange}
            data={data}
            sm={6}
            required={false}
          />

        <Input
          name="imageUrl"
          label="Image"
          type="file" // Set the input type to "file"
          error={errors.imageUrl}
          onChange={handleImageChange} // Use the new handleImageChange function
          data={data}
          sm={6}
          required={false}
        />
     
        <Input
          name="imageAlt"
          label="image alt"
          error={errors.imageAlt}
          onChange={onInputChange}
          data={data}
          sm={6}
          required={false}
        />
      
      <Input
        name="state"
        label="salary"
        error={errors.state}
        onChange={onInputChange}
        data={data}
        sm={6}
        required={false}
      />

      <Input
        name="country"
        label="country"
        error={errors.country}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
        <Input
          name="street"
          label="street"
          error={errors.street}
          onChange={onInputChange}
          data={data}
          sm={6}
        />
     
      
<Input
        name="city"
        label="city"
        error={errors.city}
        onChange={onInputChange}
        data={data}
        sm={6}
      />

        <Input
          name="houseNumber"
          label="houseNumber"
          type="number"
          error={errors.houseNumber}
          onChange={onInputChange}
          data={data}
          sm={6}
        />
      
      {user && user._id === userId && (
        <Input
          name="zip"
          label="zip"
          type="number"
          error={errors.zip}
          onChange={onInputChange}
          data={data}
          sm={6}
          required={false}
        />
      )}
  <TextareaAutosize
  name="description"
  aria-label="textarea"
  placeholder="Enter text up to 5000 characters"
  minRows={3}
  maxRows={500}
  onChange={onInputChange}
  value={data.description || ''}
  // maxLength={1024} // הוסף את זה
  style={{ ...textareaStyle, width: '100%' }}
/>


    </Form>
  );
};


const CardPreview = ({ data }) => {
  const { title, description, state,subtitle,country } = data;

  const cardStyle = {
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: 20,
    maxWidth: 900, 
    margin: '0 auto',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  };

  const stateStyle = {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  };

  const descriptionStyle = {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    width: '100%', 
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <div style={cardStyle}>
      <div style={contentStyle}>
        <h1 style={titleStyle}>{title}</h1>
        <h5 style={stateStyle}> {subtitle}</h5>   <h5 style={stateStyle}> {country}</h5>
        <h5 style={stateStyle}>(שכר: {state})</h5>
        <p style={descriptionStyle}>{description}</p>
      </div>
    </div>
  );
};


CardForm.propTypes = {
  onSubmit: func.isRequired,
  onReset: func.isRequired,
  errors: object.isRequired,
  onFormChange: func.isRequired,
  onInputChange: func.isRequired,
  data: object.isRequired,
  title: string.isRequired,
};

export default React.memo(CardForm);




