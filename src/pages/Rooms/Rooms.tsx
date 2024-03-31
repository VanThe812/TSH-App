import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonGrid,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faPlus } from "@fortawesome/free-solid-svg-icons";
import DeviceItem from "../../components/Device/Device";
const ListRoomDeviceData = [
  {
    id: "abcd1",
    name: "Living Room",
    listDevices: [
      {
        type: "temperature", //temperature || door || switch || light
        timecreate: "________", // datetime
        timemodifile: "________", // datetime
        room_name: "cscs", // string
        current_status: "on", //enum on off
        sensor_data: "38°C", //0 - 100
        name_in_home: "temperature sensor",
        version: "1.1", //string
      },
      {
        type: "door", //temperature || door || switch || light
        timecreate: "________", // datetime
        timemodifile: "________", // datetime
        room_name: "cscs", // string
        current_status: "on", //enum on off
        sensor_data: false, //0 - 100
        name_in_home: "door",
        version: "1.1", //string
      },
      {
        type: "light", //temperature || door || switch || light
        timecreate: "________", // datetime
        timemodifile: "________", // datetime
        room_name: "cscs", // string
        current_status: "on", //enum on off
        sensor_data: true, //0 - 100
        name_in_home: "light 1",
        version: "1.1", //string
      },
    ],
  },
  {
    id: "abcd2",
    name: "Room 2",
    listDevices: [
      {
        type: "switch", //temperature || door || switch || light
        timecreate: "________", // datetime
        timemodifile: "________", // datetime
        room_name: "cscs", // string
        current_status: "on", //enum on off
        sensor_data: false, //0 - 100
        name_in_home: "switch sensor",
        version: "1.1", //string
      },
      {
        type: "humidity", //temperature || door || switch || light
        timecreate: "________", // datetime
        timemodifile: "________", // datetime
        room_name: "cscs", // string
        current_status: "on", //enum on off
        sensor_data: "90%", //0 - 100
        name_in_home: "humidity",
        version: "1.1", //string
      },
      {
        type: "outlet", //temperature || door || switch || light
        timecreate: "________", // datetime
        timemodifile: "________", // datetime
        room_name: "cscs", // string
        current_status: "off", //enum on off
        sensor_data: true, //0 - 100
        name_in_home: "switch sensor",
        version: "1.1", //string
      },
    ],
  },
  {
    id: "abcd3",
    name: "New Room",
    listDevices: [],
  },
];
const RoomsPage: React.FC = () => {
  const [listRooms, setListRooms] = useState(ListRoomDeviceData);
  const [filters, setFilters] = useState("");

  const handleChangeFilter = (newFilter: string) => {
    setFilters(newFilter);
  };
  useEffect(() => {
    if (filters == "") {
      setListRooms(ListRoomDeviceData);
    } else {
      const newListRoom = ListRoomDeviceData.filter(
        (item) => item.id == filters
      );
      setListRooms(newListRoom);
    }
  }, [filters]);

  return (
    <IonPage className="rooms-page">
      <IonHeader>
        <IonToolbar>
          <IonList>
            <IonItem lines="none" className="item-filter">
              <IonSelect
                mode="ios"
                aria-label="rooms"
                interface="action-sheet"
                placeholder="Select Room"
                className="select-rooms"
                onIonChange={(ev) => handleChangeFilter(ev.target.value)}
                fill="outline"
              >
                <IonSelectOption value={""}>all</IonSelectOption>
                {ListRoomDeviceData.map((item) => (
                  <IonSelectOption value={item.id}>{item.name}</IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonList>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <IonList className="ion-no-padding ion-no-margin list-room">
          {listRooms.map((item) => (
            <IonItem
              key={item.id}
              className="room-item ion-no-padding ion-margin-top"
            >
              <div className="room-item-box">
                <IonText className="room-item-name ion-margin">
                  {item.name}
                </IonText>
                <IonGrid>
                  <IonRow>
                    {item.listDevices.map((data, index) => (
                      <IonCol
                        key={index}
                        size="6"
                        size-md="4"
                        className="my-item ion-no-padding ion-no-margin"
                      >
                        <DeviceItem deviceData={data} />
                      </IonCol>
                    ))}
                    {item.listDevices.length == 0 && (
                      <IonCol
                        size="12"
                        className="my-item ion-no-padding ion-no-margin room-no-item"
                      >
                        This Room have 0 item!
                      </IonCol>
                    )}
                  </IonRow>
                </IonGrid>
              </div>
            </IonItem>
          ))}
        </IonList>

          <IonFab slot="fixed" vertical="bottom" horizontal="end" edge={true}>
            <IonFabButton>
              <FontAwesomeIcon className="add-devices-icon" icon={faCirclePlus} />
            </IonFabButton>
          </IonFab>
      </IonContent>
    </IonPage>
  );
};
export default RoomsPage;
