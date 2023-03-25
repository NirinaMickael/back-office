import { ChatFaqEntry } from "./chat-faq.schema";

export interface User {
  userID: string;
  messages: Message[];
  hasNewMessage: boolean;
  username: string;
  self: boolean;
  connected: boolean;
  chatAccepted: boolean;
  chatAcceptedBy: string;
  faqHistorical?: ChatFaqEntry []
}

export interface Message {
  content: string;
  fromSelf: boolean;
  upperDate?: string;
  createdAt?: Date;
  adminName?: string;
  files?: string[];
}
