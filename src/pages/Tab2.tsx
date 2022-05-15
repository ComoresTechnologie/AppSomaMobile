import { IonContent, IonHeader, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

const Tab2: React.FC = () => {

  const [searchText, setSearchText] = useState('');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Boutique</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} placeholder="Rechercher produits"></IonSearchbar>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
