import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  deleteHeroThunk,
  getHeroesThunk,
  updateHeroThunk
} from '../../store/slices/heroesSlice'

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
        <input
          type='checkbox'
          checked={h.isGood}
          onChange={() => {
            updateHero(h.id, { isGood: !h.isGood })
          }}
        />
        <h2>{h.nickname}</h2>
        <div>{h.id}</div>
        <div>{h.realName}</div>
        <div>{h.catchPhrase}</div>
        <div>{h.originDescription}</div>
        <button onClick={() => deleteHero(h.id)}>Delete</button>
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
