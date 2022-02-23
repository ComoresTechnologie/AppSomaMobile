import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonHeader, IonImg, IonItem, IonLabel, IonList, IonPage, IonRouterOutlet, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { config } from '../firebaseConfig';
import './Tab1.css';

const Tab1: React.FC = () => {

  const configApp = config;
  // const app = initializeApp(config)
  const referencedb = getFirestore();

  const [input, setInput] = useState<string>('')
  const [ressources, setRessources] = useState<Array<any>>([]);
  const valeur = "frere";
  useEffect(() => {
    console.log('hello, voici');
    getData();
  }, []);

  async function getData() {
    const querySnapshot = await getDocs(collection(referencedb, "ressources"));
    console.log(querySnapshot);
    setRessources(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }


  return (
    <IonPage>

      <div className='fond-header'>
        <div className="header">
          <img className='image' src="/assets/iconSoma.png" alt="" />
        </div>
      </div>
      <IonContent className='ion-padding' color='success'>
        {ressources.map(ressource => (

          <IonCard key={ressource.id}>
            <IonItem routerLink={'/tab1/' + ressource.id} >
              <IonRow>
                <IonCol>
                  <IonImg src="assets/images/img3.png"></IonImg>
                </IonCol>
                <IonCol>
                  <IonCardContent>
                    {ressource.libelle}
                  </IonCardContent>
                </IonCol>
              </IonRow>
            </IonItem>
          </IonCard>

        ))}



      </IonContent>
    </IonPage>
  );
};

export default Tab1;
