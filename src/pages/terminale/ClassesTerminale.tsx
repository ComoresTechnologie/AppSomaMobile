import { IonCard, IonCardContent, IonCol, IonContent, IonHeader, IonImg, IonItem, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { getDocs, collection, getFirestore } from 'firebase/firestore';
import { useState, useEffect } from 'react';
// import firebase from 'firebase';
// import ExploreContainer from '../components/ExploreContainer';
import './ClassesTerminale.css';

const ClassesTerminale: React.FC = () => {

  const referencedb = getFirestore();
  const [ressources, setRessources] = useState<Array<any>>([]);
  const valeur = "frere";
  useEffect(() => {
    console.log('hello, voici');
    getData();
  }, []);

  

  async function getData() {
    const querySnapshot = await getDocs(collection(referencedb, "ressources/terminale/niveaux"));
    console.log(querySnapshot);
    setRessources(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Classes Terminale</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {ressources.map(ressource => (

          <IonCard key={ressource.id}>
            <IonItem routerLink='/tab1/terminale' >
              <IonRow>
                <IonCol>
                  <IonImg src="assets/images/img3.png"></IonImg>
                </IonCol>
                <IonCol>
                  <IonCardContent>
                    {/* {ressource.titre == 'Mathématiques'? <IonTitle>data</IonTitle> : null} */}
                    {ressource.intitule}
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

export default ClassesTerminale;
function firebaseConfig(firebaseConfig: any) {
  throw new Error('Function not implemented.');
}

