import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { APIResponse, Game } from 'src/models';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort: string | undefined;
  public games: Array<Game> | undefined;
  gameSub: any;
  routeSub: any;
  ActivatedRoute: any;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  searchGames(sort: any, search?: string): void {
    this.gameSub = this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList);
      });
  }

  openGameDetails(id: number): void {
    this.router.navigate(['details', id]);
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
