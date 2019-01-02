import {Component, OnInit, ViewChild} from '@angular/core';
import {Log} from '../../../entities/log';
import {Router} from '@angular/router';
import {LogService} from '../../../services/log.service';
import {MatSort, MatTableDataSource, Sort, SortDirection} from '@angular/material';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource([] as Log[]);
  displayedColumns: String[] = ['id', 'Mitarbeiter', 'Text', 'Zeit'];

  constructor(private logService: LogService, private router: Router) {
  }

  ngOnInit() {
    console.log(this.sort);
    this.dataSource.sort = this.sort;
    this.logService.getAllLogs().subscribe(logs => {
      this.dataSource.data = logs;
    });
  }

  getDate (date: string): String {
    const myDate = new Date(date);
    return myDate.toLocaleString('de');
  }

  /* sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.dataSource.data =  this.dataSource.data.sort((log1, log2) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(log1.id, log2.id, isAsc);
        case 'calories': return compare(a.calories, b.calories, isAsc);
        case 'fat': return compare(a.fat, b.fat, isAsc);
        case 'carbs': return compare(a.carbs, b.carbs, isAsc);
        case 'protein': return compare(a.protein, b.protein, isAsc);
        default: return 0;
      }
    });
  } */

}
