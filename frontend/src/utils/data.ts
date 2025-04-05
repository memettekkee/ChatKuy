export const features = [
    {
      icon: 'bx bx-group',
      title: 'Friend Finder',
      description:
        'Easily find and connect with friends using our intuitive search and suggestion system.',
    },
    {
      icon: 'bx bx-palette',
      title: 'Aesthetic UI',
      description:
        'Enjoy a beautiful, customizable interface designed for the best user experience.',
    },
    {
      icon: 'bx bx-chat',
      title: 'Group Chats',
      description:
        'Create and join group conversations to stay connected with multiple friends at once.',
    },
    {
      icon: 'bx bx-happy-heart-eyes',
      title: 'Fun Interactions',
      description:
        'Express yourself with stickers, reactions, and interactive message effects that make chatting more fun.',
    },
  ]

export const communities = [
    {
      name: "Photography Enthusiasts",
      members: 12500,
      image: "https://images.unsplash.com/photo-1618477462146-050d2767eac4?q=80&w=300&auto=format&fit=crop"
    },
    {
      name: "Music Lovers",
      members: 8750,
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=300&auto=format&fit=crop"
    },
    {
      name: "Gaming Squad",
      members: 15200,
      image: "https://images.unsplash.com/photo-1498855926480-d98e83099315?q=80&w=300&auto=format&fit=crop"
    },
    {
      name: "Travel Buddies",
      members: 6300,
      image: "https://images.unsplash.com/photo-1498855926480-d98e83099315?q=80&w=300&auto=format&fit=crop"
    }
  ];

export const steps = [
    {
      number: '01',
      title: 'Create Your Account',
      description:
        'Sign up with your email in just seconds and personalize your profile with a fun avatar.',
    },
    {
      number: '02',
      title: 'Find Friends',
      description:
        'Connect with friends or discover new people who share your interests and hobbies.',
    },
    {
      number: '03',
      title: 'Create Groups',
      description:
        'Start group chats for your social circles, interests, or events to stay connected.',
    },
    {
      number: '04',
      title: 'Share Moments',
      description:
        'Exchange messages, photos, and reactions to create lasting memories with people you care about.',
    },
  ]

export const chatData = [
    {
      id: 1,
      name: 'Beach Cleanup Squad 🌊',
      avatar: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      online: true,
      lastSeen: '5 online',
      isGroup: true,
      members: ['Sarah', 'Alex', 'Jessica', '+3 more'],
      lastMessage: 'Bringing extra bags and gloves for everyone! 🧤',
      time: '10:12 AM',
      unread: 2,
      messages: [
        {
          id: 1,
          text: "Who's joining the beach cleanup this weekend? 🏖️",
          sender: 'them',
          author: 'Sarah',
          time: '10:03 AM',
        },
        {
          id: 2,
          text: "Count me in! I'll bring some snacks 🍪",
          sender: 'me',
          time: '10:05 AM',
        },
        {
          id: 3,
          text: 'Perfect weather for it! I can help with transportation 🚗',
          sender: 'them',
          author: 'Alex',
          time: '10:06 AM',
        },
        {
          id: 4,
          text: "Awesome! Let's meet at the usual spot?",
          sender: 'me',
          time: '10:10 AM',
        },
        {
          id: 5,
          text: 'Bringing extra bags and gloves for everyone! 🧤',
          sender: 'them',
          author: 'Jessica',
          time: '10:12 AM',
        }
      ]
    },
    {
      id: 2,
      name: 'Eco Warriors 🌱',
      avatar: 'https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      online: true,
      lastSeen: '8 online',
      isGroup: true,
      members: 12,
      lastMessage: 'Next tree planting session this Sunday!',
      time: '9:45 AM',
      unread: 3,
      messages: [
        {
          id: 1,
          text: "Hey team! The next tree planting is confirmed for Sunday",
          sender: 'them',
          author: 'Maya',
          time: '9:30 AM',
        },
        {
          id: 2,
          text: "Great! What time do we start?",
          sender: 'me',
          time: '9:32 AM',
        },
        {
          id: 3,
          text: '8:00 AM at the usual spot in the park',
          sender: 'them',
          author: 'Maya',
          time: '9:34 AM',
        },
        {
          id: 4,
          text: "I'll bring extra saplings this time",
          sender: 'them',
          author: 'Raj',
          time: '9:40 AM',
        },
        {
          id: 5,
          text: 'Next tree planting session this Sunday!',
          sender: 'them',
          author: 'Maya',
          time: '9:45 AM',
        }
      ]
    },
    {
      id: 3,
      name: 'Sarah',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      online: true,
      lastSeen: 'Online',
      isGroup: false,
      lastMessage: 'See you at the event! 🎉',
      time: 'Yesterday',
      unread: 0,
      messages: [
        {
          id: 1,
          text: "Hey, are you coming to the event tomorrow?",
          sender: 'them',
          time: 'Yesterday, 4:30 PM',
        },
        {
          id: 2,
          text: "Yes! I've already prepared everything",
          sender: 'me',
          time: 'Yesterday, 4:35 PM',
        },
        {
          id: 3,
          text: "That's great! I'm really excited",
          sender: 'them',
          time: 'Yesterday, 4:40 PM',
        },
        {
          id: 4,
          text: "Me too! It's going to be amazing",
          sender: 'me',
          time: 'Yesterday, 4:45 PM',
        },
        {
          id: 5,
          text: "See you at the event! 🎉",
          sender: 'them',
          time: 'Yesterday, 5:00 PM',
        }
      ]
    },
    {
      id: 4,
      name: 'Ocean Friends 🐋',
      avatar: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      online: false,
      lastSeen: '3 hours ago',
      isGroup: true,
      members: 8,
      lastMessage: "Great job everyone at today's cleanup!",
      time: 'Yesterday',
      unread: 5,
      messages: [
        {
          id: 1,
          text: "We collected over 50kg of plastic today!",
          sender: 'them',
          author: 'Miguel',
          time: 'Yesterday, 2:00 PM',
        },
        {
          id: 2,
          text: "That's incredible! New record?",
          sender: 'me',
          time: 'Yesterday, 2:05 PM',
        },
        {
          id: 3,
          text: "Yes, it's our best result so far this year",
          sender: 'them',
          author: 'Miguel',
          time: 'Yesterday, 2:10 PM',
        },
        {
          id: 4,
          text: "We should celebrate this achievement",
          sender: 'them',
          author: 'Emma',
          time: 'Yesterday, 2:30 PM',
        },
        {
          id: 5,
          text: "Great job everyone at today's cleanup!",
          sender: 'them',
          author: 'Miguel',
          time: 'Yesterday, 3:00 PM',
        }
      ]
    }
  ]