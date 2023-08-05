import { Decoded } from ".";

export interface SidebarProps {
  topics: string[];
  user: Decoded | undefined;
}
