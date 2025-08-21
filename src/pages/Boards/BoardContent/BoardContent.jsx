import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns';
import * as React from 'react';
import { mapOrder } from '~/utils/sort';
import generatePlaceholderCard from '~/utils/generatePlaceholderCard';
import {
    PointerSensor,
    DndContext,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects ,
    closestCorners,
    pointerWithin, 
    // rectIntersection, 
    getFirstCollision,
    closestCenter,
 } from '@dnd-kit/core'
import {
    arrayMove,
} from '@dnd-kit/sortable'

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Cards/Card';
import { cloneDeep, isEmpty } from 'lodash';

const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
    
    const pointerSensor = useSensor(PointerSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
            distance: 10,
        },
    })
    const mouseSensor = useSensor(MouseSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
            distance: 10,
        },
    })
    const touchSensor = useSensor(TouchSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        },
    })
    const sensors = useSensors(mouseSensor, touchSensor)

    const [orderedColumnsState,setOrderedColumnsState] = React.useState([])
    const [activeDragItemId, setActiveDragItemId] = React.useState(null)
    const [activeDragItemType, setActiveDragItemType] = React.useState(null)
    const [activeDragItemData, setActiveDragItemData] = React.useState(null)
    const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = React.useState(null)

    const lastOverId = React.useRef(null)

    React.useEffect(() => {
        const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
        setOrderedColumnsState(orderedColumns)
    }, [board])


    const findColumnByCardId = (cardId) => {
        return orderedColumnsState.find(column =>
            column?.cards?.some(card => card._id === cardId)
        )
      }
    const moveCardAmongColumns = (
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
    ) => {
        setOrderedColumnsState(prevColumns => {
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id == overCardId)
        const isBelowOverItem = active?.rect?.current?.translated &&
            active?.rect?.current?.translated?.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0

        let newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length                // console.log('newCardIndex:', newCardIndex)
        // console.log('isBelowOverItem:', isBelowOverItem)
        // console.log('modifier:', modifier)

        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        if (nextActiveColumn) {
            // xóa card ở coloumn có card được kéo 
            nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

            //thêm placeholdercard khi cột rỗng 
            if (isEmpty(nextActiveColumn.cards)) {
                nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
            }
            // chuẩn hóa lại dữ liệu
            nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)

        }

        if (nextOverColumn) {
            //kiểm tra xem card đang kéo có tồn tại ở overcolumn không
            nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
            // tiếp theo thêm cái card đang kéo vào column

            // ghi đè lại activeDragItemData do lỗi columnID
            //     {
            //         ...activeDragItemData,
            //          columnId : nextOverColumn._id
            //     }
            // thêm card vào column
            nextOverColumn.cards.splice(newCardIndex,
                0,
                {
                    ...activeDragItemData,
                    columnId: nextOverColumn._id
                })

            
            //xóa placeholder đi khi nó có card
            nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)

            nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }

        return nextColumns
    })
    }
      
    
    const handleDragStart = (event) => {
        // console.log('handleDragStart: ', event);
        setActiveDragItemId(event?.active?.id)
        setActiveDragItemType(event?.active?.data?.current?.columnId 
            ? ACTIVE_DRAG_ITEM_TYPE.CARD
            : ACTIVE_DRAG_ITEM_TYPE.COLUMN
        )
        setActiveDragItemData(event?.active?.data?.current)
        if (event?.active?.data?.current?.columnId ) {
            setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
        }
    } 
    // quá trình keos
    const handleDragOver = (event) => {

        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            return
        }
        // console.log('handleDragOver:', event)

        const { active, over } = event
        if (!active || !over) return
        // cái id card đang kéo
        const { id: activeDraggingCardId, data: { current:  activeDraggingCardData  } } = active
        // cái id được rê tới 
        const { id: overCardId } = over

        // tìm 2 cái column dựa vào cardId
        const activeColumn = findColumnByCardId(activeDraggingCardId)
        const overColumn = findColumnByCardId(overCardId)
        // neu ko ton tai 1 trong 2 column ko lam gi het 
        if (!activeColumn || !overColumn) {
            return
        }

        // chỉ khi kéo card qua 2 column khác nhau thì tính
        if (activeColumn._id !== overColumn._id) {
            moveCardAmongColumns(overColumn,
                overCardId,
                active,
                over,
                activeColumn,
                activeDraggingCardId,
                activeDraggingCardData)
        }
    }
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || !over.id) return;

        // Nếu đang kéo CARD
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            const { active, over } = event
            // cái id card đang kéo
            const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
            // cái id được rê tới 
            const { id: overCardId } = over

            // tìm 2 cái column dựa vào cardId
            const activeColumn = findColumnByCardId(activeDraggingCardId)
            const overColumn = findColumnByCardId(overCardId)
            // neu ko ton tai 1 trong 2 column ko lam gi het 
            if (!activeColumn || !overColumn) {
                return
            } 

            if(oldColumnWhenDraggingCard._id !== overColumn._id) {
                //kéo thả column 
                moveCardAmongColumns(overColumn,
                    overCardId,
                    active,
                    over,
                    activeColumn,
                    activeDraggingCardId,
                    activeDraggingCardData)
            } else {
                //kéo thả card trong 1 column
                const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId);
                const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId);
                const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)

                // bắt đầu clone để cập nhật lại  cards vì state chỉ lưu lại state của column cũ
                setOrderedColumnsState(prevColumns => {
                    const nextColumns = cloneDeep(prevColumns)

                    const targetColumn = nextColumns.find(c => c._id === overColumn._id)
                    // cập nhật lại 2 giá trị
                    targetColumn.cards = dndOrderedCards
                    targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)

                    return nextColumns
                })
            }   

            // TODO: xử lý CARD kéo qua column khác
            setActiveDragItemId(null);
            setActiveDragItemType(null);
            setActiveDragItemData(null);
            setOldColumnWhenDraggingCard(null)
            return;
        }

        // Nếu kéo COLUMN
        if ((activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) &&( active.id !== over.id)) {
                const oldColumnIndex = orderedColumnsState.findIndex(c => c._id === active.id);
                const newColumnIndex = orderedColumnsState.findIndex(c => c._id === over.id);
            setOrderedColumnsState(arrayMove(orderedColumnsState, oldColumnIndex, newColumnIndex));
         }
        setActiveDragItemId(null);
        setActiveDragItemType(null);
        setActiveDragItemData(null);
    }
    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: { active: { opacity: '0.5' } }
        })
    }
    //thuật toán phát hiện va chạm trả về mảng các va chạm
    const collisionDetectionStrategy= React.useCallback((args)=> {
        // kéo collumn thì dùng closestcorner
        if(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            return closestCorners({...args})
        }
        //tìm các điểm giao nhau
        const pointerIntersections = pointerWithin(args)


        if (!pointerIntersections?.length) return
        //trả về 1 mảng các va trạm tại đây
        // const intersections = !!pointerIntersections?.length
        //     ? pointerIntersections
        //     : rectIntersection(args)
        // tìm  id cột đầu tiên chạm 
        let overId = getFirstCollision(pointerIntersections,'id')
        // console.log('overId bf',overId)
        if(overId) {
            const checkColumn = orderedColumnsState.find(column => column._id === overId)
            if (checkColumn) {

                overId = closestCenter({
                    ...args,
                    droppableContainers: args.droppableContainers.filter(container => {
                        return (container.id !== overId) && (checkColumn?.cardOrderIds.includes(container.id))
                    })

                })[0]?.id
                // console.log('overId at', overId)
            }
            lastOverId.current = overId
            return [{id : overId}]
        }

        return lastOverId.current ? [{ id: lastOverId.current}] : []
    }, [activeDragItemType, orderedColumnsState])

    return (
        <DndContext 
            collisionDetection={collisionDetectionStrategy} //thuat toan phat hien va cham
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd} 
            sensors={sensors}>
            <Box sx={{
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
                width: '100%',
                height: (theme) => `calc(100vh - ${theme.trelloCustom.appBarHeight} - ${theme.trelloCustom.boardBarHeight})`,
                display: 'flex',
                overflowX: 'auto',
                overflowY: 'hidden',
                p: '10px 0',
            }}>
                <ListColumns columns={orderedColumnsState} />
                <DragOverlay dropAnimation={dropAnimation}>
                    {( !activeDragItemType) && null}
                    {( activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column  column={activeDragItemData}/>}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
                </DragOverlay>
            </Box>
    
        </DndContext>

    );
}

export default BoardContent