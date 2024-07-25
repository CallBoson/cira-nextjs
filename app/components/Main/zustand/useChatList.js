import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { fetcher } from "../../../hooks/useFetch";

const chatStore = (set, get) => ({
  chatList: [
    // example
    {
      id: "example",
      presetList: [
        {
          id: 1721896195200,
          roleName: "我",
          content: "Hi",
          isSelf: true,
        },
        {
          id: 1721896201966,
          roleName: "我",
          content: "Can you please arrange the payment of gloves this week?",
          isSelf: true,
        },
        {
          id: 1721896214632,
          roleName: "客人",
          content: "hi Ganten",
          isSelf: false,
        },
        {
          id: 1721896225274,
          roleName: "客人",
          content: "thanks for your confirmation, and sorry for payment delay",
          isSelf: false,
        },
      ],
      contentList: [
        {
          id: 1721896294177,
          content: "接下来我应该如何回复以表达理解？",
          isSelf: true,
        },
        {
          id: 1721896307758,
          content:
            '在这种情况下，你可以用一种友好和理解的方式回复，同时也可以表达出你愿意协助处理付款事宜。以下是一些可能的回复方式：\n\n1. **表达理解并提供帮助：**\n   - "Hi there! No worries at all about the payment delay. We understand that sometimes things can get a bit delayed. How can I assist you in arranging the payment for the gloves this week?"\n\n2. **确认并询问进一步细节：**\n   - "Hello! Thank you for your confirmation. I appreciate your heads-up about the payment delay. Could you please let me know the expected date for the payment so I can update our records accordingly?"\n\n3. **提供灵活性并询问是否需要其他帮助：**\n   - "Hi! It\'s all good, we\'re flexible with our payment terms. Just let us know when you\'re ready to proceed with the payment for the gloves. Is there anything else you need assistance with in the meantime?"\n\n4. **保持专业并提供后续步骤：**\n   - "Greetings! Your confirmation is noted, and we appreciate your communication regarding the payment. To ensure a smooth process, could you please provide us with the payment details or let us know if you need any further assistance with the transaction?"\n\n通过这样的回复，你不仅表现出了对客户情况的理解，还提供了进一步沟通和解决问题的机会。',
          isSelf: false,
        },
      ],
    },
  ],
  currentChatId: "example",
  isLoading: false,

  setCurrentChatById: ({ chatId } = {}) => set({ currentChatId: chatId }),

  addChat: () => {
    const newChat = { id: Date.now(), contentList: [] };
    set((state) => ({ chatList: [...state.chatList, newChat] }));
    return newChat.id;
  },

  removeChat: ({ chatId } = {}) =>
    set((state) => ({
      chatList: state.chatList.filter((chat) => chat.id !== chatId),
    })),

  getChatContentList: ({ chatId } = {}) => {
    const cId = chatId || get().currentChatId;
    return get().chatList.find((chat) => chat.id === cId)?.contentList || [];
  },

  addChatContent: ({ chatId, content, isSelf = true } = {}) => {
    const cId = chatId || get().currentChatId;
    set((state) => ({
      chatList: state.chatList.map((chat) =>
        chat.id === cId
          ? {
              ...chat,
              contentList: [
                ...(chat?.contentList || []),
                { id: Date.now(), content, isSelf },
              ],
            }
          : chat
      ),
    }));
  },

  removeChatContent: ({ chatId, contentId } = {}) => {
    const cId = chatId || get().currentChatId;
    set((state) => ({
      chatList: state.chatList.map((chat) =>
        chat.id === cId
          ? {
              ...chat,
              contentList: chat.contentList.filter(
                (content) => content.id !== contentId
              ),
            }
          : chat
      ),
    }));
  },

  getChatPresetList: ({ chatId } = {}) => {
    const cId = chatId || get().currentChatId;
    return get().chatList.find((chat) => chat.id === cId)?.presetList || [];
  },

  addChatPreset: ({ chatId, roleName, content, isSelf = true } = {}) => {
    const cId = chatId || get().currentChatId;
    set((state) => ({
      chatList: state.chatList.map((chat) =>
        chat.id === cId
          ? {
              ...chat,
              presetList: [
                ...(chat?.presetList || []),
                { id: Date.now(), roleName, content, isSelf },
              ],
            }
          : chat
      ),
    }));
  },

  removeChatPreset: ({ chatId, contentId } = {}) => {
    const cId = chatId || get().currentChatId;
    set((state) => ({
      chatList: state.chatList.map((chat) =>
        chat.id === cId
          ? {
              ...chat,
              presetList: chat.presetList.filter(
                (content) => content.id !== contentId
              ),
            }
          : chat
      ),
    }));
  },

  handleGenerate: async (prompt) => {
    const {
      isLoading,
      currentChatId,
      addChat,
      setCurrentChatById,
      addChatContent,
      getChatPresetList,
      getChatContentList,
    } = get();

    if (!prompt || isLoading) return;

    if (!currentChatId) {
      const newChatId = addChat();
      setCurrentChatById({ chatId: newChatId });
    }

    addChatContent({
      content: prompt,
      isSelf: true,
    });

    set({ isLoading: true });

    const { content } = await fetcher({
      url: "/api/generate",
      body: {
        presetList: getChatPresetList(),
        contentList: getChatContentList(),
      },
    })
      .then((res) => res.json())
      .finally(() => set({ isLoading: false }));

    addChatContent({
      content,
      isSelf: false,
    });
  },
});

const useChatListStore = create(
  persist(chatStore, {
    name: "chatList",
    storage: createJSONStorage(() => localStorage),
  })
);

export default useChatListStore;
