import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonIcon,
  IonText,
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faDoorClosed,
  faDroplet,
  faLightbulb,
  faMicrophone,
  faPowerOff,
  faQuestion,
  faTemperatureThreeQuarters,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import { ReactSVG } from "react-svg";
import OutLetIcon from "../../assets/icons/outlet";
import classNames from "classnames";
import CircleExclamationIcon from "../../assets/icons/CircleExclamation";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../stores";
import { deviceControlAsync, getDataSubDeviceAsync } from "../../actions/DeviceAction";

interface SubDeviceItemProps {
  subDeviceData: {
    _id: String,
    deviceId: String,
    type: string;
    nameSubDevice: string,
    nameInHome: string,
    data: number,
    defaultName: String
  };
}


const SubDeviceItem: React.FC<SubDeviceItemProps> = ({ subDeviceData }) => {
  const [isOpened, setIsOpened] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const dispatch = useDispatch();
  const userDataRedux = useSelector((state: RootState) => state.user.user);
  const [data, setData] = useState("");

  useEffect(() => {
    ItemDataValue(subDeviceData.data)
    const interval = setInterval(() => {
      fetchData();

    }, 200000);
    return () => clearInterval(interval);
  }, []);


  const fetchData = async () => {
    const submitData = {
      token: userDataRedux?.token,
      deviceId: subDeviceData.deviceId,
      nameSubDevice: subDeviceData.nameSubDevice
    }
    const action = await dispatch(getDataSubDeviceAsync(submitData))
    console.log(action);

    if (typeof action.payload != String) {
      const data = action.payload;
      // if (subDeviceData.nameSubDevice == 'o1' && subDeviceData.type == "door") {
      //   console.log('door:', data);

      // }
      // console.log(data);

      ItemDataValue(data.data, data.lastModifiedTime);
    }
  }

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
  const ItemDataValue = (dataSet: any, lastModifiedTime = '') => {

    if (lastModifiedTime !== '') {
      const thresholdSeconds = 60;

      const currentTime = Date.now();

      // Tính thời gian cách thời gian hiện tại (tính bằng giây)
      const timeDifferenceInSeconds = Math.floor((currentTime - lastModifiedTime) / 1000);
      console.log(timeDifferenceInSeconds);
      // console.log(thresholdSeconds - diffInSeconds, lastModifiedTime, currentTime.getTime());

      const isWithinThreshold = timeDifferenceInSeconds <= thresholdSeconds;
      // console.log(isWithinThreshold);

      if (!isWithinThreshold) {
        setData('Disconnected');
        setIsDisabled(true);
        return;
      } else {
        setIsDisabled(false);
      }
    }


    if (subDeviceData.type == 'outlet' || subDeviceData.type == "light") {
      setIsOpened(dataSet == 1 ? true : false);
      setData(dataSet == 1 ? "On" : "Off")
      // if (subDeviceData.nameSubDevice == 'o1' && subDeviceData.type == "outlet") {
      //   console.log(subDeviceData.nameSubDevice + "::" + dataSet, data);

      // }

    } else if (subDeviceData.type == 'temperature') {
      // setData(Math.round(dataSet) + "°C");
      setData(dataSet + "°C");
    } else if (subDeviceData.type == 'humidity') {
      setData(Math.round(dataSet) + "%");
    } else if (subDeviceData.type == 'door') {
      setData(dataSet == 0 ? "Open" : "Close")

    }
  };
  const ViewDetail = async () => {
    console.log('view')
  }
  const HandleChangeStatusDevices = async () => {
    console.log('ok change');
    // const isOpenedOld = isOpened;
    setIsDisabled(true);
    const submitData = {
      token: userDataRedux?.token,
      status: !isOpened ? "on" : "off",
      deviceId: subDeviceData.deviceId,
      nameSubDevice: subDeviceData.nameSubDevice
    }
    const action = await dispatch(deviceControlAsync(submitData))
    if (typeof action.payload != String) {
      const data = action.payload.data;
      fetchData();
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsDisabled(false);
    }
  }
  // const


  //temperature || door || switch || light
  return (
    <IonButton disabled={isDisabled}
      className="ion-no-padding ion-no-margin my-item-item"
      fill="clear"
    >
      <IonCard className="ion-no-margin ion-no-padding my-item-card">
        <div className="my-item-card-box">
          {subDeviceData.type == "outlet" && (
            <div className="my-item-card-icon-box">
              <OutLetIcon className="my-item-card-icon-custom my-item-card-icon" />
            </div>
          )}
          {subDeviceData.type != "outlet" && (
            <div className="my-item-card-icon-box">
              <FontAwesomeIcon
                className="my-item-card-icon"
                icon={ItemIcon(subDeviceData.type)}
              />
            </div>
          )}

          {/* <IonText className="ellipsis my-item-card-content-title">
            {deviceData.room_name}
          </IonText> */}
          <IonText onClick={ViewDetail} className="ellipsis my-item-card-content-title">
            {subDeviceData.nameInHome}
          </IonText>
          <IonText className="ellipsis my-item-card-content-content ">
            {data}
          </IonText>
        </div>
        {((subDeviceData.type == "light" ||
          subDeviceData.type == "outlet")) && data != "Disconnected" && (
            <IonButton onClick={HandleChangeStatusDevices} className="my-item-card-turn-off-button" fill="clear">
              <FontAwesomeIcon className={classNames({ 'power-off': !isOpened })} icon={faPowerOff} />
            </IonButton>
          )}

        {((subDeviceData.type == 'temperature' || subDeviceData.type == 'humidity')) && !isDisabled && (
          <IonText className="my-item-card-data">
            {data}
          </IonText>
        )}
      </IonCard>
    </IonButton>
  );
};

export default SubDeviceItem;
