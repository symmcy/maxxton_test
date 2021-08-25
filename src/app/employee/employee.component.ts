import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  searchString: string = '';
  searched_data: any = [];

  headers = ['ID', 'NAME', 'DEPARTMENT', 'JOINING DATE'];
  candidate_data = [
    {
      id: 11,
      name: 'Ash',
      department: 'Finance',
      joining_date: new Date('10/8/2016'),
    },
    {
      id: 12,
      name: 'John',
      department: 'HR',
      joining_date: new Date('1/18/2011'),
    },
    {
      id: 13,
      name: 'Zuri',
      department: 'Operations',
      joining_date: new Date('11/28/2019'),
    },
    {
      id: 14,
      name: 'Vish',
      department: 'Development',
      joining_date: new Date('7/7/2017'),
    },
    {
      id: 15,
      name: 'Barry',
      department: 'Operations',
      joining_date: new Date('8/19/2014'),
    },
    {
      id: 16,
      name: 'Ady',
      department: 'Finance',
      joining_date: new Date('10/5/2014'),
    },
    {
      id: 17,
      name: 'Gare',
      department: 'Development',
      joining_date: new Date('4/6/2014'),
    },
    {
      id: 18,
      name: 'Hola',
      department: 'Development',
      joining_date: new Date('12/8/2010'),
    },
    {
      id: 19,
      name: 'Ola',
      department: 'HR',
      joining_date: new Date('5/7/2011'),
    },
    {
      id: 20,
      name: 'Kim',
      department: 'Finance',
      joining_date: new Date('10/20/2010'),
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.searched_data = this.candidate_data;
  }

  sortDataByName() {
    this.candidate_data.sort((a, b) => a.name.localeCompare(b.name));
  }

  sortDataByDate() {
    this.candidate_data.sort(
      (b, a) =>
        new Date(b.joining_date).getTime() - new Date(a.joining_date).getTime()
    );
  }

  search() {
    this.searched_data = this.candidate_data.filter((emp) =>
      emp.name.toLowerCase().includes(this.searchString.toLowerCase())
    );
  }

  filterDataWithExp() {
    this.searched_data = this.candidate_data.filter(
      (emp) => this.calculateDiff(emp.joining_date) > 730
    );
  }

  calculateDiff(joiningDate: any) {
    let currentDate = new Date();
    joiningDate = new Date(joiningDate);

    return Math.floor(
      (Date.UTC(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      ) -
        Date.UTC(
          joiningDate.getFullYear(),
          joiningDate.getMonth(),
          joiningDate.getDate()
        )) /
        (1000 * 60 * 60 * 24)
    );
  }

  getDistinctRecords() {
    let result = new Map<string, string>();
    const uniqueDepts = [
      ...new Set(this.candidate_data.map((item) => item.department)),
    ];
    for (var i = 0; i < uniqueDepts.length; i++) {
      let count = 0;
      for (var j = 0; j < this.candidate_data.length; j++) {
        if (this.candidate_data[j].department == uniqueDepts[i]) {
          count++;
        }
      }
      result.set(uniqueDepts[i], count.toString());
    }
    this.searched_data = [];
    
    alert(JSON.stringify([...result]));
    
  
  }

  removeDevelopmentCandidates() {
    this.searched_data = this.candidate_data.filter(
      (emp) => emp.department != 'Development'
    );
  }

  refresh() {
    location.reload();
  }
}
