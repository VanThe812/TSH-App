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
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import React, { useEffect } from "react";
import "./style.scss";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";
import { updateUserInfoAsync } from "../../actions/UserAction";

const PersonalInformationPage: React.FC = () => {
  const dispatch = useDispatch();
  const { handleSubmit, control, formState: { errors }, setValue,register } = useForm();
  const loading = useSelector((state: RootState) => state.user.loading);
  const userDataRedux = useSelector((state: RootState) => state.user.user);
  const [presentToast] = useIonToast();

  const handleUpdateData = () => {
    // Implement your update logic here, e.g., make an API call to update the user data
    console.log("Updated data:", userDataRedux);
  };

  useEffect(() => {
    if (userDataRedux) {
      setValue("email", userDataRedux.email || '');
      setValue("fullname", userDataRedux.fullname || '');
      setValue("dateOfBirth", formatUnixTimestamp(userDataRedux.dateOfBirth));
      setValue("gender", userDataRedux.gender || '');
      setValue("address", userDataRedux.address || '');
    }
  }, [userDataRedux, setValue]);

  function formatUnixTimestamp(timestamp: number) {
    const date = new Date(timestamp * 1000);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const onSubmit = async (data: any) => {
    try {
      const submitData = {
        ...data,
        dateOfBirth: Date.parse(data.dateOfBirth) / 1000, // Convert date string to timestamp
        token: userDataRedux?.token
      };
      // Dispatch updateUserInfoAsync action
      const action = await dispatch(updateUserInfoAsync(submitData));


      // If successful, show success message
      if (updateUserInfoAsync.fulfilled.match(action)) {
        presentToast({ message: "Update successful!", duration: 3000, color: "success" });
        // Optionally, redirect user to another page
      } else {
        // Handle other errors if needed
        presentToast({ message: "Failed Update Data User. Please try again later", duration: 3000, color: "danger" });
      }
    } catch (error) {
      console.error("Error:", error);
      presentToast({ message: "Failed Update Data User. Please try again later.", duration: 3000, color: "danger" });
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
        <form onSubmit={handleSubmit(onSubmit)} className="signup-form ion-padding">
          <IonInput
            label="Username"
            labelPlacement="floating"
            fill="outline"
            type="text"
            name="account"
            mode="md"
            className="signup-form-item-input"
            value={userDataRedux?.account}
            disabled
          ></IonInput>
          <IonInput
            label="Email"
            labelPlacement="floating"
            fill="outline"
            type="email"
            mode="md"
            className="signup-form-item-input"
            {...register("email", { required: true })}
            placeholder="Enter Email"
          ></IonInput>
          <IonInput
            label="Full Name"
            labelPlacement="floating"
            fill="outline"
            type="text"
            mode="md"
            className="signup-form-item-input"
            {...register("fullname", { required: true })}
            placeholder="Enter full name"
          ></IonInput>
               <IonInput
              label="Date of Birth"
              labelPlacement="floating"
              fill="outline"
              type="date"
              mode="md"
              className="signup-form-item-input"
              {...register("dateOfBirth", { required: true })}
              required
            ></IonInput>
          <IonSelect
            label="Gender"
            labelPlacement="floating"
            className="signup-form-item-input"
            interface="action-sheet"
            fill="outline"
            mode="md"
            {...register("gender", { required: true })}
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
            mode="md"
            className="signup-form-item-input"
            {...register("address", { required: true })}
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
