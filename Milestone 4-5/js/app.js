Vue.config.devtools = true;

window.addEventListener("DOMContentLoaded", () =>{
  new Vue({
    el: "#root",
    data: {
      contacts: [
        {
          name: 'Michele',
          avatar: '_1',
          clicked: false,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              text: 'Hai portato a spasso il cane?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              text: 'Ricordati di dargli da mangiare',
              status: 'sent'
            },
            {
              date: '10/01/2020 16:15:22',
              text: 'Tutto fatto!',
              status: 'received'
            },
            {
              date: '10/01/2020 15:30:55',
              text: 'Hai portato a spasso il cane?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              text: 'Ricordati di dargli da mangiare',
              status: 'sent'
            },
            {
              date: '10/01/2020 16:15:22',
              text: 'Tutto fatto!',
              status: 'received'
            },
            {
              date: '10/01/2020 15:30:55',
              text: 'Hai portato a spasso il cane?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              text: 'Ricordati di dargli da mangiare',
              status: 'sent'
            },
            {
              date: '10/01/2020 16:15:22',
              text: 'Tutto fatto!',
              status: 'received'
            },
          ],
        },
        {
          name: 'Fabio',
          avatar: '_2',
          clicked: false,
          messages: [
            {
              date: '20/03/2020 16:30:00',
              text: 'Ciao come stai?',
              status: 'sent'
            },
            {
              date: '20/03/2020 16:30:55',
              text: 'Bene grazie! Stasera ci vediamo?',
              status: 'received'
            },
            {
              date: '20/03/2020 16:35:00',
              text: 'Mi piacerebbe ma devo andare a fare la spesa.',
              status: 'sent'
            },
          ],
        },
        {
          name: 'Samuele',
          avatar: '_3',
          clicked: false,
          messages: [
            {
              date: '28/03/2020 10:10:40',
              text: 'La Marianna va in campagna',
              status: 'received'
            },
            {
              date: '28/03/2020 10:20:10',
              text: 'Sicuro di non aver sbagliato chat?',
              status: 'sent'
            },
            {
              date: '28/03/2020 16:15:22',
              text: 'Ah scusa!',
              status: 'received'
            },
          ],
        },
        {
          name: 'Luisa',
          avatar: '_4',
          clicked: false,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              text: 'Lo sai che ha aperto una nuova pizzeria?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              text: 'Si, ma preferirei andare al cinema',
              status: 'received'
            },
          ],
        },
      ],
      activeChat: {},
      newMessageText: "",
      filterText: "",
      filteredContacts: [],
    },
    methods: {
      createImgPath(avatar){
        return `../img/avatar${avatar}.jpg`;
      },

      getLastMessage(messages){
        if(messages.length === 0){
          return "";
        }
        const message = messages[messages.length - 1].text;
        return message.slice(0,20);
      },

      // function to select the active chat to display
      onChatClick(clickedChat, index){
        this.activeChat = clickedChat;
        this.activeChat.index = index;

        this.scrollToBottom();
      },

      lastSeen(messagesContainer){
        return messagesContainer[messagesContainer.length-1].date;
      },

      // Function called once sent a new text message
      onAddClick(){
        if(this.newMessageText.trim() === ""){
          return;
        }

        this.addMessage(this.newMessageText, "sent")
        this.newMessageText = "";
      
        setTimeout(() => {
          this.addMessage('ok', 'received')
        }, 1000);

      },

      // function to add a new text message to the chat
      addMessage(messageText, sender){
        this.activeChat.messages.push({
          date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
          text: messageText,
          status: sender,
        });
        this.scrollToBottom();
      },

      searchFilter(){
        filteredContacts = this.getFilteredContacts();
      },

      // function called to filter the contacts to show
      getFilteredContacts(){
        console.log("Filter called");
        if(this.filterText.trim() === ""){
          return this.filteredContacts = this.contacts;
        }
        return this.filteredContacts = this.contacts.filter((contact) => {
          return contact.name.toLowerCase().includes(this.filterText.toLowerCase().trim());
        });
      },
      
      scrollToBottom(){
        setTimeout(() => {
          this.$refs.containerMessages.scrollTop = this.$refs.containerMessages.scrollHeight;
        }, 0);
      },

    },

    created(){
      this.activeChat = this.contacts[0];
      this.searchFilter();
      this.scrollToBottom();
    },

    mounted(){
      
    }
  });
});