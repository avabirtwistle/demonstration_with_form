import { wait } from "@/utils/wait";
import type { AutocompleteOption } from "@/features/form/components/controllers/autocomplete";

/** Data shape for proficiency levels API */
export interface ProficiencyData {
  projectManagement: string;
  communication:    string;
  technicalSkills:  string;
  leadership:       string;
  problemSolving:   string;
}

/**
 * Simulates fetching stored proficiency levels.
 * Returns a single object matching ProficiencyData.
 */
export async function getProficiencyLevels(): Promise<ProficiencyData> {
  await wait();
  return {
    projectManagement: "Beginner",
    communication:    "Intermediate",
    technicalSkills:  "Advanced",
    leadership:       "Intermediate",
    problemSolving:   "Advanced",
  };
}

const mockSkillCategories = [
  {
    label: "Technical Skills",
    value: "1",
    children: [
      {
        label: "Programming Languages",
        value: "1.1",
        children: [
          { label: "Python", value: "1.1.1" },
          { label: "Java", value: "1.1.2" },
          { label: "C++", value: "1.1.3" },
          { label: "JavaScript", value: "1.1.4" },
        ],
      },
      {
        label: "Software Proficiency",
        value: "1.2",
        children: [
          { label: "Microsoft Excel", value: "1.2.1" },
          { label: "Adobe Creative Suite", value: "1.2.2" },
          { label: "Salesforce", value: "1.2.3" },
        ],
      },
      {
        label: "Data Analysis",
        value: "1.3",
        children: [
          { label: "SQL", value: "1.3.1" },
          { label: "R", value: "1.3.2" },
          { label: "Tableau", value: "1.3.3" },
          { label: "Google Analytics", value: "1.3.4" },
        ],
      },
      {
        label: "Web Development",
        value: "1.4",
        children: [
          { label: "HTML", value: "1.4.1" },
          { label: "CSS", value: "1.4.2" },
          { label: "React", value: "1.4.3" },
          { label: "Node.js", value: "1.4.4" },
        ],
      },
      {
        label: "Network Administration",
        value: "1.5",
        children: [
          { label: "Cisco networking", value: "1.5.1" },
          { label: "Firewall management", value: "1.5.2" },
          { label: "VPN configuration", value: "1.5.3" },
        ],
      },
    ],
  },
  {
    label: "Soft Skills",
    value: "2",
    children: [
      {
        label: "Communication",
        value: "2.1",
        children: [
          { label: "Verbal communication", value: "2.1.1" },
          { label: "Written communication", value: "2.1.2" },
          { label: "Active listening", value: "2.1.3" },
        ],
      },
      {
        label: "Teamwork",
        value: "2.2",
        children: [
          { label: "Collaboration", value: "2.2.1" },
          { label: "Conflict resolution", value: "2.2.2" },
          { label: "Adaptability", value: "2.2.3" },
        ],
      },
      {
        label: "Problem Solving",
        value: "2.3",
        children: [
          { label: "Critical thinking", value: "2.3.1" },
          { label: "Analytical skills", value: "2.3.2" },
          { label: "Creativity", value: "2.3.3" },
        ],
      },
      {
        label: "Time Management",
        value: "2.4",
        children: [
          { label: "Prioritization", value: "2.4.1" },
          { label: "Multitasking", value: "2.4.2" },
          { label: "Meeting deadlines", value: "2.4.3" },
        ],
      },
      {
        label: "Emotional Intelligence",
        value: "2.5",
        children: [
          { label: "Empathy", value: "2.5.1" },
          { label: "Self-regulation", value: "2.5.2" },
          { label: "Interpersonal skills", value: "2.5.3" },
        ],
      },
    ],
  },
  {
    label: "Leadership Skills",
    value: "3",
    children: [
      {
        label: "Project Management",
        value: "3.1",
        children: [
          { label: "Agile methodologies", value: "3.1.1" },
          { label: "Risk management", value: "3.1.2" },
          { label: "Resource allocation", value: "3.1.3" },
        ],
      },
      {
        label: "Decision Making",
        value: "3.2",
        children: [
          { label: "Strategic thinking", value: "3.2.1" },
          { label: "Data-driven decision-making", value: "3.2.2" },
          { label: "Consensus building", value: "3.2.3" },
        ],
      },
      {
        label: "Mentoring",
        value: "3.3",
        children: [
          { label: "Coaching", value: "3.3.1" },
          { label: "Providing feedback", value: "3.3.2" },
          { label: "Developing others", value: "3.3.3" },
        ],
      },
      {
        label: "Change Management",
        value: "3.4",
        children: [
