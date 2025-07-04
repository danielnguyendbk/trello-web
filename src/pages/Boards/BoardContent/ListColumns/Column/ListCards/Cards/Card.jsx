
import Typography from '@mui/material/Typography'
import * as React from 'react';
import Button from '@mui/material/Button';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import GroupIcon from '@mui/icons-material/Group';
import CommentIcon from '@mui/icons-material/Comment';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import MuiCard from '@mui/material/Card'; // ✅ Đổi tên MUI Card

function Card({ card }) {
    const shouldShowCardActions= () => {
        return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
    }
    return (
        <MuiCard sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)' }}>
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
  