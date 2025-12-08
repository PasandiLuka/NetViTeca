import type { User } from "../utils/Auth";

export interface ProfileFormProps {
    user: User;
    onCancel: () => void;
    onSave: (updatedUser: User) => void;
}
