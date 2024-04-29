import React, { useLayoutEffect, useState } from "react";
import { IonButton, IonContent, IonInput, IonText } from "@ionic/react";
import { useForm } from "react-hook-form";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./style.scss";
import {
  faCircleCheck,
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

interface AddDevicesSheetProps {
  onClose: () => void;
}
const deviceData = {
  type: "temperature", //temperature || door || switch || light
  timecreate: "________", // datetime
  timemodifile: "________", // datetime
  room_name: "cscs", // string
  current_status: "on", //enum on off
  sensor_data: "38°C", //0 - 100
  name_in_home: "temperature sensor",
  version: "1.1", //string
};

const AddDevicesSheet: React.FC<AddDevicesSheetProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const ItemIcon = (type: string) => {
    switch (type) {
      case "temperature":
        return faTemperatureThreeQuarters;
      case "door":
        return faDoorClosed;
      case "light":
        return faLightbulb;
      case "switch":
        return faToggleOn;
      case "humidity":
        return faDroplet;
      default:
        return faQuestion;
    }
  };

  const onSubmitStep = (data: any) => {
    console.log(data);
    // Handle form submission here
    goToNextStep();
  };

  const goToNextStep = () => {
    console.log(step)
    setStep(step + 1);
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
              <IonText className="add-devices-form-header">Add Device</IonText>
              <IonText className="add-devices-form-sub-header">
                Enter code of the device.
              </IonText>
              <IonInput
                label="Device code"
                color={errors.deviceCode ? "danger" : "light"}
                labelPlacement="floating"
                fill="outline"
                type="text"
                mode="md"
                className="signup-form-item-input add-devices-form-input"
                {...register("deviceCode", { required: true })}
              />
              <IonText className="add-devices-form-sub-header">
                {errors.deviceCode && "Enter code of the device."}
              </IonText>

              <IonButton type="submit">Submit</IonButton>
            </form>
          </SwiperSlide>
        );
      case 1:
        return (
        <SwiperSlide key={step}>
          <form className="add-devices-form ion-padding" onSubmit={handleSubmit(onSubmitStep)}>
          <div className="add-devices-form ion-padding">
            <IonText className="add-devices-form-header">Add Device</IonText>
            <div className="add-device-card ion-padding">
              {deviceData.type == "outlet" && (
                <div className="add-device-card-icon-box">
                  <OutLetIcon className="add-device-card-icon-custom add-device-card-icon" />
                </div>
              )}
              {deviceData.type != "outlet" && (
                <div className="add-device-card-icon-box">
                  <FontAwesomeIcon
                    className="add-device-card-icon"
                    icon={ItemIcon(deviceData.type)}
                  />
                </div>
              )}
              <IonButton type="submit">
                Add Devices
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
                <IonText className="add-devices-form-header">Add Device</IonText>
                <IonText className="add-devices-form-sub-header">
                  Enter Name of the device.
                </IonText>
                <IonInput
                  label="Device Name"
                  color={errors.deviceCode ? "danger" : "light"}
                  labelPlacement="floating"
                  fill="outline"
                  type="text"
                  mode="md"
                  className="signup-form-item-input add-devices-form-input"
                  {...register("deviceName", { required: true })}
                />
                <IonText className="add-devices-form-sub-header">
                  {errors.deviceCode && "Enter code of the device."}
                </IonText>
  
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
    <IonContent>
      <Swiper noSwiping>
        {renderFormStep(step)}
      </Swiper>
    </IonContent>
  );
};

export default AddDevicesSheet;
