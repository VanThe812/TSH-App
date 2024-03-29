import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonNavLink,
  IonRouterLink,
  IonFooter,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
} from "@ionic/react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faHouseSignal } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import ForgotPasswordPage from "../ForgotPassword/ForgotPassword";
interface CredentialState {
  username: string;
  dob:string;
  fullName:string;
  password: string;
  confirmPassword:string;
}

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<CredentialState>({
    username: '',
    fullName: '',
    dob: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement your login logic here
    console.log(formData);
  };

  // Inside your component function
  const history = useHistory();

  // Function to navigate to the Forgot Password Screen
  const navigateToForgotPassword = () => {
    history.push("/forgot-password"); // Replace '/forgot-password' with your route path
  };

  return (
    <IonPage className="signup-page">
            <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton defaultHref="/login" />
          </IonButtons>
          <IonTitle>Sign up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="signup-content">
          <div className="signup-logo-box">
            <FontAwesomeIcon icon={faHouseSignal} className="signup-logo-icon" />
          </div>
          <form onSubmit={handleSignup} className="signup-form">
          <IonInput
        label="Username"
        labelPlacement="floating"
        fill="outline"
        type="text"
        name="username"
        mode="md"
        className="signup-form-item-input"
        value={formData.username}
        onIonChange={handleInputChange}
        required
        placeholder="Enter username"
      ></IonInput>
      <IonInput
        label="Full Name"
        labelPlacement="floating"
        fill="outline"
        type="text"
        name="fullName"
        mode="md"
        className="signup-form-item-input"
        value={formData.fullName}
        onIonChange={handleInputChange}
        required
        placeholder="Enter full name"
      ></IonInput>
      <IonInput
        label="Date of Birth"
        labelPlacement="floating"
        fill="outline"
        type="date"
        name="dob"
        mode="ios"
        className="signup-form-item-input"
        value={formData.dob}
        onIonChange={handleInputChange}
        required
      ></IonInput>
      <IonInput
        label="Password"
        labelPlacement="floating"
        fill="outline"
        type="password"
        name="password"
        mode="md"
        className="signup-form-item-input"
        value={formData.password}
        onIonChange={handleInputChange}
        required
        placeholder="Enter password"
      ></IonInput>
      <IonInput
        label="Confirm Password"
        labelPlacement="floating"
        fill="outline"
        type="password"
        name="confirmPassword"
        mode="md"
        className="signup-form-item-input"
        value={formData.confirmPassword}
        onIonChange={handleInputChange}
        required
        placeholder="Confirm password"
      ></IonInput>
      <IonButton type="submit" expand="block" className="ion-margin-top">
        Sign Up
      </IonButton>
          </form>
        </div>
      </IonContent>
        <IonFooter className="signup-button-container">
          <IonRouterLink routerLink="/login" routerDirection="forward">
            <IonButton expand="block" color="secondary">
              Login
            </IonButton>
          </IonRouterLink>
        </IonFooter>
    </IonPage>
  );
};

export default SignUpPage;
