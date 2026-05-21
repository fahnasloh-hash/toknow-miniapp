export type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
};

export type AuthSession = {
  user: TelegramUser;
  /** Raw initData string — pass it to your backend for HMAC verification */
  initData: string;
  /** Optional backend-issued JWT, populated after server validation */
  token: string | null;
  /** ISO timestamp when the session was created */
  issuedAt: string;
};
