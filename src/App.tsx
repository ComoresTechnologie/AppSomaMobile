import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { bookmark, cart, chatbox, ellipse, home, homeOutline, person, square, triangle, umbrellaSharp } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

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
import './theme/variables.css';
import { read } from 'fs';
import Tab4 from './pages/Tab4';
import ClassesTerminale from './pages/terminale/ClassesTerminale';
import ClassesTroisieme from './pages/troisieme/ClassesTroisieme';
import Matieres from './pages/matieres/Matieres';
import Chapitres from './pages/chapitres/Chapitres';
import Cours from './pages/cours/Cours';

import Secondaire from './pages/secondaires/Secondaire';
import Cours3 from './pages/secondaires/cours/Cours';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>

      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1/terminale">
            <ClassesTerminale />
          </Route>
          <Route exact path="/tab1/troisieme">
            <ClassesTroisieme />
          </Route>
          <Route exact path="/tab1/terminale/niveaux/:identifiant/matieres/:matiere/chapitres">
            <Chapitres />
          </Route>
          <Route exact path="/tab1/terminale/niveaux/:identifiant/matieres/:matiere/chapitres/:chapitre/cours">
            <Cours />
          </Route>
          <Route exact path="/tab1/terminale/niveaux/:identifiant/matieres">
            <Matieres />
          </Route>
          <Route exact path="/tab1/troisieme/matieres/:matiere">
            <Secondaire/>
          </Route>
          <Route exact path="/tab1/troisieme/matieres/:matiere/chapitres/:chapitre/cours">
            <Cours3 />
          </Route>
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route path="/tab4">
            <Tab4 />
          </Route>
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom" color='tertiary'>
          <IonTabButton tab="tab1" href="/tab1" className='monToolBar'>
            <IonIcon icon={home} />
            <IonLabel>Accueil</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={cart} />
            <IonLabel>Boutique</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={bookmark} />
            <IonLabel>Mes livres</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab4" href="/tab1/classesTerminale">
            <IonIcon icon={chatbox} />
            <IonLabel>Forum</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
