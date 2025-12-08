export interface BookCardProps {
    id: number
    image: string
    title: string
    author: string
    description: string

    onClick?: () => void
    onAdd?: () => void
    onDelete?: () => void
    url?: string
}