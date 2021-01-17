import React from 'react';
import axios from 'axios';

import {
    IonButton,
    IonContent,
    IonIcon,
    IonPage,
    IonSearchbar,
} from '@ionic/react';
import { book, ellipsisHorizontal, medal, ticket } from 'ionicons/icons';

import './Rewards.css';

const TabButton: React.FC<any> = (props: any) => {
    const className = 'tab-button ' + (props.selected ? 'selected' : '');
    return (
        <button className={className} onClick={props.handleClick}>
            <IonIcon icon={props.icon}></IonIcon>
            <small>{props.title}</small>
        </button>
    );
};

const Reward: React.FC<any> = (props: any) => {
    return (
        <div className="card">
            <div className="about">
                <h1>{props.title}</h1>
                <p>{props.description}</p>
            </div>
            <div className="xp-info">
                <small>{props.neededXP + "XP"}</small>
                <IonButton id="bt" disabled={props.neededXP > props.userXP} onClick={props.onRedeem}>
                    Resgatar
                </IonButton>
                { props.neededXP > props.userXP && (
                    <small>
                        Faltam { props.neededXP - props.userXP + 'XP'}
                    </small>
                )}
            </div>
        </div>
    );
};

export default class Rewards extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            userXP: 0,
            selected: 'bolsas',
            rewards: [],
        };
    }

    async componentDidMount() {
        const user: any = (await axios.get("http://localhost:8888/user?email=cr7m10@gmail.com")).data;
        console.log(user)
        const userXP: number = user.ranking.xp;
        console.log(userXP)
        
        const rewards = (await axios.get("http://localhost:8888/rewards")).data;

        this.setState({ userXP, rewards });
    }

    handleTabButtonClick = (button: string) => {
        return () => { this.setState({ selected: button }) };
    }

    handleRedeem = async (reward: any) => {
        await axios.put('http://localhost:8888/rewards', {...reward, email: "cr7m10@gmail.com"});
        this.setState((prevState: any) => ({ userXP: prevState.userXP - reward.xp_needed }));
    }

    render() {
        return (
            <IonPage>
                <div className="container">
                    <div className="row">
                        <IonSearchbar></IonSearchbar>
                    </div>
                    <div className="row">
                        <TabButton
                            title="Bolsas"
                            icon={book}
                            selected={this.state.selected === 'bolsas'}
                            handleClick={this.handleTabButtonClick('bolsas')} />
                        <TabButton
                            title="Lazer"
                            icon={ticket}
                            selected={this.state.selected === 'lazer'}
                            handleClick={this.handleTabButtonClick('lazer')} />
                        <TabButton
                            title="Outros"
                            icon={ellipsisHorizontal}
                            selected={this.state.selected === 'outros'}
                            handleClick={this.handleTabButtonClick('outros')} />
                    </div>
                    <div className="xp">
                        <h6>Meus pontos:</h6>
                        <div className="xp-container">
                            <h6>{this.state.userXP + 'XP'}</h6>
                            <IonIcon icon={medal}></IonIcon>
                        </div>
                    </div>
                </div>
                <IonContent>
                    { this.state.rewards
                        .filter((reward: any) => reward.tag === this.state.selected)
                        .map((reward: any, index : number) => (
                            <Reward
                                key={index}
                                userXP={this.state.userXP}
                                title={reward.data.title}
                                description={reward.data.description}
                                neededXP={reward.xp_needed}
                                onRedeem={() => this.handleRedeem(reward)} />
                        ))
                    }
                </IonContent>
                
            </IonPage>
        );
    }
};
