// type for media format
export type Format = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | undefined;
  width: number;
  height: number;
  size: number;
  url: string;
};

// type for media object
export type SingleMedia = {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    thumbnail: Format;
    medium: Format;
    small: Format;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | undefined;
  provider: string;
  provider_metadata: string | undefined;
  createdAt: string;
  updatedAt: string;
};

// profile data type
export type Profile = {
  id?: number;
  username?: string;
  email?: string | undefined;
  provider?: string | undefined;
  confirmed?: boolean;
  blocked?: boolean;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  twitterUsername?: string | undefined;
  websiteUrl?: string | undefined;
  title?: string;
  bio?: string | undefined;
  color?: string | undefined;
  profilePic?: SingleMedia | undefined;
  slug?: string;
  error?: any;
  user_codes?: [UserCode]
  jwt?: string | undefined;
};

export type Score = {
  id: number;
  attributes: {
    amount: number;
    createdAt: string;
    user: {
      data: {
        id: number,
        attributes: {
          email:  string;
          username: string;
        }
      }
    }
  }
}

export type Engine = {
  id: number;
  attributes: {
    name: string;
    tags: string;
    description: string;
  }
}

// user-code data type
export type UserCode = {
  description?: string;
  name: string;
  executedAt: string;
  status: string;
  error: string;
  scores: Array<{
    amount: number;
    steps: any[];
    engine: {
      name: string;
      id: number;
      tag: string;
    }
  }>
  file: {
    id: number;
    name: string;
    ext: string;
    mime: string;
    size: number;
    url: string
    createdAt: string
    updatedAt: string
  }
};

// profile form data type
export type ProfileData = {
  slug?: string | null;
  id?: string | File | null;
  username?: string | File | null;
  nickname?: string | File | null;
  twitterUsername?: string | File | null;
  bio?: string | File | null;
  title?: string | File | null;
  websiteUrl?: string | File | null;
  // email: string | File | null
  // password: string | File | null
};

export type UploadUserCodeFormProps = {
  userCode: UploadUserCodeForm;
  onModifyData?: Function | undefined;
  action: string;
  errors?: any;
}

export type UploadUserCodeForm = {
  name: string;
  description?: string;
  file: File;
}

// type for profile form props
export type ProfileFormProps = {
  profile?: Profile | undefined;
  onModifyData?: Function | undefined;
  action: string;
  errors?: any;
};

// action data type
export type LoginActionData =
  | {
      email?: string | File | null;
      identifier?: string | File | null;
      password: string | File | null;
    }
  | undefined;

export type RegisterActionData = LoginActionData & ProfileData;

export type ErrorResponse = {
  data?: object;
  error?: {
    status: number;
    name: string;
    message: string;
    details: object;
  };
};

export type LoginResponse = ErrorResponse & {
  jwt?: string;
  user?: Profile;
};

export type LoginErrorResponse =
  | {
      identifier?: string;
      password?: string;
      ValidationError?: string;
    }
  | unknown;
