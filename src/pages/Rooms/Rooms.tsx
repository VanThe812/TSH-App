import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonModal,
  IonPage,
  IonPopover,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faPlus, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../stores";
import { deleteRoomAsync, getAllMyRoomAsync } from "../../actions/RoomAction";
import { getListSubDevicesInRoomAsync } from "../../actions/DeviceAction";
import SubDeviceItem from "../../components/Device/Device";
import AddRoom from "../../components/AddRoom/AddRoom";
import { set } from "react-hook-form";
import { Room } from "../../reducers/roomSlice";

const RoomsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [listSubDeviceAndRooms, setListSubDeviceAndRooms] = useState([]);
  const [filter, setFilter] = useState(""); //roomId
  const dispatch = useDispatch();
  const userDataRedux = useSelector((state: RootState) => state.user.user);
  const [presentToast] = useIonToast();
  const [action, setAction] = useState('create');
  const [showAlertDelete, setShowAlertDelete] = useState(false)

  const handleChangeFilter = (newFilter: string = "") => {
    if (newFilter === "") {
      newFilter = rooms['0']._id
    }
    setFilter(newFilter);
    renderRoom(newFilter);
  };
  useEffect(() => {
    const getRooms = async () => {
      const action = await dispatch(getAllMyRoomAsync({ token: userDataRedux?.token }))
      if (typeof action.payload === 'string') {
        presentToast({
          message: action.payload,
          duration: 3000,
          color: 'danger'
        });
      }
      setRooms(Object.values(action.payload.data));
      setFilter(action.payload.data['0']._id)
    }
    getRooms();

    renderRoom(filter);
  }, []);

  const getListSubDevice = async (roomId: String) => {
    const submitData = {
      token: userDataRedux?.token,
      roomId: roomId
    }
    // console.log("submit data : ", submitData);

    const action = await dispatch(getListSubDevicesInRoomAsync(submitData))

    if (typeof action.payload === 'string') {
      presentToast({
        message: action.payload,
        duration: 3000,
        color: 'danger'
      });
      return null;
    } else {
      return action.payload;
    }
  }

  const renderRoom = (roomId: String = '') => {

    const subDevices = getListSubDevice(roomId)
      .then(subDevices => {
        // Xử lý dữ liệu khi promise được giải quyết thành công

        setListSubDeviceAndRooms(subDevices);
        // const array = subDevices;
      })
      .catch(error => {
        // Xử lý lỗi nếu có
        console.error(error);
      });;// lỗi vẫn ở promíe
  }

  const openModal = (action: string = 'create') => {
    setShowModal(true);
    setAction(action);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const goToPage = () => {
    openModal();
  };

  // Hàm xử lý mở alert
  const handleOpenAlert = () => {
    setShowAlertDelete(true);
  };

  // Hàm xử lý đóng alert
  const handleCloseAlert = () => {
    setShowAlertDelete(false);
  };

  const confirmDeleteRoom = () => {
    handleOpenAlert();
  }
  const deteleRoom = async () => {
    const action = await dispatch(deleteRoomAsync({ token: userDataRedux?.token, roomId: filter }));

    if (deleteRoomAsync.fulfilled.match(action)) {
      const updatedList = rooms.filter(item => item._id !== filter);
      handleChangeFilter()
      setRooms(updatedList);
    } else {
      presentToast({ message: "An error occurred while deleting the room. Please try again", duration: 3000, color: "danger" });
    }
  }

  return (
    <IonPage className="rooms-page">

      <IonHeader className="rooms-page-header">
        <IonToolbar>
          <IonList className="rooms-page-header-list">
            <IonItem>
              <IonSelect
                aria-label="rooms"
                interface="action-sheet"
                placeholder="Select Room"
                className="select-rooms"
                value={filter}
                onIonChange={(ev) => handleChangeFilter(ev.target.value)}
                interfaceOptions={{
                  header: 'Select Room',
                  cssClass: 'my-custom-select'
                }}
              >
                {Array.isArray(rooms) && rooms.map((item, index) => (
                  <IonSelectOption key={index} value={item._id}>{item.name}</IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem className="ion-no-padding">
              <IonButton id="click-trigger" className="button-menu">
                <FontAwesomeIcon className="add-devices-button-icon" icon={faEllipsisVertical} />
              </IonButton>
              <IonPopover trigger="click-trigger" dismissOnSelect={true}>
                <IonContent className="menu-action">
                  <IonList>
                    <IonItem onClick={() => openModal('update')} button={true} detail={false}>
                      Update room
                    </IonItem>
                    {listSubDeviceAndRooms.length !== 0 && (
                      <IonItem disabled detail={false}>
                        Delete room
                      </IonItem>
                    )}
                    {listSubDeviceAndRooms.length === 0 && (
                      <IonItem button={true} detail={false} onClick={confirmDeleteRoom}>
                        Delete room
                      </IonItem>
                    )}

                  </IonList>

                </IonContent>

              </IonPopover>
            </IonItem>
          </IonList>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList className="ion-no-padding ion-no-margin list-room">
          <IonGrid>
            <IonRow>

              {listSubDeviceAndRooms.map((data, index) => (
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
        {listSubDeviceAndRooms.length == 0 && (
          <div className="not-equipment">
            <IonText className="not-equipment-text">The room does not have any equipment</IonText>
          </div>
        )}

        <IonFab slot="fixed" vertical="bottom" horizontal="end" edge={true}>
          <IonFabButton onClick={goToPage}>
            <FontAwesomeIcon className="add-devices-icon" icon={faCirclePlus} />
          </IonFabButton>
        </IonFab>
        <IonAlert
          isOpen={showAlertDelete}
          header="Confirm room deletion!"
          trigger="present-alert"
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Alert canceled');
                handleCloseAlert();
              },
            },
            {
              text: 'Confirm',
              role: 'confirm',
              cssClass: 'confirm-button',
              handler: () => {
                console.log('Alert confirmed');
                // setShowAlertDelete(false);
                deteleRoom();
                handleCloseAlert();
              },
            },
          ]}
          onDidDismiss={({ detail }) => console.log(`Dismissed with role: ${detail.role}`)}
        ></IonAlert>
      </IonContent>
      <IonModal isOpen={showModal} onDidDismiss={closeModal}>
        <AddRoom onClose={closeModal} roomId={filter} action={action} setRooms={setRooms} />
      </IonModal>

    </IonPage >
  );
};
export default RoomsPage;
