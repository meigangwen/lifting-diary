'use client'

import * as React from 'react'
import { format, isSameDay } from 'date-fns'

import { Badge } from '@/components/ui/badge'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const workouts = [
    {
        id: 'bench-press',
        title: 'Bench Press + Accessories',
        description: 'Barbell bench, incline dumbbells, triceps work.',
        time: '07:15',
        tags: ['Upper', 'Strength', 'Push'],
        date: new Date(),
    },
    {
        id: 'intervals',
        title: 'Intervals on the Assault Bike',
        description: '10 rounds of 30s on / 60s off.',
        time: '18:40',
        tags: ['Conditioning', 'Cardio'],
        date: new Date(),
    },
    {
        id: 'deadlift',
        title: 'Deadlift Focus',
        description: 'Deadlift triples, rows, posterior chain work.',
        time: '12:30',
        tags: ['Lower', 'Strength', 'Pull'],
        date: new Date(new Date().setDate(new Date().getDate() - 1)),
    },
]

export default function DashboardPage() {
    const [selectedDate, setSelectedDate] = React.useState<Date>(new Date())

    const visibleWorkouts = React.useMemo(
        () =>
            workouts.filter((workout) =>
                isSameDay(workout.date, selectedDate)
            ),
        [selectedDate]
    )

    return (
        <div className='mx-auto w-full max-w-4xl px-6 py-10'>
            <div className='flex flex-col gap-8'>
                <div className='space-y-2'>
                    <h1 className='text-3xl font-semibold tracking-tight'>
                        Dashboard
                    </h1>
                    <p className='text-sm text-muted-foreground'>
                        Review workouts logged on a specific date.
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Date</CardTitle>
                        <CardDescription>
                            Pick a date to filter your logged workouts.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant='outline'
                                        className='w-full justify-between sm:w-[240px]'
                                    >
                                        {format(selectedDate, 'do MMM yyyy')}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    align='start'
                                    className='w-auto p-0'
                                >
                                    <Calendar
                                        mode='single'
                                        selected={selectedDate}
                                        onSelect={(date) => {
                                            if (date) {
                                                setSelectedDate(date)
                                            }
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <p className='text-sm text-muted-foreground'>
                                {visibleWorkouts.length} workouts logged.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Workouts on{' '}
                            {format(selectedDate, 'do MMM yyyy')}
                        </CardTitle>
                        <CardDescription>
                            Activity logged for the selected date.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {visibleWorkouts.length === 0 ? (
                            <div className='rounded-lg border border-dashed border-border/70 p-6 text-center text-sm text-muted-foreground'>
                                No workouts logged for this date.
                            </div>
                        ) : (
                            <div className='space-y-4'>
                                {visibleWorkouts.map((workout) => (
                                    <div
                                        key={workout.id}
                                        className='rounded-lg border border-border/60 p-4'
                                    >
                                        <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                                            <div className='space-y-1'>
                                                <p className='text-lg font-semibold'>
                                                    {workout.title}
                                                </p>
                                                <p className='text-sm text-muted-foreground'>
                                                    {workout.description}
                                                </p>
                                            </div>
                                            <div className='text-sm font-medium text-muted-foreground'>
                                                {workout.time}
                                            </div>
                                        </div>
                                        <div className='mt-3 flex flex-wrap gap-2'>
                                            {workout.tags.map((tag) => (
                                                <Badge
                                                    key={`${workout.id}-${tag}`}
                                                    variant='secondary'
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
