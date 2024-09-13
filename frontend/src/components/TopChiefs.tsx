import React from 'react';
import { ChiefCard } from './ChiefCard';

export interface IChief {
    name: string;
    img: string;
    recipesCount: string;
    cuisine: string;
}

export const TopChiefs: React.FC = () => {
    const chiefs: IChief[] = [
        {
            name: "Juan Carlos",
            img: "/img/chiefs/img_1.jpg",
            recipesCount: "10",
            cuisine: "Mexican",
        },
        {
            name: "John Doe",
            img: "/img/chiefs/img_2.jpg",
            recipesCount: "05",
            cuisine: "Japanese",
        },
        {
            name: "Erich Maria",
            img: "/img/chiefs/img_3.jpg",
            recipesCount: "13",
            cuisine: "Italian",
        },
        {
            name: "Chris Brown",
            img: "/img/chiefs/img_4.jpg",
            recipesCount: "08",
            cuisine: "American"
        },
        {
            name: "Blake Lively",
            img: "/img/chiefs/img_5.jpg",
            recipesCount: "09",
            cuisine: "French"
        },
        {
            name: "Ben Affleck",
            img: "/img/chiefs/img_6.jpg",
            recipesCount: "04",
            cuisine: "Indian"
        }
    ]

    return (
        <div className='section chiefs'>
            <h1 className='title'>Our Top Chiefs</h1>
            <div className="top-chiefs-container">
                { chiefs.map(chief => (
                    <ChiefCard key={chief.name} chief={{
                        name: chief.name,
                        img: chief.img,
                        recipesCount: chief.recipesCount,
                        cuisine: chief.cuisine
                    }} />
                ))}
            </div>
        </div>
    )
}
