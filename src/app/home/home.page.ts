import { Component } from '@angular/core';
import { RangeCustomEvent } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  option1: boolean = false;
  option2: boolean = false;
  option3: boolean = false;
  rangeVal: number | any = 0;
  checkbox1: boolean = false;
  checkbox2: boolean = false;
  checkbox3: boolean = false;
  radioValue: string = '';

  constructor() {
    this.getPreference();
  }

  onIonChange(event: RangeCustomEvent) {
    this.rangeVal = event.detail.value;
  }

  async setPreference() {
    
    console.log(
      `option1: ${this.option1}`,
      `option2: ${this.option2}`,
      `option3: ${this.option3}`,
      `rangeVal: ${this.rangeVal}`,
      `checkbox1: ${this.checkbox1}`,
      `checkbox2: ${this.checkbox2}`,
      `checkbox3: ${this.checkbox3}`,
      `radioValue: ${this.radioValue}`,
    )

    await Preferences.set({
      key: 'settings',
      value: JSON.stringify({
        option1: this.option1,
        option2: this.option2,
        option3: this.option3,
        rangeVal: this.rangeVal,
        checkbox1: this.checkbox1,
        checkbox2: this.checkbox2,
        checkbox3: this.checkbox3,
        radioValue: this.radioValue,
      }),
    });
  }

  async getPreference(){
    const result = await Preferences.get({ key: 'settings' });
    if (result.value) {
      const settings = JSON.parse(result.value);
      this.option1 = settings.option1;
      this.option2 = settings.option2;
      this.option3 = settings.option3;
      this.rangeVal = settings.rangeVal;
      this.checkbox1 = settings.checkbox1;
      this.checkbox2 = settings.checkbox2;
      this.checkbox3 = settings.checkbox3;
      this.radioValue = settings.radioValue;
    }
    console.log(result);
  }

  async clearPreferences() {
    await Preferences.clear();
    this.option1 = false;
    this.option2 = false;
    this.option3 = false;
    this.rangeVal = 0;
    this.checkbox1 = false;
    this.checkbox2 = false;
    this.checkbox3 = false;
    this.radioValue = '';
    alert('All Preferences Cleared');
  }
}
