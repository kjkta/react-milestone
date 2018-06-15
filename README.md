## Install

`yarn add react-milestone`

## Uses

```js
<ProgressBar percentage={50}>
  {({ containerStyles, completedBarStyles, getMilestones }) => {
    return (
      <div style={{ ...containerStyles, backgroundColor: "lightgrey" }}>
        <div style={completedBarStyles} />
        {getMilestones()}
      </div>
    );
  }}
</ProgressBar>
```

With milestones
```js
<ProgressBar percentage={50} milestones={3}>
  {({ containerStyles, completedBarStyles, getMilestones }) => {
    return (
      <div style={{ ...containerStyles, backgroundColor: "lightgrey" }}>
        <div style={completedBarStyles} />
        {getMilestones()}
      </div>
    );
  }}
</ProgressBar>
```

With custom milestone colour
```js
<ProgressBar percentage={50} milestones={3} color="green">
  {({ containerStyles, completedBarStyles, getMilestones }) => {
    return (
      <div style={{ ...containerStyles, backgroundColor: "lightgrey" }}>
        <div style={completedBarStyles} />
        {getMilestones()}
      </div>
    );
  }}
</ProgressBar>
```

With custom milestone elements
```js
<ProgressBar 
  percentage={50} 
  milestones={3} 
  Milestone={<div>Not completed</div>}
  CompletedMilestone={<div>Completed!</div>}>
  {({ containerStyles, completedBarStyles, getMilestones }) => {
    return (
      <div style={{ ...containerStyles, backgroundColor: "lightgrey" }}>
        <div style={completedBarStyles} />
        {getMilestones()}
      </div>
    );
  }}
</ProgressBar>
```