// @flow
import * as React from "react";

export const ProgressBar = ({
  children,
  percentage = 0,
  milestones = 0,
  color = "orangered",
  transition = "500ms all",
  Milestone,
  CurrentMilestone,
  CompletedMilestone,
  onMilestoneClick
}: {
  children: ({
    containerStyles: { [string]: any },
    completedBarStyles: { [string]: any },
    getMilestones: () => Array<React.Element<*>>
  }) => React.Element<*>,
  percentage: number,
  milestones?: number,
  color?: string,
  transition?: string,
  Milestone?: React.Element<*>,
  CurrentMilestone?: React.Element<*>,
  CompletedMilestone?: React.Element<*>,
  onMilestoneClick: number => void
}) => {
  let containerStyles = {
    position: "relative",
    height: 3,
    backgroundColor: "lightgrey"
  };
  let completedBarStyles = {
    width: percentage + "%",
    height: "100%",
    backgroundColor: color,
    transition
  };
  let getMilestones = () =>
    [...Array(milestones).keys()].map(m => {
      let size = 15;
      let position = m / (milestones - 1);
      let current = position * 100 === percentage;
      let completed = position * 100 < percentage;
      return (
        <div
          key={m}
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: "calc(" + position * 100 + "% - " + size / 2 + "px)"
          }}
          onClick={() => onMilestoneClick && onMilestoneClick(m)}
        >
          {completed && CompletedMilestone ? (
            CompletedMilestone
          ) : current ? (
            CurrentMilestone
          ) : Milestone ? (
            Milestone
          ) : (
            <div
              style={{
                width: size,
                height: size,
                borderRadius: "50%",
                backgroundColor: color
              }}
            />
          )}
        </div>
      );
    });
  return children({ containerStyles, completedBarStyles, getMilestones });
};
