import React from 'react';
import {render} from '@testing-library/react-native';
import FridgeItem from './FridgeItem';

describe('FridgeItem', () => {
  it('should render correctly', () => {
    const item = {
      product: {
        name: 'test',
        image: 'test',
      },
      expDate: '2021-01-01',
    };
    const {getByTestId} = render(<FridgeItem item={item} />);
    const fridgeItem = getByTestId('fridge-item');
    expect(fridgeItem).toBeTruthy();
  });

  it('should render correctly without image', () => {
    const item = {
      product: {
        name: 'test',
      },
      expDate: '2021-01-01',
    };
    const {getByTestId} = render(<FridgeItem item={item} />);
    const fridgeItem = getByTestId('fridge-item');
    expect(fridgeItem).toBeTruthy();
  });

  it('should render correctly without count', () => {
    const item = {
      product: {
        name: 'test',
        image: 'test',
      },
      expDate: '2021-01-01',
    };
    const {getByTestId} = render(<FridgeItem item={item} />);
    const fridgeItem = getByTestId('fridge-item');
    expect(fridgeItem).toBeTruthy();
  });

  it('should render correctly with count', () => {
    const item = {
      product: {
        name: 'test',
        image: 'test',
      },
      expDate: '2021-01-01',
      count: 1,
    };
    const {getByTestId} = render(<FridgeItem item={item} />);
    const fridgeItem = getByTestId('fridge-item');
    expect(fridgeItem).toBeTruthy();
  });

  it('should render correctly with expired red date', () => {
    const item = {
      product: {
        name: 'test',
        image: 'test',
      },
      expDate: new Date(),
    };
    const {getByTestId} = render(<FridgeItem item={item} />);
    const fridgeItem = getByTestId('fridge-item');
    const textComponent = getByTestId('fridge-item-date');

    expect(fridgeItem).toBeTruthy();
    expect(textComponent.props.style).toEqual([
      {color: 'white', fontSize: 16},
      {color: 'red', fontWeight: 'bold'},
    ]);
  });

  it('should render correctly with orange date', () => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() + 2);
    const item = {
      product: {
        name: 'test',
        image: 'test',
      },
      expDate: twoDaysAgo,
    };
    const {getByTestId} = render(<FridgeItem item={item} />);
    const textComponent = getByTestId('fridge-item-date');
    const fridgeItem = getByTestId('fridge-item');
    expect(fridgeItem).toBeTruthy();

    console.log(twoDaysAgo);
    expect(textComponent.props.style).toEqual([
      {color: 'white', fontSize: 16},
      {color: 'orange', fontWeight: 'bold'},
    ]);
  });
});
