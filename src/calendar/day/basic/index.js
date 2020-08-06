import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { shouldUpdate } from '../../../component-updater';
import Dot from '../../dot';
import styleConstructor from './style';


class Day extends Component {
  static displayName = 'IGNORE';

  static propTypes = {
    // TODO: disabled props should be removed
    state: PropTypes.oneOf(['disabled', 'today', '']),
    // Specify theme properties to override specific styles for calendar parts. Default = {}
    theme: PropTypes.object,
    marking: PropTypes.any,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    date: PropTypes.object,
    disableAllTouchEventsForDisabledDays: PropTypes.bool,
    typeMarked: PropTypes.string,
    colorDay: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.style = styleConstructor(props.theme);

    this.onDayPress = this.onDayPress.bind(this);
    this.onDayLongPress = this.onDayLongPress.bind(this);
  }

  onDayPress() {
    this.props.onPress(this.props.date);
  }
  onDayLongPress() {
    this.props.onLongPress(this.props.date);
  }

  shouldComponentUpdate(nextProps) {
    return shouldUpdate(this.props, nextProps, ['state', 'children', 'marking', 'onPress', 'onLongPress']);
  }

  render() {
    const { theme, disableAllTouchEventsForDisabledDays, typeMarked } = this.props;
    const containerStyle = [this.style.base];
    const textStyle = [this.style.text];

    let marking = this.props.marking || {};
    if (marking && marking.constructor === Array && marking.length) {
      marking = {
        marking: true
      };
    }

    const isDisabled = typeof marking.disabled !== 'undefined' ? marking.disabled : this.props.state === 'disabled';
    const isToday = this.props.state === 'today';

    const {
      marked,
      dotColor,
      selected,
      selectedColor,
      selectedTextColor,
      activeOpacity,
      disableTouchEvent
    } = marking;

    if (selected) {
      containerStyle.push(this.style.selected);
      textStyle.push(this.style.selectedText);

      if (selectedColor) {
        containerStyle.push({ backgroundColor: selectedColor });
      }

      if (selectedTextColor) {
        textStyle.push({ color: selectedTextColor });
      }

    } else if (isDisabled) {
      textStyle.push(this.style.disabledText);
    }
    let shouldDisableTouchEvent = false;
    if (typeof disableTouchEvent === 'boolean') {
      shouldDisableTouchEvent = disableTouchEvent;
    } else if (typeof disableAllTouchEventsForDisabledDays === 'boolean' && isDisabled) {
      shouldDisableTouchEvent = disableAllTouchEventsForDisabledDays;
    }
    return (
      <TouchableOpacity
        testID={this.props.testID}
        style={containerStyle}
        onPress={this.onDayPress}
        onLongPress={this.onDayLongPress}
        activeOpacity={activeOpacity}
        disabled={shouldDisableTouchEvent}
        accessibilityRole={isDisabled ? undefined : 'button'}
        accessibilityLabel={this.props.accessibilityLabel}
      >
        {
          isToday ? <View style={{
            height: 6, width: 6,
            borderRadius: 3,
            backgroundColor: '#00C58D',
            position: 'absolute',
            top: 11, right: 10
          }} /> : null
        }
        <Text allowFontScaling={false} style={[textStyle,{color: this.props.colorDay}]}>{String(this.props.children)}</Text>
        <Dot
          typeMarked={typeMarked}
          theme={theme}
          isMarked={marked}
          dotColor={dotColor}
          isSelected={selected}
          isToday={isToday}
          isDisabled={isDisabled}
        />
      </TouchableOpacity>
    );
  }
}

export default Day;
