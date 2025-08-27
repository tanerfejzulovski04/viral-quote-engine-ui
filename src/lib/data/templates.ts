import { Template } from "@/types/template";

export const mockTemplates: Template[] = [
  {
    id: "1",
    name: "Motivational Quote",
    scope: "global",
    config: {
      style: {
        backgroundColor: "#1e3a8a",
        textColor: "#ffffff",
        fontSize: "24px",
        fontFamily: "Arial"
      },
      layout: "centered",
      animation: "fade-in"
    },
    updatedAt: "2024-01-15T10:30:00Z",
    createdAt: "2024-01-10T08:00:00Z",
  },
  {
    id: "2",
    name: "Success Mindset",
    scope: "global",
    config: {
      style: {
        backgroundColor: "#065f46",
        textColor: "#ecfccb",
        fontSize: "28px",
        fontFamily: "Georgia"
      },
      layout: "left-aligned",
      animation: "slide-up"
    },
    updatedAt: "2024-01-12T14:20:00Z",
    createdAt: "2024-01-08T12:15:00Z",
  },
  {
    id: "3",
    name: "My Custom Style",
    scope: "user",
    config: {
      style: {
        backgroundColor: "#7c3aed",
        textColor: "#fbbf24",
        fontSize: "22px",
        fontFamily: "Helvetica"
      },
      layout: "centered",
      animation: "bounce"
    },
    updatedAt: "2024-01-14T16:45:00Z",
    createdAt: "2024-01-14T16:00:00Z",
  },
  {
    id: "4",
    name: "Daily Inspiration",
    scope: "user",
    config: {
      style: {
        backgroundColor: "#dc2626",
        textColor: "#ffffff",
        fontSize: "26px",
        fontFamily: "Times New Roman"
      },
      layout: "right-aligned",
      animation: "zoom-in"
    },
    updatedAt: "2024-01-13T09:15:00Z",
    createdAt: "2024-01-11T20:30:00Z",
  },
  {
    id: "5",
    name: "Wisdom Words",
    scope: "global",
    config: {
      style: {
        backgroundColor: "#0f766e",
        textColor: "#a7f3d0",
        fontSize: "30px",
        fontFamily: "Verdana"
      },
      layout: "centered",
      animation: "fade-in"
    },
    updatedAt: "2024-01-16T11:00:00Z",
    createdAt: "2024-01-05T14:45:00Z",
  },
];

// Simple in-memory store for user templates
export class TemplateStore {
  private templates: Template[] = [...mockTemplates];
  private nextId = 6;

  getAllTemplates(): Template[] {
    return [...this.templates];
  }

  getTemplatesByScope(scope: "all" | "global" | "user"): Template[] {
    if (scope === "all") return this.getAllTemplates();
    return this.templates.filter(t => t.scope === scope);
  }

  createTemplate(data: { name: string; config: object }): Template {
    const template: Template = {
      id: this.nextId.toString(),
      name: data.name,
      scope: "user",
      config: data.config,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    this.templates.push(template);
    this.nextId++;
    return template;
  }

  updateTemplate(id: string, data: { name: string; config: object }): Template | null {
    const index = this.templates.findIndex(t => t.id === id);
    if (index === -1 || this.templates[index].scope !== "user") return null;
    
    this.templates[index] = {
      ...this.templates[index],
      name: data.name,
      config: data.config,
      updatedAt: new Date().toISOString(),
    };
    return this.templates[index];
  }

  deleteTemplate(id: string): boolean {
    const index = this.templates.findIndex(t => t.id === id);
    if (index === -1 || this.templates[index].scope !== "user") return false;
    
    this.templates.splice(index, 1);
    return true;
  }
}

export const templateStore = new TemplateStore();