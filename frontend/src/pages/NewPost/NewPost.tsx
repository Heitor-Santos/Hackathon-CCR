import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './NewPost.css';
import axios from 'axios';
import {v4 as uuidv4}from 'uuid';
import { Redirect } from 'react-router';

const NewPost: React.FC = () => {
    const [materia,setMateria] = useState<any>('');
    const [media,setMedia] = useState<any>('');
    const [title,setTitle] = useState<any>('');
    const [desc,setDesc] = useState<any>('');
    const [img,setImg] = useState<any>('');
    const [criouPost, setPost] = useState<boolean>(false)
    const [link,setLink] = useState<any>(''); 
    async function newPost() {
        await axios.post('https://time-133.herokuapp.com/publication',{
            id: uuidv4(),
            subjects:materia.split(",").map((el: string) => el.trim()),
            media: media.split(",").map((el: string) => el.trim()),
            rating: [],
            author:{
                name:'Lumar',
                email:'cr7m10@gmail.com'
            },
            data:{
                title:title,
                descrition: desc,
                image: img,
                link: link
            }
        })
        setPost(true)
    }
    return (
        criouPost ? <Redirect to= "/publications" /> :
        (<IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Nova Publicação</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonList id="form">
                <IonItem>
                    <IonLabel position="floating">Matéria</IonLabel>
                    <IonInput placeholder="sobre qual matéria é seu post?" onIonChange={(e)=>setMateria(e.detail.value)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Mídia</IonLabel>
                    <IonInput placeholder="Ex: filmes,séries,museus" onIonChange={(e)=>setMedia(e.detail.value)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Título</IonLabel>
                    <IonInput onIonChange={(e)=>setTitle(e.detail.value)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Descrição</IonLabel>
                    <IonInput onIonChange={(e)=>setDesc(e.detail.value)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">URL para imagem</IonLabel>
                    <IonInput onIonChange={(e)=>setImg(e.detail.value)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Link importante</IonLabel>
                    <IonInput onIonChange={(e)=>setLink(e.detail.value)}></IonInput>
                </IonItem>
            </IonList>
            <p style={{ textAlign: "center" }}><IonButton onClick={()=>newPost()}>Criar post</IonButton></p>
        </IonContent>
    </IonPage>)
        
    )
}

export default NewPost