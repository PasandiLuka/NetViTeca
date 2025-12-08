import type { User } from "../types/UserModel";

export interface ProfileHeaderProps {
    user: User;
    onEdit: () => void;
    isEditing: boolean;
}
