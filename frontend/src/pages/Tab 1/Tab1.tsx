import React, { useEffect, useState } from 'react';
import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonProgressBar, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './Tab1.css';
import { closeCircleOutline, happyOutline, happySharp, personCircleOutline, searchCircleOutline, shareOutline, shareSocialOutline } from 'ionicons/icons';
import axios from 'axios'

interface tagsProps {
  tags: string[],
  rmv: Function
}
interface postsProps {
  cards: Publication[]
}

interface Publication {
  id: string,
  subjects: string[],
  media: string[],
  rating: number[],
  author: {
    name: string,
    email: string
  },
  data: {
    title: string,
    descrition: string,
    date?: string,
    image: string,
    link?: string,
    geo_reference?: any
  }
}
const Tags = (props: tagsProps) => {
  console.log(props)
  return (
    <div>
      {
        props.tags.map((tag, index) =>
          <IonChip key={index} color="secondary">
            <IonLabel color="dark">#{tag}</IonLabel>
            <IonIcon icon={closeCircleOutline} onClick={() => props.rmv(index)}></IonIcon>
          </IonChip>
        )
      }
    </div>
  )
}

const Posts = (props: postsProps) => {
  const [like, setLike] = useState<boolean>(false)
  return (
    <IonList>
      {
        props.cards.map((post, index) =>
          <IonCard style={{marginTop:"20px"}} key={index}>
            <img src={post.data.image} />
            <IonCardHeader>
              <IonCardTitle>{post.data.title}</IonCardTitle>
              <IonCardSubtitle>
                <IonIcon icon={shareSocialOutline}></IonIcon>
                <IonIcon icon={like?happySharp:happyOutline} onClick={()=>setLike(!like)}></IonIcon>
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>{post.data.descrition}</IonCardContent>
          </IonCard>
        )
      }
    </IonList>
  )
}

const Tab1: React.FC = () => {
  const [tags, setTags] = useState<Array<string>>([''])
  const [cards, setCards] = useState<Array<Publication>>()
  async function getPosts(){
    let req = await axios.get(`http://localhost:8888/publication/type?type=${tags.join(',')}`)
    setCards(req.data)
  }
  useEffect(() => {
    setTags(['historia', 'filmes']);
    getPosts()
  }, [])
  function addTag(e: any) {
    let tag = e.detail.value
    if (tag[tag.length - 1] == " ") {
      const oldTags = [...tags]
      oldTags.push(tag.slice(0, tag.length - 1))
      setTags(oldTags)
    }
  }
  function removeTag(index: number) {
    const oldTags = [...tags]
    oldTags.splice(index, 1)
    setTags(oldTags)
  }
  return (
    <IonPage>
      <IonContent fullscreen>
        <div id="user-info">
          <span>
            <p>João dos Santos</p>
            <p><IonProgressBar value={0.6} id="user-xp"></IonProgressBar></p>
          </span>
          <IonIcon icon={personCircleOutline} id="avatar"></IonIcon>
        </div>
        <IonButton expand="block" id="bt-new-post">Fazer nova publicação</IonButton>
        <IonItem id="search">
          <IonInput placeholder="Filtre as publicações por tags" onIonChange={(e) => addTag(e)} type="search"></IonInput>
          <IonIcon icon={searchCircleOutline} onClick={()=>getPosts()}></IonIcon>
        </IonItem>
        <Tags tags={tags} rmv={removeTag} />
        {cards?<Posts cards={cards} />:null}
        <IonButton expand="block" id="bt-new-post">Ver conteúdo patrocinado</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
