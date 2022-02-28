import { IonCard, IonCardContent, IonCol, IonContent, IonHeader, IonImg, IonItem, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { getDocs, collection, getFirestore } from 'firebase/firestore';
import { useState, useEffect, JSXElementConstructor, ReactElement, ReactNodeArray, ReactPortal } from 'react';
import { useParams } from 'react-router';
// import firebase from 'firebase';
// import ExploreContainer from '../components/ExploreContainer';
import './Chapitres.css';

const Chapitres: React.FC = () => {

  const referencedb = getFirestore();
  const [ressources, setRessources] = useState<Array<any>>([]);
  const valeur = "frere";
  useEffect(() => {
    console.log('hello, voici');
    getData();
  }, []);

  interface RouteParams {
    id: string
  }

  let {identifiant} = useParams<{identifiant: string}>();
  let {matiere} = useParams<{matiere: string}>();
  async function getData() {
    // let id;
    
    
    const querySnapshot = await getDocs(collection(referencedb, "ressources/terminale/niveaux/"+identifiant+"/matieres/physique/chapitres"));
    console.log(querySnapshot);
    setRessources(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Chapitre test</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {ressources.map(ressource => (

          <IonCard key={ressource.id}>
            <IonItem routerLink='/' >
              <IonRow>
                <IonCol>
                  <IonImg src="assets/images/img3.png"></IonImg>
                </IonCol>
                <IonCol>
                  <IonCardContent>
                    {/* {ressource.titre == 'Mathématiques'? <IonTitle>data</IonTitle> : null} */}
                    {ressource.titre} de test chapitres
                    
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

export default Chapitres;
function firebaseConfig(firebaseConfig: any) {
  throw new Error('Function not implemented.');
}

