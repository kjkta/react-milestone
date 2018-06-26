## Install

`yarn add react-milestone`

## Uses

`import { ProgressBar } from "react-milestone";`

Simple
```js
<ProgressBar 
  percentage={this.state.percentComplete} 
  color="green" 
  transitionSpeed={1000} />
```

With milestones
```js
<ProgressBar 
  percentage={this.state.percentComplete} 
  milestonesCount={3} />
```

With custom milestones markup
```js
type Milestone = {
  index: number,
  size: number,
  position: number,
  current: boolean,
  completed: boolean
};

<ProgressBar 
  percentage={this.state.percentComplete} 
  milestonesCount={3}
  Milestone={(milestone: Milestone) => <div>I am a milestone</div>}
  CurrentMilestone={(milestone: Milestone) => <div>I am the current milestone</div>}
  CompletedMilestone={(milestone: Milestone) => <div>I am a completed milestone</div>}
  onMilestoneClick={milestoneIndex => {}} />
```

With custom markup
```js
<ProgressBar percentage={50} milestonesCount={5}>
  {({ containerStyles, completedBarStyles, milestoneElements }) => {
    return (
      <div style={{ ...containerStyles, backgroundColor: "lightgrey" }}>
        <div style={completedBarStyles} />
        {milestoneElements.map(milestone => milestone)}
      </div>
    );
  }}
</ProgressBar>
```