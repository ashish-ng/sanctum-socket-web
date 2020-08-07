<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Chats</div>

                    <div class="panel-body">
                        <chat-messages :messages="messages"></chat-messages>
                    </div>
                    <div class="panel-footer">
                        <chat-form
                            v-on:messagesent="addMessage"
                            :user="user"
                        ></chat-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import User from "../apis/User";
import ChatMessages from "../components/ChatMessages.vue";
import ChatForm from "../components/ChatForm.vue";

export default {
    components: {
        ChatMessages,
        ChatForm
    },
    mounted() {
        this.$store.dispatch('fetchMessages');
    },
    computed: {
        user() {
            return JSON.parse(localStorage.getItem("user"));
        },
        messages() {
            return this.$store.getters.getMessages;
        }
    },
    methods: {
        addMessage(message) {
            User.addMessage(message)
                .then(response => {
                console.log(response.data);
                });
        }
    }
};
</script>
