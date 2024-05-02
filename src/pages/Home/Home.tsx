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
import React, { useEffect, useState } from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faMicrophone, faPlus } from "@fortawesome/free-solid-svg-icons";
import DeviceItem from "../../components/Device/Device";
import { useHistory } from "react-router";
import AddDevicesPage from "../AddDevices/AddDevices";
import AddDevicesSheet from "../../components/AddDevices/AddDevices";
import ActionItem from "../../components/Actions/ActionItem";
import { useDispatch } from "react-redux";
import { getListDevicesInHomeAsync } from "../../actions/DeviceAction";
import { useSelector } from "react-redux";
import { RootState } from "../../stores";
import SubDeviceItem from "../../components/Device/Device";


const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [subDevices, setSubDevices] = useState([]);
  const userDataRedux = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const action = await dispatch(getListDevicesInHomeAsync({ token: userDataRedux?.token }));
        console.log(action);
        if (typeof action.payload != String) {
          setSubDevices(action.payload);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, []);
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
                {subDevices.map((data, index) => (
                  <IonCol
                    key={index}
                    size="6"
                    size-md="4"
                    className="my-item ion-no-padding ion-no-margin"
                  >
                    <SubDeviceItem subDeviceData={data} />
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
