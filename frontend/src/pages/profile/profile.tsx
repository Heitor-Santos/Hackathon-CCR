import React, {useState, useEffect} from 'react';
import { IonAvatar, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonPage, IonProgressBar, IonTitle, IonToolbar } from '@ionic/react';
import './profile.css';
import { arrowRedo, createOutline, layers, medalOutline, personCircleOutline, ribbonOutline, rocketOutline } from 'ionicons/icons';
import axios from 'axios'
import { User } from '../../../../backend/interfaces'


const email: string = "cr7m10@gmail.com"
const student : User = {
  name: "",
  email: "",
  school: "",
  ranking: {
      level: 0,
      xp: 0
  },
  publications: [],
  rewards: [],
  favorites: []
}


const Profile: React.FC = () => {
  const [aluno, setAluno] = useState(student)
    useEffect(() => {
        axios.get('http://localhost:8888/user?email=' + email)
            .then(response => setAluno(response.data))
    })

    return (
      <IonPage>
        <IonHeader class="ion-no-border">
        </IonHeader>
        <IonContent fullscreen>
            <div className="profile-content">
                <p style={{textAlign:'center'}}><IonIcon icon={personCircleOutline} style={{height:"100px", width:"100px"}}></IonIcon></p>
                <p style={{textAlign:'center'}}><IonIcon className="profile-content-avatar-icon" icon={createOutline}></IonIcon></p>
                <IonItem lines="none" className="profile-name">
                    <div className="profile-name-data">
                        <h3>{aluno.name}</h3>
                        <p>{aluno.school}</p>
                    </div>
                </IonItem>
            </div>
            <div className="data">
                <IonItem lines="none">
                    <IonIcon className="data-icon-xp" icon={layers}></IonIcon>
                </IonItem>
            </div>
            <p style={{textAlign:"center", color:"white"}}>{aluno.ranking.xp}xp</p>
            <IonItem lines="none">
                <p style={{color:"white"}}>Progresso na fase...</p>
            </IonItem>
            <IonProgressBar className="bar-progress" color="success" value={aluno.ranking.xp/100}></IonProgressBar>
            <IonItemDivider>
                <div className="bottom-icons">
                    <IonItem lines="none"><IonIcon className="bottom-icon" color="warning" icon={medalOutline}></IonIcon></IonItem>
                    <IonItem lines="none"><IonIcon className="bottom-icon" color="medium" icon={ribbonOutline}></IonIcon></IonItem>
                    <IonItem lines="none"><IonIcon className="bottom-icon" color="medium" icon={rocketOutline}></IonIcon></IonItem>
                </div>
            </IonItemDivider>
            <IonItem lines="none" href="/rewards">
                <div className="bottom-invite">
                    <IonIcon className="bottom-invite-icon" color="secondary" icon={arrowRedo}></IonIcon>
                    <p>Cupons Resgatados</p>
                </div>
            </IonItem>
            <IonItem lines="none">
                <div className="bottom-invite">
                    <IonIcon className="bottom-invite-icon" color="secondary" icon={arrowRedo}></IonIcon>
                    <p>Convide um amigo e ganhe 50XP</p>
                </div>
            </IonItem>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large"></IonTitle>
            </IonToolbar>
          </IonHeader>
        </IonContent>
      </IonPage>
    );
  };

export default Profile;