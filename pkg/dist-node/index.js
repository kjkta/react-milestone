'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function DefaultMilestone({
  width
}) {
  return React.createElement("div", {
    style: {
      width,
      height: width,
      borderRadius: "50%",
      backgroundColor: "green"
    }
  });
}

function createMilestone({
  index,
  width,
  percentage
}, totalMilestones) {
  const position = index / (totalMilestones - 1);
  return {
    index,
    width,
    position,
    current: position * 100 === percentage,
    completed: position * 100 < percentage
  };
}

function createMilestones(milestoneCount, percentage, width) {
  const iterable = [...Array(milestoneCount).keys()];
  return iterable.map(index => createMilestone({
    index,
    width,
    percentage
  }, iterable.length));
}

function renderMilestone(m, {
  Milestone,
  CurrentMilestone,
  CompletedMilestone,
  onMilestoneClick,
  vertical
}) {
  return React.createElement("div", {
    key: m.index,
    style: _objectSpread2({
      position: "absolute"
    }, vertical ? {
      left: "50%",
      transform: "translateX(-50%)",
      top: "calc(" + m.position * 100 + "% - " + m.width / 2 + "px)"
    } : {
      top: "50%",
      transform: "translateY(-50%)",
      left: "calc(" + m.position * 100 + "% - " + m.width / 2 + "px)"
    }),
    onClick: () => onMilestoneClick && onMilestoneClick(m.index)
  }, m.completed && CompletedMilestone ? CompletedMilestone(m) : m.current && CurrentMilestone ? CurrentMilestone(m) : Milestone ? Milestone(m) : DefaultMilestone(m));
}

const ProgressBar = ({
  children,
  percentage = 0,
  milestoneCount = 0,
  milestoneWidth = 15,
  color = "green",
  vertical,
  style = {},
  transitionSpeed = 0,
  Milestone,
  CurrentMilestone,
  CompletedMilestone,
  onMilestoneClick
}) => {
  const containerStyles = Object.assign(_objectSpread2({
    position: "relative",
    backgroundColor: "lightgrey"
  }, vertical ? {
    width: 3,
    height: 300
  } : {
    height: 3
  }), style);

  const completedBarStyles = _objectSpread2({
    backgroundColor: color,
    transition: transitionSpeed + "ms all"
  }, vertical ? {
    width: "100%",
    height: percentage + "%"
  } : {
    height: "100%",
    width: percentage + "%"
  });

  const milestones = createMilestones(milestoneCount, percentage, milestoneWidth);
  const milestoneElements = milestones.map(milestone => renderMilestone(milestone, {
    Milestone,
    CurrentMilestone,
    CompletedMilestone,
    onMilestoneClick,
    vertical
  }));
  return children ? children({
    containerStyles,
    completedBarStyles,
    milestoneElements
  }) : React.createElement("div", {
    style: containerStyles
  }, React.createElement("div", {
    style: completedBarStyles
  }), milestoneElements.length > 0 && milestoneElements);
};

exports.ProgressBar = ProgressBar;
//# sourceMappingURL=index.js.map
