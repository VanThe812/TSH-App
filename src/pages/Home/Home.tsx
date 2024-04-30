import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonList,
  IonModal,
  IonPage,
  IonRouterLink,
  IonRow,
  IonText,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import React, { useState } from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faMicrophone, faPlus } from "@fortawesome/free-solid-svg-icons";
import DeviceItem from "../../components/Device/Device";
import { useHistory } from "react-router";
import AddDevicesPage from "../AddDevices/AddDevices";
import AddDevicesSheet from "../../components/AddDevices/AddDevices";
import ActionItem from "../../components/Actions/ActionItem";

const HomePage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const ListDeviceData = [
    {
      type: 'temperature',//temperature || door || switch || light
      timecreate: '________',// datetime
      timemodifile: '________',// datetime
      room_name: 'Phòng ngủ', // string
      current_status: 'on',//enum on off
      sensor_data: '38°C', //0 - 100
      name_in_home: 'temperature sensor hahah',
      version: '1.1',//string
    },
    {
      type: 'door',//temperature || door || switch || light
      timecreate: '________',// datetime
      timemodifile: '________',// datetime
      room_name: 'Phòng ngủ', // string
      current_status: 'on',//enum on off
      sensor_data: false, //0 - 100
      name_in_home: 'door',
      version: '1.1',//string
    },
    {
      type: 'light',//temperature || door || switch || light
      timecreate: '________',// datetime
      timemodifile: '________',// datetime
      room_name: 'Phòng ngủ', // string
      current_status: 'on',//enum on off
      sensor_data: true, //0 - 100
      name_in_home: 'light 1',
      version: '1.1',//string
    },
    {
      type: 'switch',//temperature || door || switch || light
      timecreate: '________',// datetime
      timemodifile: '________',// datetime
      room_name: 'Phòng ngủ', // string
      current_status: 'on',//enum on off
      sensor_data: false, //0 - 100
      name_in_home: 'switch sensor',
      version: '1.1',//string
    },
    {
      type: 'humidity',//temperature || door || switch || light
      timecreate: '________',// datetime
      timemodifile: '________',// datetime
      room_name: 'Phòng ngủ', // string
      current_status: 'on',//enum on off
      sensor_data: '90%', //0 - 100
      name_in_home: 'humidity',
      version: '1.1',//string
    },
    {
      type: 'outlet',//temperature || door || switch || light
      timecreate: '________',// datetime
      timemodifile: '________',// datetime
      room_name: 'Phòng ngủ', // string
      current_status: 'off',//enum on off
      sensor_data: true, //0 - 100
      name_in_home: 'switch sensor',
      version: '1.1',//string
    }
  ]
  const ListActionDuringDay = [
    {
      timeActionStart: '10h30',
      timeActionEnd: '14h00',
      name: "Night scene",
      id: 1,
    },
    {
      id: 2,
      timeActionStart: '10h00',
      timeActionEnd: '20h00',
      name: "Night scene",
    }
  ];

  const router = useIonRouter();
  const history = useHistory();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const goToPage = () => {
    // history.push('/add-devices');
    openModal();
  };

  const [initialBreakpoint, setInitialBreakpoint] = useState(0.4);



  return (
    <IonPage className="home-page">
      <div className="header-custom">
        <IonText mode="ios" className="ion-margin" slot="start">My Home</IonText>
        <IonButtons slot="end">
          <IonButton onClick={goToPage} className="add-devices-button" fill="clear">
            <FontAwesomeIcon className="add-devices-button-icon" icon={faCirclePlus} />
          </IonButton>
        </IonButtons>
      </div>

      <IonContent>
        <div>
          <IonText mode="ios" className="ion-margin display-text" slot="start">Actions</IonText>
          <IonList>
            <IonGrid className="ion-no-padding">
              <IonRow>
                {ListActionDuringDay.map((data, index) => (
                  <IonCol
                    sizeXs="12"
                    sizeSm="12"
                    sizeMd="4"
                    key={data.id}
                    class="ion-no-padding">
                    <ActionItem actionData={data} />
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </IonList>
        </div>
        <div>
          <IonText mode="ios" className="ion-margin display-text" slot="start">Smart Devices</IonText>
          <IonList className="ion-padding">
            <IonGrid>
              <IonRow>
                {ListDeviceData.map((data, index) => (
                  <IonCol
                    key={index}
                    size="6"
                    size-md="4"
                    className="my-item ion-no-padding ion-no-margin"
                  >
                    <DeviceItem deviceData={data} />
                  </IonCol>
                ))}

              </IonRow>
            </IonGrid>
          </IonList>
        </div>
      </IonContent>
      <IonModal isOpen={showModal} breakpoints={[initialBreakpoint, 1]} onDidDismiss={closeModal} initialBreakpoint={initialBreakpoint}
        handleBehavior="cycle">
        <AddDevicesSheet onClose={closeModal} />
      </IonModal>
    </IonPage>
  );
};
export default HomePage;
