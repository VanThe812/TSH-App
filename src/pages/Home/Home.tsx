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

const HomePage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const ListDeviceData = [
    {
      type:'temperature',//temperature || door || switch || light
      timecreate:'________',// datetime
      timemodifile:'________',// datetime
      room_name:'cscs', // string
      current_status:'on',//enum on off
      sensor_data:'38°C', //0 - 100
      name_in_home:'temperature sensor', 
      version:'1.1',//string
    },
    {
      type:'door',//temperature || door || switch || light
      timecreate:'________',// datetime
      timemodifile:'________',// datetime
      room_name:'cscs', // string
      current_status:'on',//enum on off
      sensor_data:false, //0 - 100
      name_in_home:'door', 
      version:'1.1',//string
    },
    {
      type:'light',//temperature || door || switch || light
      timecreate:'________',// datetime
      timemodifile:'________',// datetime
      room_name:'cscs', // string
      current_status:'on',//enum on off
      sensor_data:true, //0 - 100
      name_in_home:'light 1', 
      version:'1.1',//string
    },
    {
      type:'switch',//temperature || door || switch || light
      timecreate:'________',// datetime
      timemodifile:'________',// datetime
      room_name:'cscs', // string
      current_status:'on',//enum on off
      sensor_data:false, //0 - 100
      name_in_home:'switch sensor', 
      version:'1.1',//string
    },
    {
      type:'humidity',//temperature || door || switch || light
      timecreate:'________',// datetime
      timemodifile:'________',// datetime
      room_name:'cscs', // string
      current_status:'on',//enum on off
      sensor_data:'90%', //0 - 100
      name_in_home:'humidity', 
      version:'1.1',//string
    },
    {
      type:'outlet',//temperature || door || switch || light
      timecreate:'________',// datetime
      timemodifile:'________',// datetime
      room_name:'cscs', // string
      current_status:'off',//enum on off
      sensor_data:true, //0 - 100
      name_in_home:'switch sensor', 
      version:'1.1',//string
    }
  ]

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


  return (
    <IonPage className="home-page">
      <IonHeader>
        <IonToolbar>
          <IonText mode="ios" slot="start">My Home</IonText>
          <IonButtons slot="end">
          {/* <IonRouterLink routerLink="/add-devices" routerDirection="forward"> */}
            <IonButton onClick={goToPage} className="add-devices-button" fill="clear">
            <FontAwesomeIcon className="add-devices-button-icon" icon={faCirclePlus} />
            </IonButton>
            {/* </IonRouterLink> */}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList className="ion-padding">
          <IonGrid>
            <IonRow>
              {ListDeviceData.map((data,index) => (
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
      </IonContent>
      <IonModal isOpen={showModal} onDidDismiss={closeModal} initialBreakpoint={0.25}
          breakpoints={[0, 0.5, 0.75]}
          handleBehavior="cycle">
        <AddDevicesSheet onClose={closeModal} />
      </IonModal>
    </IonPage>
  );
};
export default HomePage;
