import React from 'react';
import './card.css';
import '../deck/deck.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export function Card(){

    const [showForm, setShowForm] = React.useState(false);

    function addCard(){
        setShowForm(true);
    }

    return (
        <main className="d-flex justify-content-center align-items-center text-center">
            {!showForm && 
            <div>
                <button className="card-button" onClick={() => addCard()}>
                    <img src="/datecard.png" className="card-img d-block mx-auto"/>
                </button>
                <p className="mt-2 card-prompt">Click to add a date to your deck!</p>
            </div>
            }
            
            {showForm && (
                <div className="form-popup">
                <form>
                    <div className="date-card active">
                        <h3 className="card-number">2❤︎</h3>
                        <input type='text' placeholder='Date Title:' className="form-title text-center pb-1 pt-1" style={{opacity:1}}/>
                        <img src="/date_img_placeholder.jpeg" className = "date-img"/>
                        <div className="card-description">
                        <p className="description">Details:</p>
                        <p>The nickle arcade by In and Out. Afterwards we can grab a bite to eat there.</p>
                        </div>
                        <div className="card-tags">
                            <span>Indoor</span>
                            <span>Cheap</span>
                            <span>Exciting</span>
                        </div>
                        <h3 className="bottom-card-number">2❤︎</h3>
                    </div>
                    <button className='save-btn' onClick={() => setShowForm(false)}>Save</button>
                </form>
                </div>
            )}
        </main>
    );
}