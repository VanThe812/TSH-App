import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import "./style.scss";
const PersonalInformationPage: React.FC = () => {
  const fakeruserData = {
    _id: "6607f951d0cd757eb83c2466",
    fullname: "top1victory",
    dateOfBirth: 1711798609,
    address: "Address 123",
    email: "top1victory23082018@gmail.com",
    gender: "male",
    account: "top1victory",
    timecreate: 1711798609,
    timemodifile: 1711798609,
    role_id: "660786265f31905c6b79d22a",
    __v: 0,
    status_account: "forgotpass",
    timeaccess: 1711824528,
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDdmOTUxZDBjZDc1N2ViODNjMjQ2NiIsImlhdCI6MTcxMTgyNDY2MCwiZXhwIjoxNzEyNDI5NDYwfQ.3Cr8tpDjG8pMNxrBLEKVFuzzpVhUwuxIc8ZmL3q0Zmc",
  };
  const [userData, setUserData] = useState(fakeruserData);
  const handleInputChange = (key: keyof typeof userData, value: any) => {
    setUserData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleUpdateData = () => {
    // Implement your update logic here, e.g., make an API call to update the user data
    console.log("Updated data:", userData);
  };
  return (
    <IonPage className="personal-information-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Personal Information</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonLabel position="floating">Full Name</IonLabel>
          <IonInput
            labelPlacement="floating"
            fill="outline"
            mode="md"
            className="login-form-item-input"
            value={userData.fullname}
            onIonChange={(e) => handleInputChange("fullname", e.detail.value!)}
          />
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            labelPlacement="floating"
            fill="outline"
            mode="md"
            className="login-form-item-input"
            type="email"
            value={userData.email}
            onIonChange={(e) => handleInputChange("email", e.detail.value!)}
          />
          <IonLabel position="floating">Address</IonLabel>
          <IonInput
            labelPlacement="floating"
            fill="outline"
            mode="md"
            className="login-form-item-input"
            value={userData.address}
            onIonChange={(e) => handleInputChange("address", e.detail.value!)}
          />

          <IonLabel>Gender</IonLabel>
          <IonRadioGroup
            value={userData.gender}
            onIonChange={(e) => handleInputChange("gender", e.detail.value)}
          >
            <IonLabel>Male</IonLabel>
            <IonRadio aria-label="Custom checkbox" slot="start" value="male" />

            <IonLabel>Female</IonLabel>
            <IonRadio
              aria-label="Custom checkbox"
              slot="start"
              value="female"
            />

            <IonLabel>Other</IonLabel>
            <IonRadio aria-label="Custom checkbox" slot="start" value="other" />
          </IonRadioGroup>

          <IonLabel position="floating">Date of Birth</IonLabel>
          <IonInput
            labelPlacement="floating"
            fill="outline"
            mode="md"
            className="login-form-item-input"
            type="date"
            value={userData.dateOfBirth}
            onIonChange={(e) =>
              handleInputChange("dateOfBirth", e.detail.value!)
            }
          />

          <IonButton onClick={handleUpdateData}>Update Data</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
export default PersonalInformationPage;
