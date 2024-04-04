import React from "react";
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
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { UserLoginParams } from "../../reducers/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../stores";
import { loginUserAsync } from "../../actions/UserAction";

const CredentialPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm<UserLoginParams>();
  const loginError = useSelector((state: RootState) => state.user.loginError);
  const loading = useSelector((state: RootState) => state.user.loading);
  const [showToast, setShowToast] = React.useState(false);

  const onSubmit = async (data: UserLoginParams) => {
    try {
      const action = await dispatch(loginUserAsync(data));
      if (loginUserAsync.fulfilled.match(action)) {
        history.push("/home"); // Replace '/home' with your route path for home page
        window.location.reload()
      } else {
        setShowToast(true);
        console.error("Login failed:", action?.error?.message);
      }
    } catch (error) {
      setShowToast(false);
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
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <IonInput
              label="Username"
              labelPlacement="floating"
              fill="outline"
              type="text"
              mode="md"
              className="login-form-item-input"
              {...register("account", { required: true })}
              placeholder="Enter username"
            />
            <IonInput
              label="Password"
              labelPlacement="floating"
              fill="outline"
              type="password"
              mode="md"
              className="login-form-item-input"
              {...register("password", { required: true })}
              placeholder="Enter Password"
            />
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
