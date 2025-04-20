import { ref, onMounted, onBeforeUnmount } from 'vue';
import { 
    getUserProfile, 
    updateUserProfile, 
    getAllUsers, 
    registerUser,
    loginUser,
    startChat,
    getAllUserChat,
    getAllChatMsg,
    sendMsg,
    startGroup, 
    leaveTheGroup,
    deleteTheGroup,
    removeUserFromGroup,
    addUserIntoGroup,
    updateGroupInfo,
    updateRole
} from '../utils/fetchApi';
import { useLoadingState } from './loadError';
import type { 
    User, 
    UpdateUserForm, 
    UserResponse, 
    RegisterForm,
    LoginForm,
    AuthResponse,
    Conversation,
    Message,
    Participant,
    ConversationForm,
    GeneralResponse,
    ChatResult,
    MappedMessage,
    MessageResult 
} from '../utils/interface';
import { formatMessageTime } from './format';
import { initializeSocket } from '../utils/socketService';
import { 
    emitter, 
    setupMessageListenerIo, 
    getConversationsIo, 
    getMsgIo, 
    sendMsgIo, 
    sendTypingStatusIo, 
    leaveGroupIo,
    removeParticipantIo,
    addParticipantIo 
} from '../utils/socketApi';

  const { 
    isLoading, 
    error, 
    startLoading, 
    stopLoading, 
    setError,
    clearError
  } = useLoadingState();

// Composable manajemen CRUD api user
export function profileData() {
  const user = ref<User | null>(null); 
  const users = ref<User[]>([]); 
  
  const loadUserProfile = async (): Promise<User | null> => {
    startLoading();
    clearError(); 
    
    try {
      const userData = await getUserProfile();
      user.value = userData;
      stopLoading();
      return userData;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile data');
      return null;
    }
  };
  
  const saveProfile = async (formData: UpdateUserForm): Promise<User | null> => {
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Name and email are required.');
      return null;
    }
    
    startLoading();
    clearError(); 
    
    try {
        const updatedUser = await updateUserProfile(formData);
      
        if (updatedUser) {
          if (user.value && updatedUser) {
            user.value = {
              ...user.value,
              ...updatedUser,
              id: updatedUser.user.id || user.value.id
            } as User;
          }
        }
        
        stopLoading();
        return user.value;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile. Please try again.');
      return null;
    }
  };

  const allUserProfile = async (): Promise<User[]> => {
    startLoading();
    clearError(); 
    try {
        const allUsers = await getAllUsers();
        
        users.value = allUsers || [];
        stopLoading();
        return users.value;
    } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to get all members. Please try again.');
        return [];
    }
  } 

  const registerUserProfile = async (formData: RegisterForm): Promise<UserResponse> => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('All fields are required.');
      throw error
    }
    
    startLoading();
    clearError();
    
    try {
      const response = await registerUser(formData);
      stopLoading();
      return response;
    } catch (err) {
      stopLoading()
      setError(err instanceof Error ? err.message : 'Register failed. Please try again.');
      throw err
    }
  };

  const loginUserProfile = async (formData: LoginForm): Promise<AuthResponse> => {
    if (!formData.email.trim() || !formData.password.trim()) {
        setError('All fields are required.');
        throw error
    }

    startLoading();
    clearError();

    try {
        const response = await loginUser(formData)
        localStorage.setItem('token', response.token)
        localStorage.setItem('userId', response.user.id)
        stopLoading()
        return response
    } catch (err) {
        stopLoading()
        setError(err instanceof Error ? err.message : 'Invalid Email or Password !');
        throw err
    }
  }
  
  return {
    user,
    users,
    isLoading,
    error,
    clearError,
    loadUserProfile,
    saveProfile,
    allUserProfile, 
    registerUserProfile,
    loginUserProfile
  };
}

