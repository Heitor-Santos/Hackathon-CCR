import React, { useEffect, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonProgressBar} from '@ionic/react';
import './Tab1.css';
import { closeCircleOutline, personCircleOutline, searchCircleOutline,  shareSocialOutline, star, starOutline} from 'ionicons/icons';
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

  const [myMap, setMap] = useState(new Map<string,boolean>());
  const [user, setUser] = useState<any>()

  const getUser = async () => {
    const userMsg = (await axios.get("http://localhost:8888/user?email=cr7m10@gmail.com")).data
    setUser(userMsg)
  }

  useEffect(() => {
    getUser()
  }, [])

  const handleHidden = async (descrition : string, numb : number, rating: number[], id: string) => {

    var newMap = new Map(myMap)
    newMap.set(descrition+numb, true)

    if (numb > 1) {
      for (let i = numb-1; i > 0; i--) {
        newMap.set(descrition+i, true)
      }
    }

    for (var [key, value] of newMap) {
      if (key.substr(0, key.length-1) == descrition && parseInt(key[key.length-1]) <= numb) {
        newMap.set(key, true)
      } else if (key.substr(0, key.length-1) == descrition && parseInt(key[key.length-1]) > numb) {
        newMap.set(key, false)
      }
    }

    rating.push(numb)

    await axios.put("http://localhost:8888/publication", {id: id, rating: rating})
    const userRes = await axios.get("http://localhost:8888/user?email=cr7m10@gmail.com")
    await axios.put("http://localhost:8888/user", {email: "cr7m10@gmail.com", publications: {id: id, rating: numb}, ranking: {level: 20, xp: userRes.data.ranking.xp + 5}})

    setMap(newMap);
  };

  const checkUser = (id: string) => {

    if (user) {
      for (let publi of user.publications) {
        if (publi.id == id) {
          return publi.rating
        }
      }
    }
    return false;
  }

  return (
    <IonList>
      {
        props.cards.map((post, index) => 
            <IonCard style={{marginTop:"20px"}} key={index}>
              <img src={post.data.image} />
              <IonCardHeader>
                <IonCardTitle>{post.data.title}</IonCardTitle>
                <IonCardSubtitle className="cardSubtitle">
                <IonIcon size = "large" icon={shareSocialOutline} ></IonIcon>
                <IonIcon size = "large" icon={checkUser(post.id) >= 1 ? star : myMap.get(post.data.descrition+1) ? star: starOutline} color="warning" onClick={async ()=>myMap.get(post.data.descrition+1) ? null :  handleHidden(post.data.descrition,1, post.rating, post.id)}></IonIcon>
                <IonIcon size = "large" icon={checkUser(post.id) >= 2 ? star : myMap.get(post.data.descrition+2) ? star: starOutline} color="warning" onClick={async ()=>myMap.get(post.data.descrition+1) ? null :  handleHidden(post.data.descrition,2, post.rating, post.id)}></IonIcon>
                <IonIcon size = "large" icon={checkUser(post.id) >= 3 ? star : myMap.get(post.data.descrition+3) ? star: starOutline} color="warning" onClick={async ()=>myMap.get(post.data.descrition+1) ? null :  handleHidden(post.data.descrition,3, post.rating, post.id)}></IonIcon>
                <IonIcon size = "large" icon={checkUser(post.id) >= 4 ? star : myMap.get(post.data.descrition+4) ? star: starOutline} color="warning" onClick={async ()=>myMap.get(post.data.descrition+1) ? null :  handleHidden(post.data.descrition,4, post.rating, post.id)}></IonIcon>
                <IonIcon size = "large" icon={checkUser(post.id) >= 5 ? star : myMap.get(post.data.descrition+5) ? star: starOutline} color="warning" onClick={async ()=>myMap.get(post.data.descrition+1) ? null :  handleHidden(post.data.descrition,5, post.rating, post.id)}></IonIcon>
                <h2 className="rating">{post.rating.length == 0 ? "Não avaliado": (post.rating.reduce((a, b) => a + b, 0)/post.rating.length).toFixed(1) + "/5"}</h2>
                <span className="tags">{post.media.map(el => <p>#{el}</p>).concat(post.subjects.map(el => <p>#{el}</p>))}</span>    
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
  const [tags, setTags] = useState<Array<string>>([])
  const [cards, setCards] = useState<Array<Publication>>()
  const [user, setUser] = useState<any>()

  async function getPosts(_tag?: string[]){
    const tagsType = _tag ? _tag.join(','): tags.join(',')
    let req = await axios.get(`http://localhost:8888/publication/type?type=${tagsType}`)
    let reqUser = await axios.get(`http://localhost:8888/user?email=cr7m10@gmail.com`)
    console.log(req,reqUser)
    setCards(req.data)
    setUser(reqUser.data)
  }

  useEffect(() => {
    setTags(['historia', 'filmes']);
    getPosts(['historia', 'filmes'])
    
  }, [])

  function addTag(e: any) {
    let tag = e.detail.value
    if (tag[tag.length - 1] == " ") {
      const oldTags = [...tags]
      oldTags.push(tag.slice(0, tag.length - 1))
      setTags(oldTags)
      getPosts(oldTags)
    }
  }

  function removeTag(index: number) {
    const oldTags = [...tags]
    oldTags.splice(index, 1)
    setTags(oldTags)
    getPosts(oldTags)
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="page-container"> 
          <div id="user-info">
            <span>
              <p>{user ? user.name : "Carregando..."}</p>
              <p><IonProgressBar value={user ? (user.ranking.xp)/100 : 0} id="user-xp"></IonProgressBar></p>
            </span>
            <IonIcon icon={personCircleOutline} id="avatar"></IonIcon>
          </div>
          <IonButton href="/new-post" expand="block" id="bt-new-post">Fazer nova publicação</IonButton>
          <IonItem id="search">
            <IonInput placeholder="Filtre as publicações por tags" onIonChange={(e) => addTag(e)} type="search"></IonInput>
            <IonIcon size = "large" icon={searchCircleOutline} onClick={()=>getPosts()}></IonIcon>
          </IonItem>
          <Tags tags={tags} rmv={removeTag} />
          {cards?<Posts cards={cards} />:null}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
