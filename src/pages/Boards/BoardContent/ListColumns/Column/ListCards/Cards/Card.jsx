import Typography from '@mui/material/Typography'
import * as React from 'react';
import Button from '@mui/material/Button';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import MuiCard from '@mui/material/Card';
import { CardMedia, CardContent, CardActions } from '@mui/material';

// ✅ Thêm các icon đúng cách
import GroupIcon from '@mui/icons-material/Group';
import CommentIcon from '@mui/icons-material/Comment';
import AttachFileIcon from '@mui/icons-material/AttachFile';

function Card({ card }) {
    const shouldShowCardActions= () => {
        return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
    }
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,

    } = useSortable({
        id: card._id,
        data: { ...card }
    });

    const dndKitCardstyles = {
        transform: CSS.Translate.toString(transform),
        transition,
        height: '100%',
        opacity: isDragging ? 0.5 : undefined,
        
    };
    return (

        <MuiCard
            ref={setNodeRef}
            style={dndKitCardstyles}
            {...attributes}
            {...listeners}
            sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)' ,
                display: card?.FE_PlaceholderCard ? 'none' : 'block'
            }}
            
            >
            {card?.cover && (
                <CardMedia
                    sx={{ height: 140 }}
                    image={card?.cover}
                    title="Cover"
                />
            )}

            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>{card?.title || 'Untitled'}</Typography>
            </CardContent>
            {shouldShowCardActions() &&
                <CardActions sx={{ p: '0 4px 8px 4px' }}>
                    {!!card?.memberIds?.length &&
                        <Button size="small" startIcon={<GroupIcon />}>{card?.memberIds?.length}</Button>
                    }
                    {!!card?.comments?.length &&
                        <Button size="small" startIcon={<CommentIcon />}>{card?.comments?.length}</Button>
                    }
                    {!!card?.attachments?.length &&
                        <Button size="small" startIcon={<AttachFileIcon />}>{card?.attachments?.length}</Button>
                    }
                </CardActions>}

        </MuiCard>

    );
}

export default Card;
  