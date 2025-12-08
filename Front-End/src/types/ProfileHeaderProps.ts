import type { User } from "../utils/Auth";

export interface ProfileHeaderProps {
    user: User;
    onEdit: () => void;
    isEditing: boolean;
}
