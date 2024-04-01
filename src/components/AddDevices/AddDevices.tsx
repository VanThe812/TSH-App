import React, { useState } from "react";
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

interface AddDeviceStepProps {
  onSubmit: (data: any) => void;
  errors: any;
  register: any;
  setIsError: (data: boolean) => void;
  isError: boolean;
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
export const AddDeviceStep1: React.FC<AddDeviceStepProps> = ({
  onSubmit,
  errors,
  register,
  isError,
  setIsError,
}) => {
  return (
    <form className="add-devices-form ion-padding" onSubmit={onSubmit}>
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
  );
};

interface AddDeviceStep3Props {
  onSubmit: (data: any) => void;
  errors: any;
  register: any;
}

export const AddDeviceStep3: React.FC<AddDeviceStep3Props> = ({
  onSubmit,
  errors,
  register,
}) => {
  return (
    <form className="add-devices-form ion-padding" onSubmit={onSubmit}>
      <IonText className="add-devices-form-header">Add Device</IonText>
      <IonText className="add-devices-form-sub-header">
        Enter Name of the device.
      </IonText>
      <IonInput
        label="Rooms Name"
        color={errors.deviceCode ? "danger" : "light"}
        labelPlacement="floating"
        fill="outline"
        type="text"
        mode="md"
        className="signup-form-item-input add-devices-form-input"
        {...register("deviceName", { required: true })}
      />
      <IonText className="add-devices-form-sub-header">
        {errors.deviceCode && "Enter Devices name."}
      </IonText>

      <IonButton type="submit">Submit</IonButton>
    </form>
  );
};
interface AddDeviceStep4Props {
  onSubmit: (data: any) => void;
  errors: any;
  register: any;
}

export const AddDeviceStep4: React.FC<AddDeviceStep3Props> = ({
  onSubmit,
  errors,
  register,
}) => {
  return (
    <form className="add-devices-form ion-padding" onSubmit={onSubmit}>
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
  );
};

const AddDevicesSheet: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isError, setIsError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const swiperRef = React.useRef<any>(null); // Fix TypeScript error

  const onSubmit = (data: any) => {
    console.log(data.deviceCode);

    console.log(data); // You can handle form submission here
    handleOnSetSwiper(1);
  };
  const onSubmitStep3 = (data: any) => {
    console.log(data.deviceCode);
    handleOnSetSwiper(3);

  };
  const onSubmitStep4 = (data: any) => {
    console.log(data.deviceCode);
    handleOnSetSwiper(4);

  };
  const goToSetDeviceInformationStep = () => {
    handleOnSetSwiper(2);
  };

  const handleOnSetSwiper = (number: number) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(number);
    }
  };

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

  return (
    <IonContent>
      <Swiper ref={swiperRef}>
        <SwiperSlide>
          <AddDeviceStep1
            isError={isError}
            setIsError={setIsError}
            onSubmit={handleSubmit(onSubmit)}
            errors={errors}
            register={register}
          />
        </SwiperSlide>
        <SwiperSlide>
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
              <IonButton onClick={() => goToSetDeviceInformationStep()}>
                Add Devices
              </IonButton>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <AddDeviceStep3
            onSubmit={handleSubmit(onSubmitStep3)}
            errors={errors}
            register={register}
          />
        </SwiperSlide>
        <SwiperSlide>
        <AddDeviceStep3
            onSubmit={handleSubmit(onSubmitStep4)}
            errors={errors}
            register={register}
          />
        </SwiperSlide>
        <SwiperSlide>
            <div className="add-device-card ion-padding">
            
              {deviceData.type != "outlet" && (
                <div className="add-device-card-icon-box">
                  <FontAwesomeIcon
                    className="add-device-card-icon add-device-card-icon-success"
                    mode={'outline'}
                    icon={faCircleCheck}
                  />
                </div>
              )}
              <IonText className="add-devices-form-header">Add Devices Success Fully!</IonText>

              <IonButton onClick={() => onClose()}>
                Done
              </IonButton>
            </div>
        </SwiperSlide>
      </Swiper>
    </IonContent>
  );
};

export default AddDevicesSheet;
