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
  IonToast,
  IonLoading,
} from "@ionic/react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faHouseSignal } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import ForgotPasswordPage from "../ForgotPassword/ForgotPassword";
import { useDispatch } from "react-redux";
import {UserLoginParams} from "../../reducers/userSlice"
import { useSelector } from "react-redux";
import { RootState } from "../../stores";
import { loginUserAsync } from "../../actions/UserAction";

const CredentialPage: React.FC = () => {
  const dispatch = useDispatch();
  // Inside your component function
  const loginError = useSelector((state: RootState) => state.user.loginError);
  const loading = useSelector((state: RootState) => state.user.loading);
  const history = useHistory();
  const [credentials, setCredentials] = useState<UserLoginParams>({
    account: "",
    password: "",
  });
  const [showToast, setShowToast] = useState(false);
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
    console.log(credentials)
  };


  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Dispatch loginUserAsync action with credentials
      const action = await dispatch(loginUserAsync(credentials));
      console.log(action)
      if (loginUserAsync.fulfilled.match(action)) {
        history.push("/home"); // Replace '/home' with your route path for home page
        window.location.reload()
      } else {
        setShowToast(true)
        console.error("Login failed:", action?.error?.message);
      }
    } catch (error) {
      setShowToast(false)

      console.error("Login failed:", error);
      // Handle login error (e.g., show error message)
    }
  };



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
              name="account"
              mode="md"
              autocorrect="on"
              className="login-form-item-input"
              value={credentials.account}
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
        <IonToast
        isOpen={!!showToast}
        onDidDismiss={() => setShowToast(false)}
        message={loginError ?? ''}
        duration={1000}
        color="danger"
        position="bottom"
      />
      <IonLoading
        isOpen={loading}
        message={'Please wait...'}
        spinner="circles" // Use 'circles' spinner style
      />
    </IonPage>
  );
};

export default CredentialPage;
