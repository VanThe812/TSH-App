import React, { useLayoutEffect, useState } from "react";
import { IonButton, IonContent, IonInput, IonLoading, IonSelect, IonSelectOption, IonText, useIonToast } from "@ionic/react";
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


const AddDevicesSheet: React.FC<AddDevicesSheetProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [messageError, setMessageError] = useState("Error");
  const [codeAccess, setCodeAccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [titleLoading, setTitleLoading] = useState('Please wait...');
  const dispatch = useDispatch();
  const userDataRedux = useSelector((state: RootState) => state.user.user);
  const [presentToast] = useIonToast(); // To show a toast message
  const [statusConfirm, setStatusConfirm] = useState(false);
  const [device, setDevice] = useState({});
  const [rooms, setRooms] = useState([])
  const [subDevice, setSubdevice] = useState([]);

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

  const onSubmitStep = async (data: any) => {
    console.log(data);
    // Handle form submission here


    if (step == 0) {
      setLoading(true);
      const submitData = {
        ...data,
        token: userDataRedux?.token
      };

      // Dispatch updateUserInfoAsync action
      const action = await dispatch(checkDeviceAvailableAsync(submitData));
      setLoading(false);
      if (checkDeviceAvailableAsync.rejected.match(action)) {
        // If the action is rejected, handle the error
        const errorMessage = action.payload as string;
        setMessageError(errorMessage);
        setStep(4);
      } else {
        // If the dispatch success
        const data = action.payload;
        setCodeAccess(data.data.codeAccess);
        setStep(1);
      }
      console.log(action)
    }
    if (step == 1) {
      setLoading(true);
      const submitData = {
        codeAccess,
        ...data,
        token: userDataRedux?.token
      };
      const action = await dispatch(addDeiveToHomeAsync(submitData));
      setLoading(false);
      if (addDeiveToHomeAsync.rejected.match(action)) {
        // If the action is rejected, handle the error
        const errorMessage = action.payload as string;
        setMessageError(errorMessage);
        setStep(4);
      } else {
        // If the dispatch success
        setTitleLoading('The light bulb on the device is flashing, please hold down the confirmation button on the device until the light bulb stops')
        setLoading(true);
        const submitData = {
          ...data,
          token: userDataRedux?.token
        };
        let timeElapsed = 0;
        while (!statusConfirm && timeElapsed < 90) {

          const action = await dispatch(getStatusConfirmAsync(submitData));
          if (!getStatusConfirmAsync.rejected.match(action)) {
            const payload = action.payload;
            if (payload.thingName) {
              setLoading(false);
              setStatusConfirm(true);
              //Set sub device
              setSubdevice(Object.values(payload.subDevice))
              setDevice(payload);
              const data = await dispatch(getAllMyRoomAsync({ token: userDataRedux?.token }));
              const roomsArray = Object.values(data.payload.data);
              setRooms(roomsArray);
              setStep(2);
              break;
            }

          } else {
            console.log(action.payload)
          }
          await new Promise(resolve => setTimeout(resolve, 5000));
          timeElapsed += 5;
        }
        if (timeElapsed >= 90) {
          setLoading(false);
          setMessageError("Response time exceeded");
          setStep(4);
        }
      }
    }

    // Submit update device: room, name sub device
    if (step == 2) {
      console.log(data);
      const subDevice = Object.keys(data)
        .filter(key => key.startsWith('o'))
        .map(key => ({
          nameInHome: data[key],
          nameSubDevice: key
        }));
      console.log(subDevice);

      const submitData = {
        token: userDataRedux?.token,
        roomId: data.roomId,
        deviceId: device._id,
        subDevice
      }

      const action = await dispatch(updateDeviceAsync(submitData))
      if (action.payload?._id) {
        console.log(2);
        setStep(5);
      } else {
        console.log(1);

        const errorMessage = action.payload as string;
        setMessageError(errorMessage);
        setStep(4);
      }
      console.log(action);



    }
  };

  // const goToNextStep = () => {
  //   console.log(step)
  //   setStep(step + 1);
  // };

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
              <div className="add-devices-form-header">
                <IonText className="add-devices-form-header-title">Device Configuration</IonText>
                <IonText className="add-devices-form-header-subtitle">Enter Name of the device.</IonText>
              </div>

              <IonText>Select room</IonText>
              <IonSelect
                mode="ios"
                aria-label="rooms"
                interface="action-sheet"
                placeholder="Select Room"
                className="select-rooms item-filter"
                fill="outline"
                {...register("roomId", { required: true })}
              >
                {rooms.map((item, index) => (
                  <IonSelectOption key={index} value={item._id}>{item.name}</IonSelectOption>
                ))}
              </IonSelect>
              <IonText>Set name device in home</IonText>
              {subDevice.map((item, index) => (
                <IonInput
                  label={item.defaultName}
                  labelPlacement="floating"
                  fill="outline"
                  type="text"
                  mode="md"
                  key={index}
                  className="signup-form-item-input add-devices-form-input"
                  {...register(item.nameSubDevice, { required: false })}
                />
              ))}
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
      case 4:
        return (
          <SwiperSlide key={step}>
            <div className="add-device-card ion-padding">
              <div className="add-device-card-icon-box">
                <FontAwesomeIcon
                  className="add-device-card-icon add-device-card-icon-success"
                  mode={"outline"}
                  icon={faClose}
                />
              </div>
              <IonText className="add-devices-form-header">{messageError}</IonText>
              <IonButton onClick={onClose}>Close</IonButton>
            </div>
          </SwiperSlide>
        );
      case 5:
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
      <Swiper noSwiping >
        {renderFormStep(step)}
      </Swiper>
      <IonLoading
        isOpen={loading}
        message={titleLoading}
        spinner="circles" // Use 'circles' spinner style
      />
    </IonContent>
  );
};

export default AddDevicesSheet;