"use client"

import React, { useEffect, useState } from 'react'
import { useClient } from '@/hooks/client';


interface CountdownTimerProps {
    deadline: Date;
    title: string;
}

interface CountdownTimeLeft {
    days?: number;
    hrs?: number;
    mins?: number;
    secs?: number;
}

const INITIAL_TIME_LEFT = { days: 0, hr: 0, mins: 0, secs: 0 }

function CountdownTimer({ deadline, title }: CountdownTimerProps) {
    const client = useClient();

    if(!client) {
        <p>Loading...</p>
    }
    const [timeLeft, setTimeLeft] = useState<CountdownTimeLeft>(INITIAL_TIME_LEFT)

    useEffect(() => {
        setTimeLeft(calculateTimeLeft())

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)

        return () => clearInterval(timer);
    }, [])

    function calculateTimeLeft(): CountdownTimeLeft {
        let timeLeft: CountdownTimeLeft = {};
        let currentDate = new Date();
        let difference = deadline.getTime() - currentDate.getTime();

        if (difference > 0) {
            timeLeft = {
                // days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                // hrs: Math.floor((difference / (1000 * 60 * 60)) % 24),
                mins: Math.floor((difference / 1000 / 60) % 60),
                secs: Math.floor((difference / 1000) % 60)
            }
        }

        return timeLeft;
    }

    return (
        <div className='bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-200 w-20 flex justify-center items-center border rounded-lg' >
            <h2 >
                {title}
            </h2>

            <div className='flex'>
                {
                    Object.entries(timeLeft).map(([unit, value], index, array) => (
                        <div key={unit} >
                            <div className='flex'>
                                {/* <p className={styles.value}>{Math.floor(value / 10)}</p>
                                <p className={styles.value}>{value % 10}</p> */}
                                <p>{Math.floor(value / 10)}</p>
                                <p>{value % 10}</p>
                                {index !== array.length - 1 && <span>:</span>}
                            </div>
                            {/* <p className={styles.unit}>{unit}</p> */}
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default CountdownTimer