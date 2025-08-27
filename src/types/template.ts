export interface Template {
  id: string;
  name: string;
  scope: "global" | "user";
  config: object;
  updatedAt: string;
  createdAt: string;
}

export interface CreateTemplateData {
  name: string;
  config: object;
}

export interface UpdateTemplateData extends CreateTemplateData {
  id: string;
}