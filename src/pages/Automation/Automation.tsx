import { IonButton, IonButtons, IonCol, IonContent, IonDatetime, IonDatetimeButton, IonGrid, IonHeader, IonInput, IonItem, IonList, IonModal, IonPage, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from "@ionic/react"
import React, { useEffect, useRef, useState } from "react"
import './style.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { RootState } from "../../stores"
import { faCirclePlus, faMicrophone, faPlus } from "@fortawesome/free-solid-svg-icons";
import ActionItem from "../../components/Actions/ActionItem"
import AddDevicesSheet from "../../components/AddDevices/AddDevices"
import AddActionSheet from "../../components/AddAction/AddAction"
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces"
import { useForm } from "react-hook-form"
import { getListDevicesInHomeAsync } from "../../actions/DeviceAction"



const ListActionDuringDay = [
  {
    timeActionStart: '10h30',
    timeActionEnd: '14h00',
    name: "Night scene",
    id: 1,
  },
];

const AutomationPage: React.FC = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const userDataRedux = useSelector((state: RootState) => state.user.user);
  const [initialBreakpoint, setInitialBreakpoint] = useState(0.4);
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [listDevicePerforming, setListDevicePerforming] = useState([]);
  const [sensorListen, setSensorListen] = useState('');
  const [activeStatus, setActiveStatus] = useState([]);

  const [sensors, setSensors] = useState([]);
  const [subDeviceInHome, setSubDeviceInHome] = useState([]);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const goToCreateAction = () => {
    // history.push('/add-devices');
    openModal();
  };

  const handleChangeSensor = (sensonid: String) => {

    setSensorListen(sensonid);
  };

  const addDevicePerforming = () => {
    console.log('addDevicePerforming');

    const newData = { id: listDevicePerforming.length + 1, value: 'new value' };

    // Cập nhật listDevicePerforming bằng cách thêm newData vào cuối danh sách
    setListDevicePerforming(prevList => [...prevList, newData]);
  }



  useEffect(() => {
    const getSubDeice = async () => {
      try {
        const action = await dispatch(getListDevicesInHomeAsync({ token: userDataRedux?.token }));
        console.log(action);
        const data = action.payload;

        // Lọc ra các phần tử theo type là outlet
        const subDevices = data.filter(item => item.type === 'outlet' || item.type === 'light');

        // Lọc ra các phần tử theo type không phải là outlet (light và các type khác)
        const sensors = data.filter(item => item.type !== 'outlet' && item.type !== 'light');

        setSensors(sensors);
        setSubDeviceInHome(subDevices);
        console.log(subDevices, sensors);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getSubDeice();
  }, [])

  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }

  return (
    <IonPage className="automation-page">
      <div className="header-cusom">
        <IonText mode="ios" className="ion-margin" slot="start">Automation</IonText>
        <IonButtons slot="end">
          <IonButton onClick={goToCreateAction} className="add-devices-button" fill="clear">
            <FontAwesomeIcon className="add-devices-button-icon" icon={faCirclePlus} />
          </IonButton>
        </IonButtons>
      </div>
      <IonContent>
        <div>
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
      </IonContent>
      <IonModal ref={modal} trigger="open-modal" isOpen={showModal} onDidDismiss={closeModal}
        handleBehavior="cycle">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => closeModal()}>Cancel</IonButton>
            </IonButtons>
            <IonTitle>Add Event</IonTitle>
            <IonButtons slot="end">
              <IonButton strong={true} onClick={() => confirm()}>
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonText>Sensor Device</IonText>
          <IonSelect
            mode="ios"
            aria-label="select-senser"
            interface="action-sheet"
            placeholder="Select sensor device"
            className="select-senser"
            fill="outline"
            onIonChange={(ev) => handleChangeSensor(ev.target.value)}
          >
            {sensors.map((item, index) => (
              <IonSelectOption value={item._id}>{item.nameInHome ?? item.defaultName}</IonSelectOption>
            ))}
          </IonSelect>
          <IonText>Active status</IonText>
          <IonSelect
            mode="ios"
            aria-label=""
            interface="action-sheet"
            placeholder="Select sensor device"
            className="select-action-status"
            fill="outline"
          >
            <IonSelectOption value="">Open|Higher</IonSelectOption>
            <IonSelectOption value="">Close|Lower</IonSelectOption>
          </IonSelect>
          {/* <IonText>Operational value</IonText>
          {}
          <IonInput
            labelPlacement="floating"
            fill="outline"
            type="text"
            mode="md"
            className="signup-form-item-input add-devices-form-input"
            {...register("deviceCode", { required: true })}
          /> */}

          <IonText>Sự kiện được hoạt động từ</IonText>
          <div className="item-time">
            <IonText>Từ</IonText>
            <IonDatetime
              value="00:00"
              display-format="HH:mm"
              hourCycle="h24"
              presentation="time"
              {...register("timeStart", { required: true })}
            ></IonDatetime>

            <IonText>Đến</IonText>

            <IonDatetime
              value="23:59"
              display-format="HH:mm"
              hourCycle="h24"
              presentation="time"
              {...register("timeEnd", { required: true })}
            ></IonDatetime>

          </div>
          <IonText>Hoạt động trong</IonText>
          <IonSelect
            mode="ios"
            aria-label="rooms"
            interface="action-sheet"
            placeholder="aaa"
            className="select-rooms"
            fill="outline"
            multiple
          >
            <IonSelectOption value="2">Mon</IonSelectOption>
            <IonSelectOption value="3">Tue</IonSelectOption>
            <IonSelectOption value="4">Wed</IonSelectOption>
            <IonSelectOption value="5">Thu</IonSelectOption>
            <IonSelectOption value="6">Fri</IonSelectOption>
            <IonSelectOption value="7">Sat</IonSelectOption>
            <IonSelectOption value="8">Sun</IonSelectOption>
          </IonSelect>
          <IonText>Các thiết bị thực hiện hành động</IonText>
          <div>
            {listDevicePerforming.map((item, index) => (
              <IonRow key={index}>
                <IonCol size="8">
                  <IonSelect
                    mode="ios"
                    aria-label="rooms"
                    interface="action-sheet"
                    placeholder="Select SubDevice"
                    className="select-rooms"
                    fill="outline"
                  >
                    {subDeviceInHome.map((i, ix) => (
                      <IonSelectOption value={i._id}>{i.nameInHome ?? i.defaultName}</IonSelectOption>
                    ))}
                  </IonSelect>
                </IonCol>
                <IonCol size="4">
                  <IonSelect
                    mode="ios"
                    aria-label="rooms"
                    interface="action-sheet"
                    fill="outline"
                    value='1'
                  >
                    <IonSelectOption value="1">On</IonSelectOption>
                    <IonSelectOption value="0">Off</IonSelectOption>
                  </IonSelect>
                </IonCol>

              </IonRow>
            ))}

          </div>
          <IonButton onClick={addDevicePerforming} className="add-devices-button" fill="clear">
            <FontAwesomeIcon className="add-devices-button-icon" icon={faCirclePlus} />
          </IonButton>

        </IonContent>
      </IonModal>
    </IonPage>
  )
}
export default AutomationPage