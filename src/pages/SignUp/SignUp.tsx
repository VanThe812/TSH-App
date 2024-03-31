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
  IonRadioGroup,
  IonRadio,
  IonSelect,
  IonSelectOption,
  useIonToast,
  IonLoading,
  useIonRouter,
} from "@ionic/react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faHouseSignal } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import ForgotPasswordPage from "../ForgotPassword/ForgotPassword";
import { SignupData } from "../../reducers/userSlice";
import { useDispatch } from "react-redux";
import { signupUserAsync } from "../../actions/UserAction";
import { useSelector } from "react-redux";
import { RootState } from "../../stores";
interface CredentialState extends SignupData {
  confirmPassword: string;
}

const SignUpPage: React.FC = () => {

  const router = useIonRouter();
  const [formData, setFormData] = useState<CredentialState>({
    account: "",
    fullname: "",
    email: "",
    gender: "male",
    dateOfBirth: undefined,
    password: "",
    address: "",
    confirmPassword: "",
  });

  const loading = useSelector((state: RootState) => state.user.loading);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };
  const handleDateTimeChange = (event: any) => {
    const { name, value } = event.target;
    console.log(name, value, { ...formData, [name]: Date.parse(value) / 1000 });
    setFormData({ ...formData, [name]: Date.parse(value) / 1000 });
  };

  function formatUnixTimestamp(timestamp: number) {
    const date = new Date(timestamp * 1000);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  const [errorToastMessage, setErrorToastMessage] = useState<string | null>(
    null
  );
  const [successToastMessage, setSuccessToastMessage] = useState<string | null>(
    null
  );

  // Ionic toast instance
  const [presentToast] = useIonToast();
  const dispatch = useDispatch();

  // Handle form submission
  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    // Perform form validation
    if (
      !formData.account ||
      !formData.fullname ||
      !formData.email ||
      !formData.dateOfBirth ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      presentToast({ message:"Please fill in all required fields.", duration: 3000, color: "danger"});
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      presentToast({ message:"Invalid email format.", duration: 3000, color: "danger"});
      return;
    }

    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      presentToast({ message:"Password and confirm password do not match.", duration: 3000, color: "danger"});
      return;
    }

    try {
      const submitData: SignupData = {
        account: formData.account,
        fullname: formData.fullname,
        email: formData.email,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        password: formData.password,
        address: formData.address,
      };
      // Dispatch signupUserAsync action
      const action = await dispatch(signupUserAsync(formData));

      // If successful, show success message
      if (signupUserAsync.fulfilled.match(action)) {
        presentToast({ message: "Sign up successful!", duration: 3000, color: "success" });
        history.push("/home"); // Replace '/home' with your route path for home page
        window.location.reload()
        // window.location.reload();
        // Optionally, redirect user to another page
      } else {
        // Handle other errors if needed
        presentToast({ message:"Failed to sign up. Please try again later.", duration: 3000, color: "danger" });
      }
    } catch (error) {
      console.error("Error:", error);
      presentToast({ message:"Failed to sign up. Please try again later.", duration: 3000, color: "danger"});
    }
  };

  // Inside your component function
  const history = useHistory();

  // Function to navigate to the Forgot Password Screen
  const navigateToForgotPassword = () => {
    history.push("/profile/forgot-password"); // Replace '/forgot-password' with your route path
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
            <FontAwesomeIcon
              icon={faHouseSignal}
              className="signup-logo-icon"
            />
          </div>
          <form onSubmit={handleSignup} className="signup-form">
            <IonInput
              label="Username"
              labelPlacement="floating"
              fill="outline"
              type="text"
              name="account"
              mode="md"
              className="signup-form-item-input"
              value={formData.account}
              onIonChange={handleInputChange}
              required
              placeholder="Enter username"
            ></IonInput>
            <IonInput
              label="Email"
              labelPlacement="floating"
              fill="outline"
              type="email"
              name="email"
              mode="md"
              className="signup-form-item-input"
              value={formData.email}
              onIonChange={handleInputChange}
              required
              placeholder="Enter Email"
            ></IonInput>
            <IonInput
              label="Full Name"
              labelPlacement="floating"
              fill="outline"
              type="text"
              name="fullname"
              mode="md"
              className="signup-form-item-input"
              value={formData.fullname}
              onIonChange={handleInputChange}
              required
              placeholder="Enter full name"
            ></IonInput>
            <IonInput
              label="Date of Birth"
              labelPlacement="floating"
              fill="outline"
              type="date"
              name="dateOfBirth"
              mode="md"
              className="signup-form-item-input"
              value={formatUnixTimestamp(formData.dateOfBirth || 0)}
              onIonChange={handleDateTimeChange}
              required
            ></IonInput>
            <IonSelect
              label="Gender"
              name="gender"
              labelPlacement="floating"
              className="signup-form-item-input"
              interface="action-sheet"
              fill="outline"
              mode="md"
              value={formData.gender}
              onIonChange={handleInputChange}
            >
              <IonSelectOption value="male">Male</IonSelectOption>
              <IonSelectOption value="female">Female</IonSelectOption>
              <IonSelectOption value="other">Other</IonSelectOption>
            </IonSelect>
            <IonInput
              label="Address"
              labelPlacement="floating"
              fill="outline"
              type="text"
              name="address"
              mode="md"
              className="signup-form-item-input"
              value={formData.address}
              onIonChange={handleInputChange}
              placeholder="Enter Address"
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
        <IonRouterLink routerLink="/login" routerDirection="forward">
          <IonButton className="ion-margin-top" expand="block" color="secondary">
            Login
          </IonButton>
        </IonRouterLink>
      </IonContent>
      {/* <IonFooter className="signup-button-container">

      </IonFooter> */}
      <IonLoading
        isOpen={loading}
        message={'Please wait...'}
        spinner="circles" // Use 'circles' spinner style
      />
    </IonPage>
  );
};

export default SignUpPage;
