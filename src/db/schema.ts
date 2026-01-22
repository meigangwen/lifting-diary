import {
    pgTable,
    pgEnum,
    uuid,
    text,
    timestamp,
    integer,
    decimal,
    uniqueIndex,
    index,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const weightUnit = pgEnum('weight_unit', ['kg', 'lb'])
export const distanceUnit = pgEnum('distance_unit', ['m', 'km', 'mi', 'ft'])
export const setType = pgEnum('set_type', ['warmup', 'working', 'backoff', 'drop', 'amrap', 'failure'])

// Workouts table
export const workouts = pgTable('workouts', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id').notNull(),
    name: text('name').notNull(),
    startedAt: timestamp('started_at').notNull(),
    completedAt: timestamp('completed_at'),
    notes: text('notes'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
}, (t) => ({
    userStartedAtIdx: index('workouts_user_started_at_idx').on(t.userId, t.startedAt),
}))

// Exercises table (exercise library/catalog)
export const exercises = pgTable('exercises', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    defaultWeightUnit: weightUnit('default_weight_unit').default('kg'),
    defaultDistanceUnit: distanceUnit('default_distance_unit'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
}, (t) => ({
    nameUnique: uniqueIndex('exercises_name_unique').on(t.name),
}))

// Workout exercises junction table
export const workoutExercises = pgTable('workout_exercises', {
    id: uuid('id').primaryKey().defaultRandom(),
    workoutId: uuid('workout_id')
        .notNull()
        .references(() => workouts.id, { onDelete: 'cascade' }),
    exerciseId: uuid('exercise_id')
        .notNull()
        .references(() => exercises.id),
    order: integer('order').notNull(),
    notes: text('notes'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
}, (t) => ({
    workoutOrderUnique: uniqueIndex('workout_exercises_workout_order_unique').on(t.workoutId, t.order),
    workoutIdIdx: index('workout_exercises_workout_id_idx').on(t.workoutId),
    exerciseIdIdx: index('workout_exercises_exercise_id_idx').on(t.exerciseId),
}))

// Sets table
export const sets = pgTable('sets', {
    id: uuid('id').primaryKey().defaultRandom(),
    workoutExerciseId: uuid('workout_exercise_id')
        .notNull()
        .references(() => workoutExercises.id, { onDelete: 'cascade' }),
    setNumber: integer('set_number').notNull(),
    type: setType('type').default('working'),
    weight: decimal('weight', { precision: 10, scale: 2 }),
    weightUnit: weightUnit('weight_unit'),
    reps: integer('reps'),
    distance: decimal('distance', { precision: 10, scale: 2 }),
    distanceUnit: distanceUnit('distance_unit'),
    durationSeconds: integer('duration_seconds'),
    rpe: decimal('rpe', { precision: 3, scale: 1 }),
    rir: integer('rir'),
    notes: text('notes'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
}, (t) => ({
    setNumberUnique: uniqueIndex('sets_workout_exercise_set_number_unique').on(
        t.workoutExerciseId,
        t.setNumber,
    ),
    workoutExerciseIdIdx: index('sets_workout_exercise_id_idx').on(t.workoutExerciseId),
}))

// Relations
export const workoutsRelations = relations(workouts, ({ many }) => ({
    workoutExercises: many(workoutExercises),
}))

export const exercisesRelations = relations(exercises, ({ many }) => ({
    workoutExercises: many(workoutExercises),
}))

export const workoutExercisesRelations = relations(
    workoutExercises,
    ({ one, many }) => ({
        workout: one(workouts, {
            fields: [workoutExercises.workoutId],
            references: [workouts.id],
        }),
        exercise: one(exercises, {
            fields: [workoutExercises.exerciseId],
            references: [exercises.id],
        }),
        sets: many(sets),
    }),
)

export const setsRelations = relations(sets, ({ one }) => ({
    workoutExercise: one(workoutExercises, {
        fields: [sets.workoutExerciseId],
        references: [workoutExercises.id],
    }),
}))
