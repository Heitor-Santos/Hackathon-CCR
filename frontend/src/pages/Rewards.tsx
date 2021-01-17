import React from 'react';

import {
    IonButton,
    IonIcon,
    IonPage,
    IonSearchbar,
} from '@ionic/react';
import { book, ellipsisHorizontal, heart, ticket } from 'ionicons/icons';

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
                {/* <IonIcon icon={heart}></IonIcon> */}
            </div>
            <div className="xp-info">
                <small>{props.neededXP + "XP"}</small>
                <IonButton>Resgatar</IonButton>
            </div>
        </div>
    );
};

export default class Rewards extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            selected: 'bolsas',
            availableRewards: [
                {
                    tag: 'bolsas',
                    xp_needed: 150,
                    data: {
                        title: 'SENAC',
                        description: 'Curso de Logística'
                    },
                },
            ]
        };
    }

    handleTabButtonClick = (button: string) => {
        return () => { this.setState({ selected: button }) };
    }

    render() {
        return (
            <IonPage>
                <div className="row">
                    <IonButton fill="outline">Voltar</IonButton>
                    <IonSearchbar></IonSearchbar>
                    {/* <IonButton><IonIcon icon={heart}></IonIcon></IonButton> */}
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
                <div>
                    { this.state.availableRewards
                        .filter((reward: any) => reward.tag === this.state.selected)
                        .map((reward: any) => (
                            <Reward
                                title={reward.data.title}
                                description={reward.data.description}
                                neededXP={reward.xp_needed} />
                        ))
                    }
                </div>
            </IonPage>
        );
    }
};
