import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Option, GamePlay, GamePlayStory, GameScenario, PonteVirtualeService } from './ponte-virtuale.service';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  scenario: GameScenario;
  play: GamePlay;
  currentStory: GamePlayStory;
  options: Option[];

  constructor(
    private pv: PonteVirtualeService,
    private http: HttpClient,
  ) { 
    this.pv.loadGameScenario(`${environment.gameUrl}/game.json`)
    .then((scenario) => {
      this.scenario = scenario;
      this.loadPlay();
    });
  }

  startGame() {
    this.play = new GamePlay();
    this.pv.start(this.scenario, this.play);
    this.findNextStory();
    this.options = this.getOptions();
    this.savePlay();
  }

  savePlay() {
    localStorage.setItem("ponte-virtuale-play", JSON.stringify(this.play));
  }

  clearZoomTo() {
    this.play.zoomTo = null;
  }

  setZoomTo(id: string) {
    this.scenario.locations
    .filter(l => l.id === id)
    .forEach(l => {
      this.play.zoomTo = id;
    })
  }

  loadPlay() {
    let saved = localStorage.getItem("ponte-virtuale-play");
    if (saved) {
      this.play = JSON.parse(saved);
      this.findNextStory();
      this.options = this.getOptions();
    }
  }

  findNextStory() {
    let unpublished = this.play.story.filter(item => !item.published);
    this.currentStory = unpublished.length > 0 ? unpublished[0] : null ;
  }

  readCurrentStory() {
    this.currentStory.published = true;
    this.findNextStory();
    this.savePlay();
  }

  visitTappa(location: string) {
    this.pv.visit(this.scenario, this.play, location);
    this.findNextStory();
    this.savePlay();
  }

  getOptions() {
    return this.pv.getOptions(this.scenario, this.play);
  }

  setOption(option : Option) {
    this.pv.setOption(this.play, this.scenario, option)
    this.findNextStory();
    this.options = this.getOptions();
    this.savePlay();
  }

  removeOptions() {
    this.options = null
  }

  getHtmlResource(url: string): Promise<string> {
    return this.http
    .get<string>(`${environment.gameUrl}/${url}`, {responseType: 'text' as 'json'})
    .toPromise();
  }

}

export class StoryChapter {

  title?: string;
  audio?: string;
  video?: string;

}

export class MapLocation {

  id: string;
  name: string;
  icon: string;
  lat: number;
  lon: number;
  near: boolean;

}