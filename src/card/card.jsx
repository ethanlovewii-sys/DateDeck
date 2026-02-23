import React from 'react';
import './card.css';
import '../deck/deck.css'
import 'bootstrap/dist/css/bootstrap.min.css';

// add custom picture option

export function Card(){

    const [showForm, setShowForm] = React.useState(false);

    const [title, setTitle] = React.useState("");
    const [titleIndex, setTitleIndex] = React.useState(localStorage.getItem("titleIndex") || 1);
    const [description, setDescription] = React.useState("");

    const [selectedTags, setSelectedTags] = React.useState([]);

    const [tagOpen, setTagOpen] = React.useState(false);
    const availableTags = ["Indoor", "Outdoor", "Cheap", "Expensive", "Active", "Relaxing", "Romantic", "Adventurous"];

    function toggleTag(tag) {
        setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    }

    function addCard(){
        setTitle("");
        setDescription("");
        setSelectedTags([]);
        setTagOpen(false);
        setShowForm(true);
        setTitleIndex(localStorage.getItem("titleIndex") || 1);
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
                        <h3 className="card-number">{titleIndex}❤︎</h3>
                        <input type='text' placeholder='Date Title:' className="form-title text-center pb-1 pt-1" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <img src="/card_form_img.jpg" className = "date-img"/>
                        <textarea className='form-card-description' type='text' placeholder='Details about your date...' value={description} onChange={(e) => setDescription(e.target.value)}/>
                        
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
                        <h3 className="bottom-card-number">{titleIndex}❤︎</h3>
                    </div>
                    <button className='save-btn' onClick={() => {setShowForm(false); localStorage.setItem(`title${titleIndex}`, title); localStorage.setItem(`description${titleIndex}`, description); localStorage.setItem(`tags${titleIndex}`, JSON.stringify(selectedTags)); localStorage.setItem("titleIndex", parseInt(titleIndex) + 1)}}>Save</button>
                </form>
                </div>
            )}
        </main>
    );
}