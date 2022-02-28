import { IonCard, IonCardContent, IonCol, IonContent, IonHeader, IonImg, IonItem, IonPage, IonRouterOutlet, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { getDocs, collection, getFirestore } from 'firebase/firestore';
import { useState, useEffect, JSXElementConstructor, ReactElement, ReactNodeArray, ReactPortal } from 'react';
import { Route, useParams } from 'react-router';
import Chapitres from '../chapitres/Chapitres';
// import firebase from 'firebase';
// import ExploreContainer from '../components/ExploreContainer';
import './Matieres.css';

const Matieres: React.FC = () => {

  const referencedb = getFirestore();
  const [ressources, setRessources] = useState<Array<any>>([]);
  // const valeur = "frere";
  useEffect(() => {
    console.log('hello, voici');
    getData();
  }, []);

  interface RouteParams {
    id: string
  }

  let { identifiant } = useParams<{ identifiant: string }>();
  let { matiere } = useParams<{ matiere: string }>();
  async function getData() {
    // let id;


    const querySnapshot = await getDocs(collection(referencedb, "ressources/terminale/niveaux/" + identifiant + "/matieres"));
    console.log(querySnapshot);
    setRessources(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  return (
    <IonPage>

      <IonRouterOutlet>
        <Route exact path="/tab1/chapitre">
          <Chapitres />
        </Route>        
        
      </IonRouterOutlet>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Chapitre test {identifiant}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {ressources.map(ressource => (

          <IonCard key={ressource.id}>
            <IonItem routerLink={'/tab1/terminale/niveaux/'+identifiant+"/matieres/"+ressource.id+"/chapitres"}>
              <IonRow>
                <IonCol>
                  <IonImg src="assets/images/img3.png"></IonImg>
                </IonCol>
                <IonCol>
                  <IonCardContent>
                    {/* {ressource.titre == 'Mathématiques'? <IonTitle>data</IonTitle> : null} */}
                    {ressource.titre}
                      
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

export default Matieres;
function firebaseConfig(firebaseConfig: any) {
  throw new Error('Function not implemented.');
}

