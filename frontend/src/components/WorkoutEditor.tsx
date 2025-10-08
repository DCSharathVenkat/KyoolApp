// AUTO-GENERATED-TO-NATIVE: This file was created by tools/convert-web-to-native.js
// Manual fixes likely required: styles, icons, routing, third-party web-only APIs
import React from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from './ui/dropdown-menu';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { 
  GripVertical,
  Plus, 
  Trash2, 
  Edit3,
  Save,
  X,
  Search,
  MoreVertical,
  Move,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion } from 'motion/react';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight: string;
  completed?: boolean;
}

interface WorkoutRoutine {
  id: number;
  name: string;
  exercises: Exercise[];
  duration: string;
  difficulty: string;
  targetMuscles: string[];
  createdBy: string;
  isPublic: boolean;
  downloads: number;
}

interface WorkoutEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  routine: WorkoutRoutine | null;
  onSave: (routine: WorkoutRoutine) => void;
  exerciseLibrary: any[];
}

const ItemType = 'EXERCISE';

interface DraggedExercise {
  id: string;
  index: number;
}

function DraggableExercise({ 
  exercise, 
  index, 
  onMove, 
  onEdit, 
  onRemove 
}: {
  exercise: Exercise;
  index: number;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  onEdit: (index: number, exercise: Exercise) => void;
  onRemove: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    sets: exercise.sets,
    reps: exercise.reps,
    weight: exercise.weight
  });

  const [{ handlerId }, drop] = useDrop({
    accept: ItemType,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DraggedExercise, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: () => {
      return { id: exercise.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  drag(drop(ref));

  const handleSaveEdit = () => {
    onEdit(index, {
      ...exercise,
      sets: editData.sets,
      reps: editData.reps,
      weight: editData.weight
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditData({
      sets: exercise.sets,
      reps: exercise.reps,
      weight: exercise.weight
    });
    setIsEditing(false);
  };

  return (
    <View
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
     `}
    >
      <View>
        {/* Drag Handle */}
        <View>
          <GripVertical />
        </View>

        {/* Exercise Number */}
        <View>
          {index + 1}
        </View>

        {/* Exercise Details */}
        <View>
          <View>{exercise.name}</View>
          {!isEditing ? (
            <View>
              {exercise.sets} sets × {exercise.reps} @ {exercise.weight}
            </View>
          ) : (
            <View>
              <View>
                <Text>Sets</Text>
                <TextInput
                  type="number"
                  value={editData.sets}
                  onChange={(e) => setEditData(prev => ({ ...prev, sets: parseInt(e.target.value) || 1 }))}
                 
                  min="1"
                />
              </View>
              <View>
                <Text>Reps</Text>
                <TextInput
                  value={editData.reps}
                  onChange={(e) => setEditData(prev => ({ ...prev, reps: e.target.value }))}
                 
                  placeholder="8-12"
                />
              </View>
              <View>
                <Text>Weight</Text>
                <TextInput
                  value={editData.weight}
                  onChange={(e) => setEditData(prev => ({ ...prev, weight: e.target.value }))}
                 
                  placeholder="60kg"
                />
              </View>
            </View>
          )}
        </View>

        {/* Actions */}
        <View>
          {!isEditing ? (
            <>
              <TouchableOpacity
                variant="ghost"
                size="sm"
               
                onPress={() => setIsEditing(true)}
              >
                <Edit3 />
              </TouchableOpacity>
              <TouchableOpacity
                variant="ghost"
                size="sm"
               
                onPress={() => onRemove(index)}
              >
                <Trash2 />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                variant="ghost"
                size="sm"
               
                onPress={handleSaveEdit}
              >
                <Save />
              </TouchableOpacity>
              <TouchableOpacity
                variant="ghost"
                size="sm"
               
                onPress={handleCancelEdit}
              >
                <X />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

export function WorkoutEditor({ 
  open, 
  onOpenChange, 
  routine, 
  onSave, 
  exerciseLibrary 
}: WorkoutEditorProps) {
  const [editedRoutine, setEditedRoutine] = useState<WorkoutRoutine | null>(null);
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showExerciseLibrary, setShowExerciseLibrary] = useState(false);

  React.useEffect(() => {
    if (routine) {
      setEditedRoutine({ ...routine });
      setIsNameEditing(false);
    }
  }, [routine]);

  if (!editedRoutine) return null;

  const moveExercise = (dragIndex: number, hoverIndex: number) => {
    const draggedExercise = editedRoutine.exercises[dragIndex];
    const newExercises = [...editedRoutine.exercises];
    newExercises.splice(dragIndex, 1);
    newExercises.splice(hoverIndex, 0, draggedExercise);
    
    setEditedRoutine(prev => prev ? { ...prev, exercises: newExercises } : null);
  };

  const addExercise = (libraryExercise: any) => {
    const newExercise: Exercise = {
      id: `${Date.now()}-${Math.random()}`,
      name: libraryExercise.name,
      sets: 3,
      reps: '8-12',
      weight: 'bodyweight',
      completed: false
    };

    setEditedRoutine(prev => prev ? {
      ...prev,
      exercises: [...prev.exercises, newExercise]
    } : null);
    setShowExerciseLibrary(false);
  };

  const editExercise = (index: number, exercise: Exercise) => {
    const newExercises = [...editedRoutine.exercises];
    newExercises[index] = exercise;
    setEditedRoutine(prev => prev ? { ...prev, exercises: newExercises } : null);
  };

  const removeExercise = (index: number) => {
    const newExercises = editedRoutine.exercises.filter((_, i) => i !== index);
    setEditedRoutine(prev => prev ? { ...prev, exercises: newExercises } : null);
  };

  const updateRoutineName = (name: string) => {
    setEditedRoutine(prev => prev ? { ...prev, name } : null);
  };

  const updateRoutineDifficulty = (difficulty: string) => {
    setEditedRoutine(prev => prev ? { ...prev, difficulty } : null);
  };

  const calculateDuration = () => {
    const exerciseCount = editedRoutine.exercises.length;
    const estimatedMinutes = exerciseCount * 8; // Roughly 8 minutes per exercise
    return `${estimatedMinutes} min`;
  };

  const handleSave = () => {
    if (editedRoutine) {
      const updatedRoutine = {
        ...editedRoutine,
        duration: calculateDuration()
      };
      onSave(updatedRoutine);
      onOpenChange(false);
    }
  };

  // Filter exercises for the library
  const filteredExercises = exerciseLibrary.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.primaryMuscles.some((muscle: string) => muscle.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(exerciseLibrary.map(ex => ex.category)))];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Edit3 />
            Edit Workout Routine
          </DialogTitle>
        </DialogHeader>

        <View>
          {/* Routine Name and Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Routine Information</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Name */}
              <View>
                <Text>Routine Name</Text>
                <View>
                  {!isNameEditing ? (
                    <>
                      <View>{editedRoutine.name}</View>
                      <TouchableOpacity
                        variant="ghost"
                        size="sm"
                        onPress={() => setIsNameEditing(true)}
                      >
                        <Edit3 />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <TextInput
                        value={editedRoutine.name}
                        onChange={(e) => updateRoutineName(e.target.value)}
                       
                        autoFocus
                      />
                      <TouchableOpacity
                        variant="ghost"
                        size="sm"
                        onPress={() => setIsNameEditing(false)}
                      >
                        <Save />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>

              {/* Difficulty */}
              <View>
                <Text>Difficulty</Text>
                <Select 
                  value={editedRoutine.difficulty} 
                  onValueChange={updateRoutineDifficulty}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </View>

              {/* Stats */}
              <View>
                <Badge variant="outline">
                  {editedRoutine.exercises.length} exercises
                </Badge>
                <Badge variant="outline">
                  {calculateDuration()}
                </Badge>
                <Badge variant="outline">
                  {editedRoutine.difficulty}
                </Badge>
              </View>
            </CardContent>
          </Card>

          {/* Exercises List */}
          <Card>
            <CardHeader>
              <View>
                <CardTitle>Exercises ({editedRoutine.exercises.length})</CardTitle>
                <TouchableOpacity
                  onPress={() => setShowExerciseLibrary(true)}
                  size="sm"
                >
                  <Plus />
                  Add Exercise
                </TouchableOpacity>
              </View>
            </CardHeader>
            <CardContent>
              {editedRoutine.exercises.length === 0 ? (
                <View>
                  No exercises yet. Add some exercises to get started!
                </View>
              ) : (
                <DndProvider backend={HTML5Backend}>
                  <View>
                    {editedRoutine.exercises.map((exercise, index) => (
                      <DraggableExercise
                        key={exercise.id}
                        exercise={exercise}
                        index={index}
                        onMove={moveExercise}
                        onEdit={editExercise}
                        onRemove={removeExercise}
                      />
                    ))}
                  </View>
                </DndProvider>
              )}
            </CardContent>
          </Card>
        </View>

        {/* Actions */}
        <View>
          <View>
            Drag exercises to reorder • Click edit to modify sets/reps/weight
          </View>
          <View>
            <TouchableOpacity
              variant="outline"
              onPress={() => onOpenChange(false)}
            >
              Cancel
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
             
            >
              <Save />
              Save Changes
            </TouchableOpacity>
          </View>
        </View>

        {/* Exercise Library Dialog */}
        <Dialog open={showExerciseLibrary} onOpenChange={setShowExerciseLibrary}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Exercise Library</DialogTitle>
            </DialogHeader>

            <View>
              <View>
                <TextInput
                  placeholder="Search exercises..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                 
                />
              </View>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </View>

            <View>
              <View>
                {filteredExercises.map((exercise) => (
                  <Card key={exercise.id}>
                    <CardContent>
                      <View>
                        <h3>{exercise.name}</h3>
                        <TouchableOpacity
                          size="sm"
                          onPress={() => addExercise(exercise)}
                        >
                          <Plus />
                        </TouchableOpacity>
                      </View>
                      <View>
                        <View>Category: {exercise.category}</View>
                        <View>Equipment: {exercise.equipment}</View>
                        <View>Difficulty: {exercise.difficulty}</View>
                      </View>
                      <View>
                        <View>
                          {exercise.primaryMuscles.slice(0, 2).join(', ')}
                          {exercise.primaryMuscles.length > 2 && '...'}
                        </View>
                      </View>
                    </CardContent>
                  </Card>
                ))}
              </View>

              {filteredExercises.length === 0 && (
                <View>
                  No exercises found matching your search criteria.
                </View>
              )}
            </View>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}