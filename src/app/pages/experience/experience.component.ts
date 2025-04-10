import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
  openEducationIndex: number | null = null;
  openExperienceIndex: number | null = null;

  toggle(type: 'education' | 'experience', index: number) {
    if (type === 'education') {
      this.openEducationIndex = this.openEducationIndex === index ? null : index;
    } else {
      this.openExperienceIndex = this.openExperienceIndex === index ? null : index;
    }
  }

  education = [
    {
      title: 'High School – Shazar Bat-Yam',
      period: '2015 - 2018',
      content: `
        Developed strong foundation in .NET programming and computer science.<br>
        Took advanced coursework in C# and the .NET framework.
      `
    },
    {
      title: 'Sela College – Full Stack Development',
      period: '2021-2022',
      content: `
        1 Year Bootcamp covering all aspects of software development.<br>
        .NET Core, ASP.NET, Angular, React, SQL, Docker, Azure, Identity.<br>
        Built real-world portfolio projects.
      `
    },
    {
      title: 'Open University – Computer Science',
      period: '2022 - Present',
      content: `
        Focused on programming, algorithms, logic, and system-level development.<br>
        Gaining strong theoretical and practical knowledge across multiple domains.
      `
    }
  ];

  experience = [
    {
      title: 'IDF – Combat Soldier',
      period: '2018 - 2021',
      content: `
        Full military service in Kfir Brigade as a combat soldier.<br>
        Developed discipline, teamwork, and leadership skills.
      `
    },
    {
      title: 'Sanida.io – Product & Full Stack Developer',
      period: '2023',
      content: `
        Successfully led the transformation of the startup's product from
        ideation to production, meticulously aligning development processes with
        stakeholder requirements. <br>
        Managed project budgets and optimized resource allocation, ensuring costeffective solutions while overseeing the successful deployment of the
        application. <br>
        Provided strong leadership to development teams, fostering a positive and
        collaborative work environment conducive to productivity and innovation. 
      `
    },
    {
      title: 'Phoenix – Full Stack Developer',
      period: '2022 - Present',
      content: `
        Experience in insurance tech using .NET, Angular, and SQL.<br>
        Built modules for reporting, user management, and data analysis.<br>
        Worked in agile teams and performed code reviews.
      `
    },
  ];
}
