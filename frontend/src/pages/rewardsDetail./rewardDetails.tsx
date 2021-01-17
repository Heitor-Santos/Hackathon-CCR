import React, { useEffect, useState } from 'react';
import { IonCard, IonCardContent, IonCardHeader,  IonCardTitle, IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import axios from 'axios'


const RewardDetails: React.FC = () => {

  const [user, setUser] = useState<any>()

  const getUser = async ()=> {

    const res = (await (axios.get("http://localhost:8888/user?email=cr7m10@gmail.com"))).data
    setUser(res)

  }
  
  useEffect(() => {
    getUser()
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonTitle>Meus Cupons</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {!user ? null : 
            user.rewards.map((el :any, index: number) => 
              <IonCard key={index}>
                <IonCardHeader>
                  <IonCardTitle>{el.data.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  {el.data.descrition}
                </IonCardContent>
              </IonCard>
            )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default RewardDetails;
