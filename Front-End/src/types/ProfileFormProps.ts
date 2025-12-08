import type { User } from "../types/UserModel";

export interface ProfileFormProps {
    user: User;
    onCancel: () => void;
    onSave: (updatedUser: User) => void;
}
