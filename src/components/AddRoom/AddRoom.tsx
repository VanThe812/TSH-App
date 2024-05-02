import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonLoading, IonPage, IonText, IonTitle, IonToolbar, useIonToast } from "@ionic/react";
import "./style.scss";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../stores";
import { useDispatch } from "react-redux";
import { createRoom, Room, updateRoom } from "../../reducers/roomSlice";
import { createRoomAsync, getDetailRoomAsync, updateRoomAsync } from "../../actions/RoomAction";
import { unwrapResult } from "@reduxjs/toolkit";

interface AddRoomProps {
    onClose: () => void;
    action: string;
    roomId: string;
    setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
}
interface AddRoomState {
    name: String;
}


const AddRoom: React.FC<AddRoomProps> = ({ onClose, action = "create", roomId = '', setRooms }) => {
    const [formData, setFormData] = useState<AddRoomState>({ name: "" });
    const [title, setTitle] = useState('Add room')
    const [loading, setLoading] = useState(false);
    const [room, setRoom] = useState({});
    const userDataRedux = useSelector((state: RootState) => state.user.user);

    // Ionic toast instance
    const [presentToast] = useIonToast();
    const dispatch = useDispatch();

    const handleAddRoom = async (event: React.FormEvent) => {
        event.preventDefault();
        // Perform form validation
        if (!formData.name) {
            presentToast({ message: "Please fill in all required fields.", duration: 3000, color: "danger" });
            return;
        }

        setLoading(true);
        try {


            if (action === 'update') {
                console.log('update');

                const submitData: updateRoom = {
                    token: userDataRedux?.token ? userDataRedux.token.toString() : "",
                    name: formData.name.trim(),
                    roomId: roomId
                };
                const action = await dispatch(updateRoomAsync(submitData));

                if (typeof action.payload !== 'string') {

                    presentToast({ message: "Update room successful!", duration: 3000, color: "success" });
                    const updatedRoom = action.payload;
                    setRooms(prevRooms => {
                        return prevRooms.map(room => {
                            // Kiểm tra nếu id của phòng được cập nhật trùng với id của phòng trong danh sách
                            if (room._id === updatedRoom._id) {
                                // Trả về phòng đã được cập nhật
                                return updatedRoom;
                            } else {
                                // Trả về phòng ban đầu nếu không phải phòng đã cập nhật
                                return room;
                            }
                        });
                    });
                    onClose();
                } else {
                    console.log("nooo");

                    const message = action.payload ?? "Failed to update room. Please try again later.";
                    // Handle other errors if needed
                    presentToast({ message: message + "", duration: 3000, color: "danger" });
                }
            } else {
                const submitData: createRoom = {
                    token: userDataRedux?.token ? userDataRedux.token.toString() : "",
                    name: formData.name.trim(),
                };
                const action = await dispatch(createRoomAsync(submitData));

                if (createRoomAsync.fulfilled.match(action)) {
                    presentToast({ message: "Create room successful!", duration: 3000, color: "success" });
                    setRooms(prevList => [...prevList, action.payload]);
                    onClose();
                } else {
                    const message = action.payload ?? "Failed to create room. Please try again later.";
                    // Handle other errors if needed
                    presentToast({ message: message + "", duration: 3000, color: "danger" });
                }
            }

        } catch (error) {
            console.error("Error:", error);
            presentToast({ message: "Failed to create room. Please try again later.", duration: 3000, color: "danger" });
        }

        setLoading(false);
    }

    const handleInputChange = async (event: any) => {
        const { name, value } = event.target;
        console.log(name, value);

        await setFormData({ ...formData, [name]: value });
    }

    useEffect(() => {
        const featData = async () => {
            if (action == "update") {
                setTitle("Update Room");
                const action = await dispatch(getDetailRoomAsync({ token: userDataRedux?.token, roomId: roomId }))
                console.log(action);

                if (getDetailRoomAsync.fulfilled.match(action)) {
                    setFormData({ name: action.payload.name })
                } else {
                    presentToast({ message: "Error", duration: 3000, color: "danger" });
                    onClose();
                }
            }
        }
        featData();
    }, []);
    return (
        <IonPage className="add-room">


            <IonHeader className="add-room-header">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={onClose} className="add-room-header-text" >Cancel</IonButton>
                    </IonButtons>
                    <IonTitle className="add-room-header-title">{title}</IonTitle>

                </IonToolbar>
            </IonHeader>
            <IonContent className="add-room-content ion-padding" fullscreen={true}>
                <form onSubmit={handleAddRoom}>
                    <IonText className="add-room-content-laber">Name room</IonText>
                    <IonInput
                        placeholder="Enter a name for the room."
                        fill="outline"
                        className="add-room-content-input"
                        name="name"
                        mode="md"
                        type="text"
                        required
                        value={formData.name}
                        onIonChange={handleInputChange} />
                    <IonButton type="submit" expand="block" className="ion-margin-top">
                        {title}
                    </IonButton>
                </form>
            </IonContent>
            <IonLoading
                isOpen={loading}
                message={'Please wait...'}
                spinner="circles" // Use 'circles' spinner style
            />
        </IonPage>
    );
}

export default AddRoom;