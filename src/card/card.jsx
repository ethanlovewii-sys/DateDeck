import React from 'react';
import './card.css';
import '../deck/deck.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export function Card(){

    const [showForm, setShowForm] = React.useState(false);

    const tags = ["Indoor", "Cheap", "Exciting"];
    const [selectedTags, setSelectedTags] = React.useState([]);

    const [tagOpen, setTagOpen] = React.useState(false);
    const availableTags = ["Indoor", "Outdoor", "Cheap", "Expensive", "Active", "Relaxing", "Romantic", "Adventurous"];

    function toggleTag(tag) {
        setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    }

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
                        <input type='text' placeholder='Date Title:' className="form-title text-center pb-1 pt-1"/>
                        <img src="/card_form_img.jpg" className = "date-img"/>
                        <textarea className='form-card-description' type='text' placeholder='Details about your date...'/>
                        
                        <div className="tag-selector">
                            <div className="selected-chips" onClick={() => setTagOpen(v => !v)}>
                                {selectedTags.length > 0
                                ? selectedTags.map(t => <span key={t} className="chip">{t}</span>)
                                : <span className="choose-tags">Choose tags</span>
                                }
                                <span className="caret">▾</span>
                            </div>

                            {tagOpen && (
                                <div className="tag-dropdown">
                                {availableTags.map(tag => (
                                    <button
                                    type="button"
                                    key={tag}
                                    className={`tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
                                    onClick={() => toggleTag(tag)}
                                    >
                                    {tag}
                                    </button>
                                ))}
                                </div>
                            )}
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