type User = {
  aud: string;
  auth_time: number;
  email?: string;
  email_verified?: boolean;
  exp: number;
  firebase: {
    identities: {
      email: string[];
    };
    sign_in_provider: string;
  };
  iat: number;
  iss: string;
  name?: string;
  picture?: string;
  sub: string;
  user_id: string;
};

type aiPromptItem = {
  title: string;
  command: string;
  id: string;
  type: "modify" | "prompt";
};

type NoteItem = {
  title: string;
  body: string;
  color: string;
  createdAt: string;
  updatedAt: string;
};

export type { User, aiPromptItem, NoteItem };
