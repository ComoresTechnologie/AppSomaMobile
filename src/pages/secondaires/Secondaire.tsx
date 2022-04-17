import { IonCard, IonCardContent, IonCol, IonContent, IonHeader, IonImg, IonItem, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { getDocs, collection, getFirestore } from 'firebase/firestore';
import { resourceUsage } from 'process';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
// import firebase from 'firebase';
// import ExploreContainer from '../components/ExploreContainer';
import './Secondaire.css';


const Secondaire: React.FC = () => {

  let { matiere } = useParams<{ matiere: string }>();

  const referencedb = getFirestore();
  const [ressources, setRessources] = useState<Array<any>>([]);
  const valeur = "frere";
  useEffect(() => {
    console.log('hello, voici');
    getData();
  }, []);

  

  async function getData() {
    const querySnapshot = await getDocs(collection(referencedb, "ressources/troisieme/matieres/"+matiere+"/chapitres"));
    console.log(querySnapshot);
    setRessources(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Classe Troisième</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {ressources.map(ressource => (

          <IonCard key={ressource.id}>
            <IonItem routerLink={'/tab1/troisieme/matieres/'+matiere+'/chapitres/'+ressource.id+'/cours'} >
              <IonRow>
                <IonCol>
                  <IonImg src={ressource.image}></IonImg>
                </IonCol>
                <IonCol>
                  <IonCardContent>
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

export default Secondaire;
function firebaseConfig(firebaseConfig: any) {
  throw new Error('Function not implemented.');
}

