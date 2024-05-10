export interface Toast {
  id?: number;
  type: 'info' | 'success' | 'error';
  dismissible?: boolean;
  timeout?: number;
  message?: string;
}

export type ScreenMode = 'desktop' | 'mobile';
