import React from 'react';
import { View, Image } from 'react-native';
import styleConstructor from './style';
import PropTypes from 'prop-types';

const Dot = ({ theme, isMarked, isDisabled, dotColor, isToday, isSelected, typeMarked }) => {

  const style = styleConstructor(theme);
  const dotStyle = [style.dot];

  if (isMarked) {
    dotStyle.push(style.visibleDot);

    if (isDisabled) {
      dotStyle.push(style.disabledDot);
    }

    if (isSelected) {
      dotStyle.push(style.selectedDot);
    }

    if (dotColor) {
      dotStyle.push({ backgroundColor: dotColor });
    }

    if (isToday) {
      dotStyle.push(style.todayDot);
    }
  }
  switch (typeMarked) {
    case 'normal':
      return (
        <Image source={require('../img/normal.png')} style={{ height: 9, width: 8, marginTop: 5 }} />
      )
    case 'report':
      return (
        <Image source={require('../img/report.png')} style={{ height: 9, width: 8, marginTop: 5 }} />
      )
    case 'empty':
      return (
        <Image source={require('../img/empty.png')} style={{ height: 8, width: 8, marginTop: 5 }} />
      )
    default:
      return <View style={dotStyle} />
  }

};

export default Dot;

Dot.propTypes = {
  theme: PropTypes.object,
  isMarked: PropTypes.bool,
  dotColor: PropTypes.string,
  isSelected: PropTypes.bool,
  isToday: PropTypes.bool,
  isDisabled: PropTypes.bool,
  typeMarked: PropTypes.string,
};
