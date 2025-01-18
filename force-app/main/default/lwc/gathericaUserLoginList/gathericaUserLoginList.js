import { LightningElement, track } from 'lwc';
import { subscribe, unsubscribe, onError, setDebugFlag, APPLICATION_SCOPE } from 'lightning/empApi';

export default class GathericaUserLoginList extends LightningElement {
    @track events = []; // Store received events
    channelName = '/event/Gatherica_User_Login_Capture__e'; // Platform Event channel
    subscription = {};

    // Subscribe to platform events when component is connected
    connectedCallback() {
        this.handleSubscribe();
    }

    // Unsubscribe from platform events when component is disconnected
    disconnectedCallback() {
        this.handleUnsubscribe();
    }

    // Subscribe to the platform event channel
    handleSubscribe() {
        const messageCallback = (response) => {
            // Push received event to the events list
            this.events = [...this.events, response];
        };

        // Subscribe to the platform event channel
        subscribe(this.channelName, -1, messageCallback,
            { scope: APPLICATION_SCOPE }).then((response) => {
                console.log('Subscribed to channel: ', response.channel);
                this.subscription = response;
            });

        // Error handling
        onError((error) => {
            console.error('Received error: ', error);
        });

        // Enable empApi debugging (optional)
        setDebugFlag(true);
    }

    // Unsubscribe from the platform event channel
    handleUnsubscribe() {
        unsubscribe(this.subscription, (response) => {
            console.log('Unsubscribed from channel: ', response.channel);
        });
    }
}