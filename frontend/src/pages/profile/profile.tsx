import React, {useState, useEffect} from 'react';
import { IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonPage, IonProgressBar, IonTitle, IonToolbar } from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import './profile.css';
import { arrowRedo, createOutline, layers, medalOutline, ribbonOutline, rocketOutline } from 'ionicons/icons';
import axios from 'axios'
import { useParams } from 'react-router';
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
          <IonToolbar>
            <IonButton className="top-button" color="light">Voltar</IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <div className="profile-content">
                <IonItem lines="none" className="profile-content-avatar">
                    <IonAvatar className="item-avatar">
                        <img src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" />
                    </IonAvatar>
                    <IonIcon className="profile-content-avatar-icon" icon={createOutline}></IonIcon>
                </IonItem>
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
            <div className="profile-xp">
                {aluno.ranking.xp}xp
            </div>
            <IonItem lines="none">
                <p>Progresso na fase...</p>
            </IonItem>
            <IonProgressBar className="bar-progress" color="success" value={aluno.ranking.xp/100}></IonProgressBar>
            <IonItemDivider>
                <div className="bottom-icons">
                    <IonItem lines="none"><IonIcon className="bottom-icon" color="warning" icon={medalOutline}></IonIcon></IonItem>
                    <IonItem lines="none"><IonIcon className="bottom-icon" color="success" icon={ribbonOutline}></IonIcon></IonItem>
                    <IonItem lines="none"><IonIcon className="bottom-icon" color="medium" icon={rocketOutline}></IonIcon></IonItem>
                </div>
            </IonItemDivider>
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