export function chatData() {
    const conversation = ref<Conversation | null>(null);
    const conversations = ref<Conversation[]>([]);
    const messages = ref<Message[]>([]);
    const currentChat = ref<Conversation | null>(null);
    const mappedMessages = ref<MappedMessage[]>([])
    const typingUsers = ref<{[key: string]: string}>({});

    // Initialize Socket and listeners on mount
    onMounted(() => {
        try {
            // Initialize socket connection
            initializeSocket();
            
            // Setup message and other event listeners
            setupMessageListenerIo();
            
            // Listen for new messages
            emitter.on('new-message', (message: Message) => {
                if (currentChat.value && message.conversationId === currentChat.value.id) {
                    messages.value.push(message);

                    mappedMessages.value.push({
                        id: message.id,
                        text: message.content,
                        author: message.user?.name,
                        avatar: message.user?.avatar,
                        time: formatMessageTime(message.createdAt),
                        sender: localStorage.getItem('userId') === message.userId ? 'me' : 'them'
                    });
                }
            });

            emitter.on('conversation-updated', (data) => {
                // console.log('Received conversation-updated event with data:', data);
                
                let updatedConversation = data;

                // console.log("cek",updatedConversation)
                if (!updatedConversation || !updatedConversation.id) {
                  return;
                }
                
                if (!updatedConversation.lastMessage && updatedConversation.messages && updatedConversation.messages.length > 0) {
                  updatedConversation.lastMessage = updatedConversation.messages[0];
                }
                
                const index = conversations.value.findIndex(c => c.id === updatedConversation.id);
                
                if (index !== -1) {
                  const existingConv = conversations.value[index];
                  
                  updatedConversation = {
                    ...updatedConversation,
                    name: existingConv.name || updatedConversation.name,
                    image: existingConv.image || updatedConversation.image
                  };
                  
                  conversations.value[index] = updatedConversation;
                } else {
                  conversations.value.push(updatedConversation);
                }
                
                conversations.value.sort((a, b) => {
                  const dateA = a.lastMessage?.createdAt ? new Date(a.lastMessage.createdAt) : new Date(0);
                  const dateB = b.lastMessage?.createdAt ? new Date(b.lastMessage.createdAt) : new Date(0);
                  return dateB.getTime() - dateA.getTime();
                });
              });
            
            // Listen for typing status
            emitter.on('user-typing', (data) => {
                if (currentChat.value && data.conversationId === currentChat.value.id) {
                    typingUsers.value[data.userId] = data.userId;
                }
            });
            
            emitter.on('user-stopped-typing', (data) => {
                if (currentChat.value && data.conversationId === currentChat.value.id) {
                    delete typingUsers.value[data.userId];
                }
            });
            
            // Listen for participant updates
            emitter.on('participants-updated', (data) => {
                if (currentChat.value && currentChat.value.id === data.conversationId) {
                    if (currentChat.value) {
                        currentChat.value.participants = data.participants;
                    }
                }
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to initialize chat');
        }
    });
    
    // Clean up event listeners
    onBeforeUnmount(() => {
        // emitter.all.clear();
    });

    // Fungsi untuk memulai chat 1-on-1
    const startChats = async (userId: string): Promise<Conversation | null> => {
        startLoading();
        clearError();
      try {
        
        const newConversation = await startChat({receiverId: userId});
        conversation.value = newConversation;

        stopLoading();
        return newConversation;
      } catch (err) {
        stopLoading();
        throw err
      }
    };

    // Get all user chats using Socket.IO with REST fallback
    const allUserChats = async(): Promise<ChatResult> => {
        clearError();
        try {
            try {
                const socketConversations = await getConversationsIo();
                conversations.value = socketConversations || [];
            } catch (socketError) {
                startLoading();
                // console.warn('Fallback to REST for conversations:', socketError);
                const restConversations = await getAllUserChat();
                conversations.value = restConversations || [];
            }
            
            if (conversations.value.length > 0 && !currentChat.value) {
                currentChat.value = conversations.value[0];
            }
            
            stopLoading();
            return {
                conversations: conversations.value,
                currentChat: currentChat.value
            };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to get all chats. Please try again.');
            return {
                conversations: [],
                currentChat: null
            };
        }
    };

    const createGroup = async(formData: ConversationForm): Promise<Conversation | null> => {
        if (!formData.name.trim()) {
            setError('Group name required !')
        }
        startLoading()
        clearError()
        try {
            const newGroup = await startGroup(formData)
            conversations.value = [newGroup, ...conversations.value];

            currentChat.value = newGroup;
    
            messages.value = [];
            
            return currentChat.value
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to start group. Please try again.');
            return null
        }
    }

    // Load messages using Socket.IO with REST fallback
    const loadMessages = async (): Promise<MessageResult> => {
        if (!currentChat.value || !currentChat.value.id) {
            return {
                messages: [], 
                mappedMessages: []
            };
        }
        clearError();
        try {
            try {
                const socketMessages = await getMsgIo(currentChat.value.id);
                messages.value = socketMessages || [];
            } catch (socketError) {
                // console.warn('Fallback to REST for messages:', socketError);
                startLoading();
                const restMessages = await getAllChatMsg(currentChat.value.id);
                messages.value = restMessages || [];
            }

            mappedMessages.value = messages.value.map(msg => ({
                id: msg.id,
                text: msg.content,
                author: msg.user?.name,
                avatar: msg.user?.avatar,
                time: formatMessageTime(msg.createdAt),
                sender: localStorage.getItem('userId') === msg.userId ? 'me' : 'them'
            }));
            
            stopLoading();
            
            return {
                messages: messages.value,
                mappedMessages: mappedMessages.value
            };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to get all chat messages. Please try again.');
            return {
                messages: [],
                mappedMessages: []
            };
        }
    };

    // Send message using Socket.IO with REST fallback
    const sendMessage = async (content: string): Promise<Message | Message[] | null> => {
        if (!currentChat.value || !currentChat.value.id) {
            return null;
        } else if (!content.trim()) {
            setError('Please send a message text !');
            return null;
        }
        
        // startLoading();
        clearError();
        try {
            try {
                const sentMessage = await sendMsgIo(currentChat.value.id, content);
                // stopLoading();
                return sentMessage;
            } catch (socketError) {
                // console.warn('Fallback to REST for sending message:', socketError);        
                startLoading();
                const newMessages = await sendMsg(currentChat.value.id, {content});
                stopLoading();
                return newMessages;
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send message');
            return null;
        }
    };

    // Send typing status via Socket.IO
    const setTypingStatus = (isTyping: boolean) => {
        if (currentChat.value && currentChat.value.id) {
            sendTypingStatusIo(currentChat.value.id, isTyping);
        }
    };

    // Leave group using Socket.IO with REST fallback
    const leaveGroup = async (conversationId: string): Promise<GeneralResponse | boolean | null> => {
        startLoading();
        clearError();
        try {
            try {
                const success = await leaveGroupIo(conversationId);
                stopLoading();
                return success ? {
                    error: false,
                    message: "Successfully left the group"
                } : null;
            } catch (socketError) {
                // console.warn('Fallback to REST for leaving group:', socketError);
                const leaveResponse = await leaveTheGroup(conversationId);
                stopLoading();
                return leaveResponse;
            }
        } catch (err) {
            stopLoading()
            throw err
        }
    };

    const deleteGroup = async (conversationId: string): Promise<GeneralResponse | null> => {
        startLoading()
        clearError()
        try {
            const deleteResponse = await deleteTheGroup(conversationId)
            stopLoading()
            return deleteResponse
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete group');
            return null
        }
    }

    // Kick user from group using Socket.IO with REST fallback
    const kickUser = async (conversationId: string, participantId: string): Promise<GeneralResponse | boolean | null> => {
        startLoading();
        clearError();
        try {
            try {
                const success = await removeParticipantIo(conversationId, participantId);
                stopLoading();
                return success ? {
                    error: false,
                    message: "Successfully removed user from the group"
                } : null;
            } catch (socketError) {
                // console.warn('Fallback to REST for kicking user:', socketError);
                const kickResponse = await removeUserFromGroup(conversationId, participantId);
                stopLoading();
                return kickResponse;
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to kick user from group');
            return null;
        }
    };

    // Add member to group using Socket.IO with REST fallback
    const addMemberToGroup = async (conversationId: string, userId: string): Promise<Participant | Participant[]> => {
        if (!userId.trim()) {
            setError('Please enter a user ID');
            return [];
        }
        startLoading();
        clearError();
        try {
            try {
                const participant = await addParticipantIo(conversationId, userId);
                stopLoading();
                return participant;
            } catch (socketError) {
                // console.warn('Fallback to REST for adding member:', socketError);
                const addMemberResponse = await addUserIntoGroup(conversationId, { userId });
                stopLoading();
                return addMemberResponse;
            }
        } catch (err) {
            stopLoading();
            throw err
        }
    };

    const updateUserGroup = async (conversationId: string, formData: ConversationForm): Promise<Conversation | null> => {
        if (!formData.name.trim()) {
            setError('Group name required !')
        }
        startLoading()
        clearError()
        try {
            const updateGroupResponse = await updateGroupInfo(conversationId, formData)
            stopLoading()
            return updateGroupResponse
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update group info');
            return null
        }
    }

    const updateUserRole = async (conversationId: string, participantId: string, userRole: string): Promise<Participant[]> => {
        startLoading()
        clearError()
        try {
            const updateRoleResponse = await updateRole(conversationId, participantId, {role: userRole})
            stopLoading()
            return updateRoleResponse
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update group info');
            return []
        }
    }

    return {
        conversation,
        conversations,
        currentChat,
        messages,
        mappedMessages,
        isLoading,
        error,
        typingUsers,
        clearError,
        startChats,
        createGroup,
        allUserChats,
        loadMessages,
        sendMessage,
        leaveGroup,
        deleteGroup,
        kickUser,
        addMemberToGroup,
        updateUserGroup,
        updateUserRole,
        setTypingStatus
    };
}