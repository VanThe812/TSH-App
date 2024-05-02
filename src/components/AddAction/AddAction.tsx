import React, { useLayoutEffect, useState } from "react";
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLoading, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar, useIonToast } from "@ionic/react";
import { set, useForm } from "react-hook-form";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./style.scss";
import {
  faCircleCheck,
  faClose,
  faDoorClosed,
  faDroplet,
  faLightbulb,
  faQuestion,
  faTemperatureThreeQuarters,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OutLetIcon from "../../assets/icons/outlet";
import CircleExclamationIcon from "../../assets/icons/CircleExclamation";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { addDeiveToHomeAsync, checkDeviceAvailableAsync, getStatusConfirmAsync, updateDeviceAsync } from "../../actions/DeviceAction";
import { RootState } from "../../stores";
import { getAllMyRoomAsync } from "../../actions/RoomAction";
import { key } from "ionicons/icons";


interface AddDevicesSheetProps {
  onClose: () => void;
}


const AddActionSheet: React.FC<AddDevicesSheetProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [titleLoading, setTitleLoading] = useState('Please wait...');
  const dispatch = useDispatch();
  const userDataRedux = useSelector((state: RootState) => state.user.user);
  const [presentToast] = useIonToast(); // To show a toast message


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();



  const onSubmitStep = async (data: any) => {
    console.log(data);


  };


  useLayoutEffect(() => {
    setStep(0);
  }, []);

  const renderFormStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <SwiperSlide key={step}>
            <form className="add-devices-form ion-padding" onSubmit={handleSubmit(onSubmitStep)}>
              <IonHeader>
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonButton >Cancel</IonButton>
                  </IonButtons>
                  <IonTitle>Add action</IonTitle>
                  <IonButtons slot="end">
                    <IonButton strong={true} onClick={() => confirm()}>
                      Confirm
                    </IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
              <IonContent className="ion-padding">
                <IonItem>
                  <IonSelect
                    mode="ios"
                    aria-label="rooms"
                    interface="action-sheet"
                    placeholder="Select sensor device"
                    label="Sensor Device"
                    className="select-rooms"
                    fill="outline"
                  >
                    <IonSelectOption value="">1</IonSelectOption>
                    <IonSelectOption value="">2</IonSelectOption>
                    <IonSelectOption value="">3</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonSelect
                    mode="ios"
                    aria-label="rooms"
                    interface="action-sheet"
                    placeholder="Select sensor device"
                    label="Active status"
                    className="select-rooms"
                    fill="outline"
                  >
                    <IonSelectOption value="">1</IonSelectOption>
                    <IonSelectOption value="">2</IonSelectOption>
                    <IonSelectOption value="">3</IonSelectOption>
                  </IonSelect>

                </IonItem>

                <IonItem>
                  <IonInput
                    label="Device code"
                    labelPlacement="floating"
                    fill="outline"
                    type="text"
                    mode="md"
                    className="signup-form-item-input add-devices-form-input"
                    {...register("deviceCode", { required: true })}
                  />
                </IonItem>


              </IonContent>
            </form>
          </SwiperSlide>
        );
      case 1:
        return (
          <SwiperSlide key={step}>
            <form className="add-devices-form ion-padding" onSubmit={handleSubmit(onSubmitStep)}>
              <div className="add-devices-form ion-padding">
                <IonText className="add-devices-form-header">Confirm Device</IonText>
                <div className="add-device-card ion-padding">
                  {/* {deviceData.type == "outlet" && ( */}
                  <div className="add-device-card-icon-box">
                    <OutLetIcon className="add-device-card-icon-custom add-device-card-icon" />
                  </div>
                  {/* )} */}
                  {/* {deviceData.type != "outlet" && (
                    <div className="add-device-card-icon-box">
                      <FontAwesomeIcon
                        className="add-device-card-icon"
                        icon={ItemIcon(deviceData.type)}
                      />
                    </div>
                  )} */}
                  <IonButton type="submit">
                    Confirm Device
                  </IonButton>
                </div>
              </div>
            </form>
          </SwiperSlide>
        );
      case 2:
        return (
          <SwiperSlide key={step}>
            <form className="add-devices-form ion-padding" onSubmit={handleSubmit(onSubmitStep)}>

              <IonButton type="submit">Submit</IonButton>
            </form>
          </SwiperSlide>
        );
      case 3:
        return (
          <SwiperSlide key={step}>
            <form className="add-devices-form ion-padding" onSubmit={handleSubmit(onSubmitStep)}>
              <IonText className="add-devices-form-header">Add Device</IonText>
              <IonText className="add-devices-form-sub-header">
                Enter Rooms of the device.
              </IonText>
              <IonInput
                label="Rooms Name"
                color={errors.deviceCode ? "danger" : "light"}
                labelPlacement="floating"
                fill="outline"
                type="text"
                mode="md"
                className="signup-form-item-input add-devices-form-input"
                {...register("RoomName", { required: true })}
              />
              <IonText className="add-devices-form-sub-header">
                {errors.deviceCode && "Enter Rooms name."}
              </IonText>

              <IonButton type="submit">Submit</IonButton>
            </form>
          </SwiperSlide>
        );

      default:
        return (
          <SwiperSlide key={step}>
            <div className="add-device-card ion-padding">
              <div className="add-device-card-icon-box">
                <FontAwesomeIcon
                  className="add-device-card-icon add-device-card-icon-success"
                  mode={"outline"}
                  icon={faCircleCheck}
                />
              </div>
              <IonText className="add-devices-form-header">Add Devices Success Fully!</IonText>
              <IonButton onClick={onClose}>Done</IonButton>
            </div>
          </SwiperSlide>
        );
    }
  };

  return (
    <div>
      <Swiper noSwiping >
        {renderFormStep(step)}
      </Swiper>
      <IonLoading
        isOpen={loading}
        message={titleLoading}
        spinner="circles" // Use 'circles' spinner style
      />
    </div>
  );
};

export default AddActionSheet;