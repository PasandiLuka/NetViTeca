export interface BookCardProps {
    image: string
    title: string
    author: string
    description: string
    audio?: boolean;
    onClick?: () => void
    onAdd?: () => void
}