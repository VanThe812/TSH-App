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
  IonPage,
  IonRouterLink,
  IonRow,
  IonText,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import React from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faPlus } from "@fortawesome/free-solid-svg-icons";
import DeviceItem from "../../components/Device/Device";
import { useHistory } from "react-router";

const HomePage: React.FC = () => {

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
  const goToPage = () => {
    // router.push('/add-devices', 'root', 'replace');
    history.push('/add-devices');
  };

  console.log('abc')

  return (
    <IonPage className="home-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
          {/* <IonRouterLink routerLink="/add-devices" routerDirection="forward"> */}
            <IonButton onClick={goToPage} className="add-devices-button">
            <FontAwesomeIcon className="add-devices-icon" icon={faPlus} />
              <IonText className="add-devices-label">Add Devices</IonText>
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
    </IonPage>
  );
};
export default HomePage;
