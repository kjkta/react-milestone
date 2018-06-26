// @flow
import * as React from "react";

type Milestone = {
  index: number,
  size: number,
  position: number,
  current: boolean,
  completed: boolean
};

type MilestoneElementProps = {
  Milestone?: Milestone => React.Element<*>,
  CurrentMilestone?: Milestone => React.Element<*>,
  CompletedMilestone?: Milestone => React.Element<*>,
  onMilestoneClick: number => void
};

type Props = {
  percentage: number,
  children?: ({
    containerStyles: { [string]: any },
    completedBarStyles: { [string]: any },
    milestoneElements: Array<React.Element<*>>
  }) => React.Element<*>,
  milestonesCount?: number,
  color?: string,
  transitionSpeed?: number
} & MilestoneElementProps;

function DefaultMilestone({ size }: Milestone) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: "green"
      }}
    />
  );
}

function createMilestone(
  {
    index,
    size,
    percentage
  }: {
    index: number,
    size: number,
    percentage: number
  },
  totalMilestones: number
): Milestone {
  let position = index / (totalMilestones - 1);
  return {
    index,
    size,
    position,
    current: position * 100 === percentage,
    completed: position * 100 < percentage
  };
}

function createMilestones(
  milestoneCount: number,
  percentage: number
): Array<Milestone> {
  let iterable = [...Array(milestoneCount).keys()];
  return iterable.map(index =>
    createMilestone({ index, size: 15, percentage }, iterable.length)
  );
}

function renderMilestone(
  m: Milestone,
  {
    Milestone,
    CurrentMilestone,
    CompletedMilestone,
    onMilestoneClick
  }: MilestoneElementProps
): React.Element<*> {
  return (
    <div
      key={m.index}
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        left: "calc(" + m.position * 100 + "% - " + m.size / 2 + "px)"
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

function renderMilestones(
  milestones: Array<Milestone>,
  milestoneElementProps: MilestoneElementProps
): Array<React.Element<*>> {
  return milestones.map(milestone =>
    renderMilestone(milestone, milestoneElementProps)
  );
}

export const ProgressBar = ({
  children,
  percentage = 0,
  milestonesCount = 0,
  color = "green",
  transitionSpeed = 0,
  Milestone,
  CurrentMilestone,
  CompletedMilestone,
  onMilestoneClick
}: Props) => {
  let containerStyles = {
    position: "relative",
    height: 3,
    backgroundColor: "lightgrey"
  };
  let completedBarStyles = {
    width: percentage + "%",
    height: "100%",
    backgroundColor: color,
    transition: transitionSpeed + "ms all"
  };
  let milestoneElementProps = {
    Milestone,
    CurrentMilestone,
    CompletedMilestone,
    onMilestoneClick
  };
  let milestones = createMilestones(milestonesCount, percentage);
  let milestoneElements = renderMilestones(milestones, milestoneElementProps);
  return children ? (
    children({
      containerStyles,
      completedBarStyles,
      milestoneElements
    })
  ) : (
    <div style={containerStyles}>
      <div style={completedBarStyles} />
      {milestoneElements.length > 0 && milestoneElements}
    </div>
  );
};
