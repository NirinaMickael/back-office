import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { AssetReducer } from './reducers/asset.reducer';
import { UserReducer } from './reducers/users.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AssetEffects } from './effects/asset.effect';
import { UserEffects } from './effects/users.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { LogReducer } from './reducers/log.reducer';
import { LogEffects } from './effects/log.effect';
import { AccountReducer } from './reducers/account.reducer';
import { AccountEffects } from './effects/account.effect';
import { ScoreReducer } from './reducers/score.reducer';
import { ScoreEffects } from './effects/score.effect';
import { ChatFaqReducer } from './reducers/chat-faq.reducer';
import { ChatFaqEffects } from './effects/chat-faq.effect';
import { TextReducer } from './reducers/texts.reducer';
import { TextEffects } from './effects/text.effect';
import { MusicReducer } from './reducers/music.reducer';
import { MusicEffects } from './effects/music.effect';
import { SliderReducer } from './reducers/slider.reducer';
import { SliderEffects } from './effects/slider.effect';
import { SectionReducer } from './reducers/section.reducer';
import { SectionEffects } from './effects/section.effect';
import { OeuvreEffects } from './effects/oeuvres.effetct';
import { OeuvreReducer } from './reducers/oeuvres.reducer';
import { WalkableReducer } from './reducers/walkables.reducers';
import { WalkableEffects } from './effects/walkables.effect';
import { ArtistReducer } from './reducers/artists.reducer';
import { ArtistEffects } from './effects/artists.effect';
import { StatusEffects } from './effects/status.effect';
import { StatusReducer } from './reducers/status.reducer';
import { CategoryReducer } from './reducers/category.reducer';
import { CategoryEffects } from './effects/category.effect';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({
      assets: AssetReducer,
      users: UserReducer,
      logs: LogReducer,
      account: AccountReducer,
      scores: ScoreReducer,
      chatFaqs: ChatFaqReducer,
      texts: TextReducer,
      Musics: MusicReducer,
      sliders: SliderReducer,
      sections: SectionReducer,
      oeuvre: OeuvreReducer,
      artist : ArtistReducer,
      status : StatusReducer,
      category : CategoryReducer
    }),
    EffectsModule.forRoot([
      AssetEffects,
      UserEffects,
      LogEffects,
      AccountEffects,
      ScoreEffects,
      ChatFaqEffects,
      TextEffects,
      MusicEffects,
      SliderEffects,
      SectionEffects,
      OeuvreEffects,
      ArtistEffects,
      StatusEffects,
      CategoryEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
})
export class AppStoreModule {}
