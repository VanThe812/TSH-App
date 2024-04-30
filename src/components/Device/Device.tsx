import React from "react";
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
interface DeviceItemProps {
  deviceData: {
    type: string;
    timecreate: string;
    timemodifile: string;
    room_name: string;
    current_status: string;
    sensor_data: any;
    name_in_home: string;
    version: string;
  };
}

const DeviceItem: React.FC<DeviceItemProps> = ({ deviceData }) => {
  const itemData = {
    type: "temperature", //temperature || door || switch || light
    timecreate: "________", // datetime
    timemodifile: "________", // datetime
    room_id: "cscs", // string
    current_status: "on", //enum on off
    sensor_data: 38, //0 - 100
    name_in_home: "temperature sensor",
    version: "1.1", //string
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
  const ItemDataValue = (type: string) => {
    if (deviceData.current_status == 'off') {
      return 'Lost connection!'
    }
    if (
      type == "door" ||
      type == "light" ||
      type == "switch" ||
      type == "outlet"
    )
      return deviceData.sensor_data ? "On" : "Off";
    return deviceData.sensor_data;
  };
  const ViewDetail = () => {

  }
  const HandleChangeStatusDevices = () => {

  }


  //temperature || door || switch || light
  return (
    <IonButton disabled={deviceData.current_status == "off" ? true : false}
      className="ion-no-padding ion-no-margin my-item-item"
      fill="clear"
    >
      <IonCard className={classNames("ion-no-margin ion-no-padding my-item-card", { "device-not-connected": deviceData.current_status == 'off' })}>
        <div className="my-item-card-box">
          {deviceData.type != "outlet" && (
            <div className="my-item-card-icon-box">
              <FontAwesomeIcon
                className="my-item-card-icon"
                icon={ItemIcon(deviceData.type)}
              />
            </div>
          )}
          {deviceData.type == "outlet" && (
            <div className="my-item-card-icon-box">
              <OutLetIcon className="my-item-card-icon-custom my-item-card-icon" />
            </div>
          )}
          {/* <IonText className="ellipsis my-item-card-content-title">
            {deviceData.room_name}
          </IonText> */}
          <IonText className="ellipsis my-item-card-content-title">
            {deviceData.name_in_home}
          </IonText>
          <IonText className="ellipsis my-item-card-content-content">
            {ItemDataValue(deviceData.type)}
          </IonText>
        </div>
        {(
          deviceData.current_status != 'off' &&
          (deviceData.type == "door" ||
            deviceData.type == "light" ||
            deviceData.type == "switch" ||
            deviceData.type == "outlet")) && (
            <IonButton className="my-item-card-turn-off-button" fill="clear">
              <FontAwesomeIcon className={classNames({ 'power-off': deviceData.sensor_data })} icon={faPowerOff} />
            </IonButton>
          )}
        {deviceData.current_status == 'off' && (
          <IonButton disabled className="my-item-card-turn-off-button my-item-card-turn-off-button-not-disable" fill="clear">
            <CircleExclamationIcon className={'my-item-card-icon-custom power-off'} />
          </IonButton>
        )}
      </IonCard>
    </IonButton>
  );
};

export default DeviceItem;
