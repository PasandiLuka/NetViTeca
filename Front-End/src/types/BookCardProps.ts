export interface BookCardProps {
    id: number;
    image: string;
    title: string;
    author: string;
    editorial?: string;
    description: string;
    onAdd?: () => void;
    onDelete?: () => void;
    onClick?: () => void;
    url?: string;
}