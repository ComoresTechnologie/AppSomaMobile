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

// Import the main component
import { SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library
import { url } from 'inspector';
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
    const querySnapshot = await getDocs(collection(referencedb, "ressources/terminale/niveaux/" + identifiant + "/matieres/" + matiere + "/chapitres/" + chapitre + "/cours"));

    setRessources(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

  }

  const pdfFile = 'https://arxiv.org/pdf/quant-ph/0410100.pdf';
  // const pdfFile = 'https://firebasestorage.googleapis.com/v0/b/ma-base-dbb70.appspot.com/o/documents%2Fdoc2.pdf?alt=media&token=d5ee9c24-5bca-402a-b9c8-f8de70e29ebb';
  const [defaultPdfFile] = useState(pdfFile);

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
          
          <div key={ressource.id}>
            <Worker workerUrl="assets/lib/pdf.worker.min.js">
              <Viewer defaultScale={SpecialZoomLevel.PageFit} fileUrl={ressource.document} />

            </Worker>
            
          </div>

        ))}
      </IonContent>
    </IonPage>
  );
};

export default Cours;
function firebaseConfig(firebaseConfig: any) {
  throw new Error('Function not implemented.');
}

