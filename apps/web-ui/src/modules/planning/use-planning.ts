import { toast } from "@paul/ui";
import { useCallback, useEffect, useState } from "react";
import {
  planningApiService,
  PlanningConversation,
  PlanningMessage,
} from "./planning-api.service";

export function usePlanning() {
  const [conversations, setConversations] = useState<PlanningConversation[]>(
    [],
  );
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);
  const [messages, setMessages] = useState<PlanningMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const fetchConversations = useCallback(async () => {
    try {
      const list = await planningApiService.listConversations();
      setConversations(list);
      if (list.length > 0 && !currentConversationId) {
        const first = list[0];
        if (first) {
          setCurrentConversationId(first.id);
        }
      }
    } catch (error) {
      console.error("Failed to fetch planning conversations", error);
    } finally {
      setIsInitialLoading(false);
    }
  }, [currentConversationId]);

  const fetchMessages = useCallback(async () => {
    if (!currentConversationId) {
      setMessages([]);
      return;
    }
    try {
      const history = await planningApiService.getMessages(
        currentConversationId,
      );
      setMessages(history);
    } catch (error) {
      console.error("Failed to fetch planning messages", error);
    }
  }, [currentConversationId]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const createNewConversation = useCallback(async (title?: string) => {
    try {
      const newConv = await planningApiService.createConversation(title);
      setConversations((prev) => [newConv, ...prev]);
      setCurrentConversationId(newConv.id);
      setMessages([]);
      return newConv;
    } catch (error) {
      toast.error("Failed to create new planning session");
      console.error(error);
    }
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      let targetConvId = currentConversationId;

      if (!targetConvId) {
        const newConv = await createNewConversation();
        if (!newConv) return;
        targetConvId = newConv.id;
      }

      const userMessage: PlanningMessage = { role: "user", content };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const response = await planningApiService.chat(targetConvId, content);
        const aiMessage: PlanningMessage = { role: "model", content: response };
        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        toast.error("Failed to send message to AI");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, currentConversationId, createNewConversation],
  );

  const deleteConversation = useCallback(
    async (id: string) => {
      try {
        await planningApiService.deleteConversation(id);
        setConversations((prev) => prev.filter((c) => c.id !== id));
        if (currentConversationId === id) {
          setCurrentConversationId(null);
          setMessages([]);
        }
        toast.success("Planning session deleted");
      } catch (error) {
        toast.error("Failed to delete planning session");
        console.error(error);
      }
    },
    [currentConversationId],
  );

  return {
    conversations,
    currentConversationId,
    setCurrentConversationId,
    messages,
    isLoading,
    isInitialLoading,
    sendMessage,
    createNewConversation,
    deleteConversation,
    refreshConversations: fetchConversations,
  };
}
