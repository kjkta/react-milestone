/// <reference types="react" />
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
export declare const ProgressBar: ({ children, percentage, milestoneCount, milestoneWidth, color, vertical, style, transitionSpeed, Milestone, CurrentMilestone, CompletedMilestone, onMilestoneClick, }: Props) => JSX.Element;
export {};
