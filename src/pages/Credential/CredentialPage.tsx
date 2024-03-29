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
} from "@ionic/react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faHouseSignal } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import ForgotPasswordPage from "../ForgotPassword/ForgotPassword";
interface CredentialState {
  username: string;
  password: string;
}

const CredentialPage: React.FC = () => {
  const [credentials, setCredentials] = useState<CredentialState>({
    username: "",
    password: "",
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement your login logic here
    console.log(credentials);
  };

  // Inside your component function
  const history = useHistory();

  // Function to navigate to the Forgot Password Screen
  const navigateToForgotPassword = () => {
    history.push("/forgot-password"); // Replace '/forgot-password' with your route path
  };

  return (
    <IonPage className="login-page">
      <IonContent className="ion-padding">
        <div className="login-content">
          <div className="login-logo-box">
            <FontAwesomeIcon icon={faHouseSignal} className="login-logo-icon" />
          </div>
          <form onSubmit={handleLogin} className="login-form">
            <IonInput
              label="username"
              labelPlacement="floating"
              fill="outline"
              type="text"
              name="username"
              mode="md"
              className="login-form-item-input"
              value={credentials.username}
              onIonChange={handleInputChange}
              required
              placeholder="Enter username"
            ></IonInput>
            <IonInput
              label="Password"
              labelPlacement="floating"
              fill="outline"
              type="password"
              name="password"
              mode="md"
              className="login-form-item-input"
              value={credentials.password}
              onIonChange={handleInputChange}
              required
              placeholder="Enter Password"
            ></IonInput>
            <IonButton
              type="submit"
              expand="block"
              className="ion-margin-top round"
            >
              Login
            </IonButton>
            <IonRouterLink
              routerLink="/forgot-password"
              routerDirection="forward"
            >
              <IonText className="login-form-forgot-password">
                Forgot Password
              </IonText>
            </IonRouterLink>
          </form>
        </div>
      </IonContent>
        <IonFooter className="signup-button-container">
          <IonRouterLink routerLink="/signup" routerDirection="forward">
            <IonButton expand="block" color="secondary">
              Sign Up
            </IonButton>
          </IonRouterLink>
        </IonFooter>
    </IonPage>
  );
};

export default CredentialPage;
