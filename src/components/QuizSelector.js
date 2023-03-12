import React from "react";
import { NavLink } from "react-router-dom";
import { getImgUrl } from "./js/image";

function QuizSelector() {
  return (
    <div className="popup__child selector">
        <h3 className="selector__heading">Linux</h3>
      <div className="selector__option-group">
        <div className="selector__option">
          <div
            className="selector__option__image"
            style={{
              backgroundImage: `url(${getImgUrl("level-badge-1.png")})`,
            }}
          ></div>
          <h4 className="selector__option__heading">easy</h4>
          <NavLink to={"/quiz/linux/easy"}>
          <button className="btn ui__btn ui__btn--blue btn--3d">start</button>
              </NavLink>
        </div>
        <div className="selector__option">
          <div
            className="selector__option__image"
            style={{
              backgroundImage: `url(${getImgUrl("level-badge-1.png")})`,
            }}
          ></div>
          <h4 className="selector__option__heading">Medium</h4>
          <NavLink to={"/quiz/linux/medium"}>
          <button className="btn ui__btn ui__btn--blue btn--3d">start</button>
              </NavLink>
        </div>
        <div className="selector__option">
          <div
            className="selector__option__image"
            style={{
              backgroundImage: `url(${getImgUrl("level-badge-1.png")})`,
            }}
          ></div>
          <h4 className="selector__option__heading">hard</h4>
          <NavLink to={"/quiz/linux/hard"}>
          <button className="btn ui__btn ui__btn--blue btn--3d">start</button>
              </NavLink>
          
        </div>
      </div>
        <hr className="selector__hr" />
    </div>
  );
}

export default QuizSelector;
