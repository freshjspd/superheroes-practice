import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getHeroesThunk } from '../../store/slices/heroesSlice'

function HeroesList ({ heroes, isFetching, error, getHeroes }) {
  useEffect(() => {
    getHeroes()
  }, [])

  const mapHeroes = h => {
    return (
      <li key={h.id}>
        <input type='checkbox' checked={h.isGood} />
        <h2>{h.nickname}</h2>
        <div>{h.realName}</div>
        <div>{h.catchPhrase}</div>
        <div>{h.originDescription}</div>
        <button>Delete</button>
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
    getHeroes: () => dispatch(getHeroesThunk()) // dispatch( {type: 'heroes/get'})
  }
}

// 1й вызов connect возвращает HOC
export default connect(mapStateToProps, mapDispatchToProps)(HeroesList)

// function connect(){
//   return function(){}
// }
