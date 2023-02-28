import React from 'react'
import { NavLink } from 'react-router-dom'

function Dashboard() {
  return (
    <div className='dashboard'>
      

      <button className="dashboard__btn dashboard__btn--start ui__btn ui__btn--blue">start</button>

      <div className="hologram__screen dashboard__screen game-selecto">

        <div className="level-selector">
        <div className="dashboard__card card">
            <div className="card__image"></div>
            <h3 className="card__heading">Quiz</h3>
            <p className="card__text">Challenge yourself with technical questions from various domains</p>
            <NavLink to={'/quiz'}><button className="card__btn">Try</button></NavLink>
            
        </div>
        <div className="dashboard__card card">
            <div className="card__image"></div>
            <h3 className="card__heading">heading</h3>
            <p className="card__text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, rem?</p>
            <button className="card__btn">button</button>
        </div>
        <div className="dashboard__card card">
            <div className="card__image"></div>
            <h3 className="card__heading">heading</h3>
            <p className="card__text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, rem?</p>
            <button className="card__btn">button</button>
        </div>
        </div>
        
      </div>
    </div>
  )
}

export default Dashboard
