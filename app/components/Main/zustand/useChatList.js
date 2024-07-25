import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { fetcher } from "../../../hooks/useFetch";

const chatStore = (set, get) => ({
  chatList: [],
  currentChatId: null,
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
