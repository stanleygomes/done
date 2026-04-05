import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@modules/auth/use-auth";
import {
  planningApiService,
  PlanningMessage,
  PlanningConversation,
} from "./planning-api.service";
import { toast } from "@paul/ui";

export function usePlanning() {
  const { token } = useAuth();
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
    if (!token) return;
    try {
      const list = await planningApiService.listConversations(token);
      setConversations(list);
      // Auto-select latest conversation if none selected
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
  }, [token, currentConversationId]);

  const fetchMessages = useCallback(async () => {
    if (!token || !currentConversationId) {
      setMessages([]);
      return;
    }
    try {
      const history = await planningApiService.getMessages(
        token,
        currentConversationId,
      );
      setMessages(history);
    } catch (error) {
      console.error("Failed to fetch planning messages", error);
    }
  }, [token, currentConversationId]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  async function createNewConversation(title?: string) {
    if (!token) return;
    try {
      const newConv = await planningApiService.createConversation(token, title);
      setConversations((prev) => [newConv, ...prev]);
      setCurrentConversationId(newConv.id);
      setMessages([]);
      return newConv;
    } catch (error) {
      toast.error("Failed to create new planning session");
      console.error(error);
    }
  }

  async function sendMessage(content: string) {
    if (!token || !content.trim() || isLoading) return;

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
      const response = await planningApiService.chat(
        token,
        targetConvId,
        content,
      );
      const aiMessage: PlanningMessage = { role: "model", content: response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      toast.error("Failed to send message to AI");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteConversation(id: string) {
    if (!token) return;
    try {
      await planningApiService.deleteConversation(token, id);
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
  }

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
