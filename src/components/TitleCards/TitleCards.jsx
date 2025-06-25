import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { fetchNowPlayingMovies } from '../../services/tmdb'
import { Link } from 'react-router-dom'


const TitleCards = ({title , category}) => {

    const [apiData , setApiData] = useState([])
    const cardsRef = useRef(null)

    const handleWheel = (event) => {
        event.preventDefault()
        cardsRef.current.scrollLeft += event.deltaY
    }

    useEffect(() => {
        cardsRef.current.addEventListener('wheel',handleWheel)
    },[])

      useEffect(() => {
        const loadMovies = async () => {
            try {
                const nowPlaying = await fetchNowPlayingMovies(category)
                setApiData(nowPlaying);
            } catch (error) {
                console.error('Error loading movies:', error)
            }
        }

        loadMovies()
    }, [])

  return (
    <div className='title-cards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
            return <Link to={`/player/${card.id}`} className='card' key={index}>
                <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
                <p>{card.original_title}</p>
            </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
