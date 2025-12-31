'use client'

import { useState } from 'react'

interface Card {
  id: number
  url: string
}

const cardData: Card[] = [
  {
    id: 2,
    url: '/profile-2.jpg',
  },
  {
    id: 1,
    url: '/profile-1.jpg',
  },
]

export default function SwipeCard() {
  const [cards, setCards] = useState<Card[]>(cardData)

  const resetCards = () => {
    setCards(cardData)
  }

  return (
    <div className="relative grid h-[233px] w-[175px] place-items-center ml-auto">
      {cards.length === 0 && (
        <div style={{ gridRow: 1, gridColumn: 1 }} className="z-20">
          <button
            onClick={resetCards}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Again
          </button>
        </div>
      )}
      {cards.map((card) => {
        return (
          <Card
            key={card.id}
            cards={cards}
            setCards={setCards}
            {...card}
          />
        )
      })}
    </div>
  )
}

const Card = ({
  id,
  url,
  setCards,
  cards,
}: {
  id: number
  url: string
  setCards: (cards: Card[]) => void
  cards: Card[]
}) => {
  const [x, setX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)

  const isFront = id === cards[cards.length - 1]?.id

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isFront) return
    setIsDragging(true)
    setStartX(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isFront) return
    const deltaX = e.clientX - startX
    setX(deltaX)
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)

    if (Math.abs(x) > 100) {
      // If swiped far enough, remove the card
      setCards(cards.filter((v) => v.id !== id))
    } else {
      // Otherwise, animate the card back to the center
      setX(0)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isFront) return
    setStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isFront) return
    const deltaX = e.touches[0].clientX - startX
    setX(deltaX)
  }

  const handleTouchEnd = () => {
    if (Math.abs(x) > 100) {
      setCards(cards.filter((v) => v.id !== id))
    } else {
      setX(0)
    }
  }

  const offset = isFront ? 0 : id % 2 ? 6 : -6
  const rotate = Math.max(-18, Math.min(18, (x / 150) * 18)) + offset
  const opacity = isFront ? 1 : 0.95
  const scale = isFront ? 1 : 0.98

  return (
    <img
      src={url}
      alt="Profile photo"
      className="absolute h-[233px] w-[175px] origin-bottom rounded-lg bg-white object-cover select-none"
      style={{
        gridRow: 1,
        gridColumn: 1,
        transform: `translateX(${x}px) rotate(${rotate}deg) scale(${scale})`,
        opacity,
        cursor: isFront ? (isDragging ? 'grabbing' : 'grab') : 'default',
        boxShadow: isFront
          ? '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)'
          : undefined,
        transition: isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      draggable={false}
    />
  )
}
