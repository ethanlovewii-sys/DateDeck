import React from 'react';
import './deck.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//add authticaiton? so only the cards of that person shows?
//add edit card functionality
//add tag overflow viewer 
//add option to reset all cards (for breakups)

export function Deck() {

    const [cards, setCards] = React.useState([]);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [startx, setStartX] = React.useState(0);
    const [offset, setOffset] = React.useState({x:0, y:0});

    const [isDesktop, setIsDesktop] = React.useState(false);

    React.useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth > 768);
        check();
    }, []);

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
    }

    const handleTouchMove = (e) => {
        const currentX = e.touches[0].clientX;
        setOffset({x: currentX - startx});
    }

    const handleTouchEnd = (e) => {
        if(Math.abs(offset.x) > 50) {
            if(offset.x > 0 && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            } else if(offset.x < 0 && currentIndex < cards.length - 1) {
                setCurrentIndex(currentIndex + 1);
            }
        }
        setOffset(0);
    }

    const handleUseCard = () => {
        const card = cards[currentIndex];
        localStorage.setItem(`title${card.id}-used`, cards[currentIndex].title);
        localStorage.setItem(`description${card.id}-used`, cards[currentIndex].description);
        localStorage.setItem(`tags${card.id}-used`, JSON.stringify(cards[currentIndex].tags));
        localStorage.removeItem(`title${card.id}`);
        localStorage.removeItem(`description${card.id}`);
        localStorage.removeItem(`tags${card.id}`);
        currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : setCurrentIndex(0);
        setCards(getCardsFromStorage());
    }

    React.useEffect(() => {
        setCards(getCardsFromStorage());
    }, []);

    function getCardsFromStorage() {
        const titleIndex = localStorage.getItem("titleIndex") || 1;
        const cards = [];
        for (let i = 1; i <= titleIndex; i++) {
            const title = localStorage.getItem(`title${i}`);
            const description = localStorage.getItem(`description${i}`);
            const tags = JSON.parse(localStorage.getItem(`tags${i}`) || "[]");
            if (title && title.length < 8) {
                cards.push({id:i, title, description, tags });
            }
        }
        return cards;
    }



  return (
        <main onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} className="d-flex flex-column justify-content-center align-items-center text-center">
            <div className="date-deck">
                {cards.map((card, index) => (
                    <div 
                    key={card.id} 
                    className={`date-card ${index === currentIndex ? 'active' : index === currentIndex - 1 ? 'left' : index === currentIndex + 1 ? 'right' : ''}`}>
                        <h3 className="card-number">{card.id}❤︎</h3>
                        <h3 className="card-title text-center pb-2 pt-1">{card.title}</h3>
                        <img src="/date_img_placeholder.jpeg" className = "date-img"/>
                        <div className="card-description">
                            <textarea className="description" readOnly = {true}>{card.description}</textarea>
                        </div>
                    <div className="card-tags">
                        {card.tags.map(tag => <span className ="card-tag" key={tag}>{tag}</span>)}
                    </div>
                    <h3 className="bottom-card-number">{card.id}❤︎</h3>
                </div>
                ))}
                {cards.length === 0 && 
                    <div>
                        <img src="public/empty_deck.png" className="empty-deck-img"/>
                        <p className="empty-deck">Your deck is empty!</p>
                    </div>
                    }
            </div>
        
                <div className = "deck-buttons">
                    {isDesktop &&
                    <button className="swipe-btn left" onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}>‹</button>
                    }
                    <button className="custom-btn" onClick={() => handleUseCard()}>Use Card</button>
                    {isDesktop &&
                    <button className="swipe-btn right" onClick={() => currentIndex < cards.length - 1 && setCurrentIndex(currentIndex + 1)}>›</button>
                    }
                </div>
        </main>
  );
}