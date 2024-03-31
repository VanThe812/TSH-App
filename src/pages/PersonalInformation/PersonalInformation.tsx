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
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import React, { useState } from "react";
import "./style.scss";
import { UpdateUserInfoData } from "../../reducers/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../stores";
import { updateUserInfoAsync } from "../../actions/UserAction";
const PersonalInformationPage: React.FC = () => {
  const loading = useSelector((state: RootState) => state.user.loading);
  const userDataRedux = useSelector((state: RootState) => state.user.user);

  const [userData, setUserData] = useState<UpdateUserInfoData>(
    {
      email:userDataRedux?.email || '' ,
      dateOfBirth: userDataRedux?.dateOfBirth || -1,
      gender: userDataRedux?.gender || 'male',
      fullname:userDataRedux?.fullname || '',
      address:userDataRedux?.address || '',
      token:userDataRedux?.token || ''
    }
  );
  const [presentToast] = useIonToast();
  const dispatch = useDispatch();
  function formatUnixTimestamp(timestamp: number) {
    const date = new Date(timestamp * 1000);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };


  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    console.log(name, value);
    setUserData({ ...userData, [name]: value });
  };
  const handleDateTimeChange = (event: any) => {
    const { name, value } = event.target;
    console.log(name, value, { ...userData, [name]: Date.parse(value) / 1000 });
    setUserData({ ...userData, [name]: Date.parse(value) / 1000 });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  console.log(userDataRedux)

  const handleUpdateData = () => {
    // Implement your update logic here, e.g., make an API call to update the user data
    console.log("Updated data:", userData);
  };
  // Handle form submission
  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    // Perform form validation
    if (
      !userData.email ||
      !userData.fullname ||
      !userData.address ||
      !userData.gender ||
      !userData.dateOfBirth
    ) {
      presentToast({ message:"Please fill in all required fields.", duration: 3000, color: "danger"});
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      presentToast({ message:"Invalid email format.", duration: 3000, color: "danger"});
      return;
    }

    try {
      const submitData: UpdateUserInfoData = {
        email:userData.email,
        fullname:userData.fullname,
        address:userData.address,
        gender:userData.gender,
        dateOfBirth:userData.dateOfBirth,
        token:userData.token
      };
      // Dispatch signupUserAsync action
      const action = await dispatch(updateUserInfoAsync(userData));

      // If successful, show success message
      if (updateUserInfoAsync.fulfilled.match(action)) {
        presentToast({ message: "Update successful!", duration: 3000, color: "success" });
        // window.location.reload();
        // Optionally, redirect user to another page
      } else {
        // Handle other errors if needed
        presentToast({ message:"Failed Update Data User. Please try again later", duration: 3000, color: "danger" });
      }
    } catch (error) {
      console.error("Error:", error);
      presentToast({ message:"Failed Update Data User. Please try again later.", duration: 3000, color: "danger"});
    }
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
      <form onSubmit={handleSignup} className="signup-form">
            <IonInput
              label="Username"
              labelPlacement="floating"
              fill="outline"
              type="text"
              name="account"
              mode="md"
              className="signup-form-item-input"
              value={userDataRedux?.account}
              onIonChange={handleInputChange}
              disabled
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
              value={userData.email}
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
              value={userData.fullname}
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
              value={formatUnixTimestamp(userData.dateOfBirth || -1)}
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
              value={userData.gender}
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
              value={userData.address}
              onIonChange={handleInputChange}
              placeholder="Enter Address"
            ></IonInput>
            <IonButton type="submit" expand="block" className="ion-margin-top">
              Update
            </IonButton>
            
          </form>
      </IonContent>
    </IonPage>
  );
};
export default PersonalInformationPage;
