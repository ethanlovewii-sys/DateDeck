import React from 'react';
import './card.css';

export function Card(){
    return (
        <main className="d-flex justify-content-center align-items-center text-center flex-grow-1 pb-5">
            <div>
                <button className="card-button">
                    <img src="/datecard.png" className="card-img d-block mx-auto"/>
                </button>
                <p className="mt-2 card-prompt">Click to add a date to your deck!</p>
            </div>
        </main>
    );
}