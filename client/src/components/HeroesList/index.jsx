import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  deleteHeroThunk,
  getHeroesThunk,
  updateHeroThunk
} from '../../store/slices/heroesSlice'
import defaultHeroPhoto from './default-photo.jpeg'
import { getPowersThunk } from '../../store/slices/powersSlice'

function HeroesList ({
  powersData: { powers },
  heroData: { isFetching, error, heroes },
  getPowers,
  getHeroes,
  deleteHero,
  updateHero
}) {
  useEffect(() => {
    getPowers()
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
        <ol>
          {powers.length &&
            h.superpowers.map(p => (
              <li key={p}>
                {powers[powers.findIndex(i => p === i.id)].description}
              </li>
            ))}
        </ol>
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

const mapStateToProps = ({ powersData, heroData }) => ({
  powersData,
  heroData
})

const mapDispatchToProps = dispatch => {
  return {
    getPowers: () => dispatch(getPowersThunk()),
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
