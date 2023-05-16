import React, {useEffect} from 'react';
import {
  StyledFridgeItem,
  StyledTitleBox,
  StyledRemainingBox,
  StyledDate,
  StyledAmount,
} from './StyledFridgeItem';
import {StyledTextWhite, StyledText} from '../../sharedStyles';
import {View} from 'react-native';
import moment from 'moment';

const FridgeItem = ({item}: any) => {
  const [color, setColor] = React.useState('');
  const [expDate, setExpDate] = React.useState(moment(item.expDate));
  const date = expDate.format('DD/MM/YY');

  useEffect(() => {
    const todayDate = moment();
    const twoDaysAgo = moment(expDate).subtract(2, 'days');

    if (todayDate.isSameOrAfter(expDate, 'day')) {
      setColor('red');
    } else if (todayDate.isBetween(twoDaysAgo, expDate, 'day', '[]')) {
      setColor('orange');
    }
  }, [expDate]);

  useEffect(() => {
    setExpDate(moment(item.expDate));
  }, [item.expDate]);

  return (
    <StyledFridgeItem
      resizeMode="cover"
      style={{elevation: 7, shadowColor: 'black'}}
      source={{
        uri:
          item.product.image ||
          'https://raw.githubusercontent.com/koehlersimon/fallback/master/Resources/Public/Images/placeholder.jpg',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <StyledTitleBox>
          <StyledTextWhite style={{fontWeight: 'bold'}}>
            {item.product.name}
          </StyledTextWhite>
        </StyledTitleBox>
        {item.count && (
          <StyledAmount>
            <StyledTextWhite>{item.count}</StyledTextWhite>
          </StyledAmount>
        )}
      </View>
      <StyledRemainingBox>
        <StyledText>
          Remaining:{' '}
          {item.fixedAmount === 0
            ? 0
            : item.fixedAmount || item.estimatedAmount}
        </StyledText>
        <StyledDate>
          <StyledTextWhite
            style={{color: color ? color : 'white', fontWeight: 'bold'}}>
            {date}
          </StyledTextWhite>
        </StyledDate>
      </StyledRemainingBox>
    </StyledFridgeItem>
  );
};

export default FridgeItem;
