import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { fetchMovieVideos } from '../../services/tmdb'
import { useNavigate, useParams } from 'react-router-dom'


const Player = () => {

    const {id} = useParams()
    const navigate = useNavigate()

    const [apiData , setApiData] = useState({
        name : '',
        key : '',
        published_at : '',
        type : ''
    })

    useEffect(() => {
        const loadTrailer = async () => {
            try {
                const nowShowing = await fetchMovieVideos(id)
                console.log('this is the now showing',nowShowing)
                setApiData(nowShowing[0])
            } catch (error) {
                console.error('Error loading trailer:', error)
            }
        }
        loadTrailer()
    },[])

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => {navigate(-1)}}/>
      <iframe width='90%' height='90%' 
      src={`https://www.youtube.com/embed/${apiData.key}`} frameBorder="0"
      title='trailer' allowFullScreen></iframe>

      <div className="player-info">
        <p>{apiData.published_at}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
