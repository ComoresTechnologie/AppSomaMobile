import { IonCard, IonCardContent, IonCol, IonContent, IonHeader, IonImg, IonItem, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { getDocs, collection, getFirestore, getDocsFromCache } from 'firebase/firestore';
import { useState, useEffect, JSXElementConstructor, ReactElement, ReactNodeArray, ReactPortal } from 'react';
import { useParams } from 'react-router';
// import firebase from 'firebase';
// import ExploreContainer from '../components/ExploreContainer';
import './Chapitres.css';
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { async } from '@firebase/util';

const Chapitres: React.FC = () => {

  const storage = getStorage();
  const spaceRef = ref(storage, 'images/img1.jpg');
  const downloaded = getDownloadURL(spaceRef);


  // Task<Uri> imageURL = storageReference.getDownloadUrl();
  const referencedb = getFirestore();
  const [ressources, setRessources] = useState<Array<any>>([]);
  const [imagesUrl, setImagesUrl] = useState<any>();


  useEffect(() => {
    getData();
    getImagesDownload();
  }, []);

  interface RouteParams {
    id: string
  }

  let { identifiant } = useParams<{ identifiant: string }>();
  let { matiere } = useParams<{ matiere: string }>();

  let monEssai = "";

  const [email, setEmail] = useState("");

  // const fetchUserEmail = async () => {
  //   const response = await fetch("/emails");
  //   const { email } = await response.json();
  //   setEmail(email);
  // };

  async function getImagesDownload(){
    const response = await getDownloadURL(spaceRef);
    const email = await response;
    console.log(email);
    setEmail(email);
  }
  
  async function getData() {
    const querySnapshot = await getDocsFromCache(collection(referencedb, "ressources/terminale/niveaux/" + identifiant + "/matieres/" + matiere + "/chapitres"));

    setRessources(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    
    

    // getDownloadURL(spaceRef).then((url) => {
    //   // console.log('File available at', url);
    //   monTest = url;
    //   // console.log('valeur : ', monTest)
    // })
    // console.log('la console dit : ', imagesUrl);
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
                  <IonImg src={email}></IonImg>
                  {/* <img src={monTest} alt="" /> */}
                </IonCol>
                <IonCol>
                  <IonCardContent>

                    {ressource.titre}
                    {/* {ressource.img} */}

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

