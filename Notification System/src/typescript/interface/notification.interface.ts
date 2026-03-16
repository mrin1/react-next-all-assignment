import { type AlertColor, type SvgIconProps } from "@mui/material";

interface Toast {
  id: string;
  message: string;
  severity: "success" | "error" | "warning" | "info";
}

export interface ToastState {
  queue: Toast[];
}

export interface Notification {
  id: string;
  message: string;
  severity: AlertColor;
  duration?: number;
  item: any;
}

export interface NotificationPayload {
  message: string;
  severity: AlertColor;
  duration?: number;
}

export interface ActionCardProps {
  title: string;
  desc: string;
  color: string;
  icon: React.ElementType<SvgIconProps>;
  onClick: () => void;
}
export interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  queue: any[];
}
