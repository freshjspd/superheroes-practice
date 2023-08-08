import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  deleteHeroThunk,
  getHeroesThunk,
  updateHeroThunk
} from '../../store/slices/heroesSlice'
import defaultHeroPhoto from './default-photo.jpeg'

function HeroesList ({
  heroes,
  isFetching,
  error,
  getHeroes,
  deleteHero,
  updateHero
}) {
  useEffect(() => {
    getHeroes()
  }, [])

  const mapHeroes = h => {
    return (
      <li key={h.id}>
        <img
          src={h.image ? `http://localhost:5001/${h.image}` : defaultHeroPhoto}
          alt={h.nickname}
          style={{
            width: '100px',
            height: '100px',
            objectFit: 'cover',
            borderRadius: '50%'
          }}
        />
        <input
          type='checkbox'
          checked={h.isGood}
          onChange={() => {
            updateHero(h.id, { isGood: !h.isGood })
          }}
        />
        <div>id: {h.id}</div>
        <h2>Nickname: {h.nickname}</h2>
        <div>Real name: {h.realName}</div>
        <div>Catch phrase: {h.catchPhrase}</div>
        <div>Origin: {h.originDescription}</div>
        <button onClick={() => deleteHero(h.id)}>Delete</button>
        <hr />
      </li>
    )
  }

  return (
    <>
      {error && <div>ERROR!!!</div>}
      {isFetching && <div>Loading...</div>}
      {!error && !isFetching && <ul>{heroes.map(mapHeroes)}</ul>}
    </>
  )
}

const mapStateToProps = state => state.heroData

const mapDispatchToProps = dispatch => {
  return {
    getHeroes: () => dispatch(getHeroesThunk()), // dispatch( {type: 'heroes/get'})
    updateHero: (id, updatedData) =>
      dispatch(updateHeroThunk({ id, updatedData })),
    deleteHero: id => dispatch(deleteHeroThunk(id)) // to 1st param function in thunk
  }
}

// 1й вызов connect возвращает HOC
export default connect(mapStateToProps, mapDispatchToProps)(HeroesList)

// function connect(){
//   return function(){}
// }
