import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, person, ticket} from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import Profile from './pages/Profile/Profile';
import Rewards from './pages/Rewards/Rewards';
import ReedemedRewards from './pages/RedeemedRewards/ReedemedRewards';
import Publications from './pages/Publications/Publications';
import NewPost from './pages/NewPost/NewPost';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/publications" component={Publications} exact={true} />
          <Route path="/rewards" component={Rewards} exact={true} />
          <Route path="/profile" component={Profile} exact={true}/>
          <Route path="/reedemed-rewards" component={ReedemedRewards} />
          <Route path="/new-post" component={NewPost} />
          <Route path="/" render={() => <Redirect to="/publications" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="publications" href="/publications">
            <IonIcon icon={home} />
            <IonLabel>Inicio</IonLabel>
          </IonTabButton>
          <IonTabButton tab="rewards" href="/rewards">
            <IonIcon icon={ticket} />
            <IonLabel>Descontos</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={person} />
            <IonLabel>Perfil</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
