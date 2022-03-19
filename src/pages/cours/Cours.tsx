import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonHeader, IonImg, IonItem, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { getDocs, collection, getFirestore, getDocsFromCache } from 'firebase/firestore';
import { useState, useEffect, JSXElementConstructor, ReactElement, ReactNodeArray, ReactPortal } from 'react';
import { useParams } from 'react-router';
// import firebase from 'firebase';
// import ExploreContainer from '../components/ExploreContainer';
import './Cours.css';
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { async } from '@firebase/util';

const Cours: React.FC = () => {

  const storage = getStorage();
  const spaceRef = ref(storage, 'images/img1.jpg');
  // const downloaded = getDownloadURL(spaceRef);


  // Task<Uri> imageURL = storageReference.getDownloadUrl();
  const referencedb = getFirestore();
  const [ressources, setRessources] = useState<Array<any>>([]);
  const [imagesUrl, setImagesUrl] = useState<any>();


  useEffect(() => {
    getData();
    // getImagesDownload();
  }, []);

  interface RouteParams {
    id: string
  }

  let { identifiant } = useParams<{ identifiant: string }>();
  let { matiere } = useParams<{ matiere: string }>();
  let { chapitre } = useParams<{ chapitre: string }>();

  let monEssai = "";

  const [email, setEmail] = useState("");

  async function getImagesDownload() {
    // const referenceImage = ref(storage, )
    const response = await getDownloadURL(spaceRef);
    const email = await response;
    setEmail(email);
    console.log(email);
  }

  async function getData() {
    const querySnapshot = await getDocs(collection(referencedb, "ressources/terminale/niveaux/" + identifiant + "/matieres/" + matiere + "/chapitres/"+chapitre+"/cours"));

    setRessources(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

  }

  return (
    <IonPage>

      <IonHeader color='tertiary'>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Cours {matiere}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {ressources.map(ressource => (

          <IonCard key={ressource.id}>
            <IonItem>
              <IonRow>
                
                <IonCol>
                  <IonCardContent>
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

export default Cours;
function firebaseConfig(firebaseConfig: any) {
  throw new Error('Function not implemented.');
}

