import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ComponentsBtnContainer, Btn1, Btn2, Btn3, Btn4, Btn5} from './componentStyle.js';

class ProductsBtn extends Component {
  render() {
    const { location } = this.props;
    const currentPath = location.pathname;

    const buttons = [Btn1, Btn2, Btn3, Btn4, Btn5];
    const labels = ['Laptops', 'Drafters', 'Bikes', 'Cameras', 'GateBooks'];
    const endpoints = ['/laptops', '/drafters', '/bikes', '/cameras', '/gatebooks'];

    return (
      <ComponentsBtnContainer>
        {buttons.map((BtnComponent, index) => {
          const isActive = currentPath === endpoints[index] || (currentPath === '/' && endpoints[index] === '/laptops');

          return (
            <Link to={endpoints[index]} key={index}>
              <BtnComponent
                className={isActive ? 'active' : ''}
              >
                {labels[index]}
              </BtnComponent>
            </Link>
          );
        })}
      </ComponentsBtnContainer>
    );
  }
}

export default withRouter(ProductsBtn);