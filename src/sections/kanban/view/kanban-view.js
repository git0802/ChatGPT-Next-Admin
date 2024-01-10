'use client';

import { useCallback } from 'react';
import { Droppable, DragDropContext } from '@hello-pangea/dnd';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { moveTask, moveColumn, useGetBoard } from 'src/api/kanban';

import Scrollbar from 'src/components/scrollbar';
import EmptyContent from 'src/components/empty-content';

import KanbanColumn from '../kanban-column';
import KanbanColumnAdd from '../kanban-column-add';
import { KanbanColumnSkeleton } from '../kanban-skeleton';

// ----------------------------------------------------------------------

export default function KanbanView() {
  const { board, boardLoading, boardEmpty } = useGetBoard();

  const onDragEnd = useCallback(
    async ({ destination, source, draggableId, type }) => {
      try {
        if (!destination) {
          return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
          return;
        }

        // Moving column
        if (type === 'COLUMN') {
          const newOrdered = [...board.ordered];

          newOrdered.splice(source.index, 1);

          newOrdered.splice(destination.index, 0, draggableId);

          moveColumn(newOrdered);
          return;
        }

        const sourceColumn = board?.columns[source.droppableId];

        const destinationColumn = board?.columns[destination.droppableId];

        // Moving task to same list
        if (sourceColumn.id === destinationColumn.id) {
          const newTaskIds = [...sourceColumn.taskIds];

          newTaskIds.splice(source.index, 1);

          newTaskIds.splice(destination.index, 0, draggableId);

          moveTask({
            ...board?.columns,
            [sourceColumn.id]: {
              ...sourceColumn,
              taskIds: newTaskIds,
            },
          });

          console.info('Moving to same list!');

          return;
        }

        // Moving task to different list
        const sourceTaskIds = [...sourceColumn.taskIds];

        const destinationTaskIds = [...destinationColumn.taskIds];

        // Remove from source
        sourceTaskIds.splice(source.index, 1);

        // Insert into destination
        destinationTaskIds.splice(destination.index, 0, draggableId);

        moveTask({
          ...board?.columns,
          [sourceColumn.id]: {
            ...sourceColumn,
            taskIds: sourceTaskIds,
          },
          [destinationColumn.id]: {
            ...destinationColumn,
            taskIds: destinationTaskIds,
          },
        });

        console.info('Moving to different list!');
      } catch (error) {
        console.error(error);
      }
    },
    [board?.columns, board?.ordered]
  );

  const renderSkeleton = (
    <Stack direction="row" alignItems="flex-start" spacing={3}>
      {[...Array(4)].map((_, index) => (
        <KanbanColumnSkeleton key={index} index={index} />
      ))}
    </Stack>
  );

  return (
    <Container
      maxWidth={false}
      sx={{
        height: 1,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        Kanban
      </Typography>

      {boardLoading && renderSkeleton}

      {boardEmpty && (
        <EmptyContent
          filled
          title="No Data"
          sx={{
            py: 10,
            maxHeight: { md: 480 },
          }}
        />
      )}

      {!!board?.ordered.length && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="board" type="COLUMN" direction="horizontal">
            {(provided) => (
              <Scrollbar
                sx={{
                  height: 1,
                  minHeight: {
                    xs: '80vh',
                    md: 'unset',
                  },
                }}
              >
                <Stack
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  spacing={3}
                  direction="row"
                  alignItems="flex-start"
                  sx={{
                    p: 0.25,
                    height: 1,
                  }}
                >
                  {board?.ordered.map((columnId, index) => (
                    <KanbanColumn
                      index={index}
                      key={columnId}
                      column={board?.columns[columnId]}
                      tasks={board?.tasks}
                    />
                  ))}

                  {provided.placeholder}

                  <KanbanColumnAdd />
                </Stack>
              </Scrollbar>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </Container>
  );
}
