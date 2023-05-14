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
  const [expDate] = React.useState(new Date(item.expDate));
  // const dateString = new Date(item.expDate);
  const momentDate = moment(expDate);
  const date = momentDate.format('DD/MM/YY');

  useEffect(() => {
    const todayDate = new Date();
    const twoDaysAgoTimestamp = expDate.getTime() - 2 * 24 * 60 * 60 * 1000;
    const twoDaysAgo = new Date(twoDaysAgoTimestamp);

    if (todayDate >= expDate) {
      setColor('red');
    } else if (todayDate >= twoDaysAgo && todayDate < expDate) {
      setColor('orange');
    }
  }, [expDate]);

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
