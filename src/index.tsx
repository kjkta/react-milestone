import * as React from "react";
import * as CSS from "csstype";

export interface Milestone {
  index: number;
  width: number;
  position: number;
  current: boolean;
  completed: boolean;
}

interface MilestoneElementProps {
  Milestone?: (milestone: Milestone) => JSX.Element;
  CurrentMilestone?: (milestone: Milestone) => JSX.Element;
  CompletedMilestone?: (milestone: Milestone) => JSX.Element;
  vertical?: boolean;
  onMilestoneClick: (index: number) => void;
}

interface Props extends MilestoneElementProps {
  percentage: number;
  vertical: boolean;
  children?: (props: {
    containerStyles: CSS.Properties;
    completedBarStyles: CSS.Properties;
    milestoneElements: JSX.Element[];
  }) => JSX.Element;
  milestoneWidth?: number;
  milestoneCount?: number;
  color?: string;
  transitionSpeed?: number;
  style?: CSS.Properties;
}

function DefaultMilestone({ width }: Milestone) {
  return (
    <div
      style={{
        width,
        height: width,
        borderRadius: "50%",
        backgroundColor: "green",
      }}
    />
  );
}

function createMilestone(
  {
    index,
    width,
    percentage,
  }: {
    index: number;
    width: number;
    percentage: number;
  },
  totalMilestones: number
): Milestone {
  const position = index / (totalMilestones - 1);
  return {
    index,
    width,
    position,
    current: position * 100 === percentage,
    completed: position * 100 < percentage,
  };
}

function createMilestones(
  milestoneCount: number,
  percentage: number,
  width: number
): Array<Milestone> {
  const iterable = [...Array(milestoneCount).keys()];
  return iterable.map((index) =>
    createMilestone({ index, width, percentage }, iterable.length)
  );
}

function renderMilestone(
  m: Milestone,
  {
    Milestone,
    CurrentMilestone,
    CompletedMilestone,
    onMilestoneClick,
    vertical,
  }: MilestoneElementProps
): JSX.Element {
  return (
    <div
      key={m.index}
      style={{
        position: "absolute",
        ...(vertical
          ? {
              left: "50%",
              transform: "translateX(-50%)",
              top: "calc(" + m.position * 100 + "% - " + m.width / 2 + "px)",
            }
          : {
              top: "50%",
              transform: "translateY(-50%)",
              left: "calc(" + m.position * 100 + "% - " + m.width / 2 + "px)",
            }),
      }}
      onClick={() => onMilestoneClick && onMilestoneClick(m.index)}
    >
      {m.completed && CompletedMilestone
        ? CompletedMilestone(m)
        : m.current && CurrentMilestone
        ? CurrentMilestone(m)
        : Milestone
        ? Milestone(m)
        : DefaultMilestone(m)}
    </div>
  );
}

export const ProgressBar = ({
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
  onMilestoneClick,
}: Props): JSX.Element => {
  const containerStyles = Object.assign(
    {
      position: "relative",
      backgroundColor: "lightgrey",
      ...(vertical
        ? {
            width: 3,
            height: 300,
          }
        : { height: 3 }),
    },
    style
  );
  const completedBarStyles = {
    backgroundColor: color,
    transition: transitionSpeed + "ms all",
    ...(vertical
      ? {
          width: "100%",
          height: percentage + "%",
        }
      : { height: "100%", width: percentage + "%" }),
  };
  const milestones = createMilestones(
    milestoneCount,
    percentage,
    milestoneWidth
  );
  const milestoneElements = milestones.map((milestone) =>
    renderMilestone(milestone, {
      Milestone,
      CurrentMilestone,
      CompletedMilestone,
      onMilestoneClick,
      vertical,
    })
  );
  return children ? (
    children({
      containerStyles,
      completedBarStyles,
      milestoneElements,
    })
  ) : (
    <div style={containerStyles}>
      <div style={completedBarStyles} />
      {milestoneElements.length > 0 && milestoneElements}
    </div>
  );
};
