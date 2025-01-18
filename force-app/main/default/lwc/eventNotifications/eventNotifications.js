import { LightningElement, track, api } from 'lwc';
import getUserNotification from '@salesforce/apex/UserNotificationHandler.getUserNotification';

export default class EventNotifications extends LightningElement {
    @track isModalOpen = false;
    @track hasNotifications = false;
    @track notifications = [];
    @api username = 'chiragjuneja001';
    @track showData = false;

    connectedCallback() {
        this.handleBellClick();
        this.fetchNotifications();
    }

    fetchNotifications() {
        const wrapperInput = {
            username : this.username,
        };

        getUserNotification(wrapperInput).then(result => {
            console.log('OUTPUT : ',JSON.stringify(result));
            this.notifications = result;
            this.showData = true;
        }).catch(error => {
            console.log('OUTPUT : ',JSON.stringify(error));
            this.showData = truel
        });
    }

    disconnectedCallback() {
       this.clearNotifications();
    }

    // Show the modal when the bell icon is clicked
    handleBellClick() {
        // Toggle modal without unnecessary re-renders
        if (!this.isModalOpen) {
            this.isModalOpen = true;
        }
        this.hasNotifications = false; // Remove the dot when modal is opened
    }

    // Close the modal
    closeModal() {
        if (this.isModalOpen) {
            this.isModalOpen = false;
        }
        this.dispatchEvent(
            new CustomEvent (
                'closenotificationbar'
            )
        );
    }

    // Clear the notifications
    clearNotifications() {
        this.notifications = [];
        this.closeModal(); // Close modal after clearing notifications
    }
}